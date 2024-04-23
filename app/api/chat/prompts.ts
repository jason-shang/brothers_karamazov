import { createClient } from "@supabase/supabase-js";
import {
  SupabaseVectorStore,
  SupabaseFilterRPCCall,
} from "@langchain/community/vectorstores/supabase";
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";
import {
  getSupabaseURL,
  getSupabaseKey,
  getVoyageAIKey,
  getCohereTrialKey,
} from "@/lib/utils";
import characterPrompts from "@/public/characterPrompts.json";
import generalPrompts from "@/public/generalPrompts.json";
import { Message } from "@/app/api/chat/route";
import { CohereClient } from "cohere-ai";

export interface CharacterPromptData {
  [time: string]: {
    [character: string]: {
      system: string;
      user: string;
    };
  };
}

export interface GeneralPromptData {
  user: string;
  role_play_grand_inquisitor: string;
  role_play_devil: string;
}

interface Document {
  text: string;
}

interface Result {
  document?: Document;
  index: number;
  relevanceScore: number;
}

interface RerankMeta {
  apiVersion?: {
    version: string;
  };
  billedUnits?: {
    searchUnits?: number;
  };
}

interface RerankedResults {
  id?: string;
  results: Result[];
  meta?: RerankMeta;
}

// Perform similarity search in Supabase vector store and retrieve top 5 summary chunks & top 3 original text chunks
export const retrieveContextDocuments = async (prompt: string) => {
  const client = createClient(getSupabaseURL(), getSupabaseKey()); // supabase client

  const embeddings = new VoyageEmbeddings({
    apiKey: getVoyageAIKey(),
    modelName: "voyage-large-2",
  });

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });

  // filter to include 5 summaries and 3 original text paragraphs
  const summaryFilter: SupabaseFilterRPCCall = (rpc) =>
    rpc.filter("metadata->>source", "eq", "../public/summary.txt");

  const originalTextFilter: SupabaseFilterRPCCall = (rpc) =>
    rpc.filter(
      "metadata->>source",
      "eq",
      "../public/the_brothers_karamazov.txt"
    );

  const summaryResults = await vectorStore.similaritySearchWithScore(
    prompt,
    20,
    summaryFilter
  );

  const originalTextResults = await vectorStore.similaritySearchWithScore(
    prompt,
    20,
    originalTextFilter
  );

  const numSummaries = 5;
  const numOriginalTexts = 3;

  const summaries = summaryResults.map(([doc]) => doc.pageContent);
  const originalTexts = originalTextResults.map(([doc]) => doc.pageContent);

  const rerankedSummaries = await rerankResults(
    prompt,
    summaries,
    numSummaries
  );
  const rerankedOriginalTexts = await rerankResults(
    prompt,
    originalTexts,
    numOriginalTexts
  );

  let mergedResults = [...rerankedSummaries, ...rerankedOriginalTexts];
  if (mergedResults.length <= numSummaries + numOriginalTexts) {
    // if we don't have enough results (meaning rerank API rate limit is exceeded), just use similarity search results
    // this is because we're using trial rerank API, not prod
    mergedResults = [
      ...summaries.slice(0, numSummaries),
      ...originalTexts.slice(0, numOriginalTexts),
    ];
  }
  return mergedResults;
};

const rerankResults = async (
  prompt: string,
  results: string[],
  topN: number
) => {
  try {
    const cohere = new CohereClient({
      token: getCohereTrialKey(),
    });

    const documents = results.map((item) => ({
      text: item,
    }));

    const rerankedResults: RerankedResults = await cohere.rerank({
      model: "rerank-english-v3.0",
      documents: documents,
      query: prompt,
      topN: topN,
      returnDocuments: true,
    });

    // transform reranked results back into a list of strings
    const rerankedResultsStrings: string[] = rerankedResults.results
      .filter((result) => result.document !== undefined)
      .map((result) => result.document!.text);

    return rerankedResultsStrings;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// embed XML tags into messages
const formatMessages = async (messages: Message[]) => {
  if (messages.length == 0) {
    return "";
  }

  const xmlMessages = messages
    .map(
      (message) => `
        <message>
        <role>${message.role}</role>
        <message_content>${message.content}</message_content>
        </message>
    `
    )
    .join("\n");

  const xmlString = `
    <messages>
    ${xmlMessages}
    </messages>
    `;

  return xmlString;
};

// structure long document prompt for long context windows as suggested by https://docs.anthropic.com/claude/docs/long-context-window-tips#structuring-long-documents
export const structureSystemPrompt = async (
  messages: Message[],
  time: string,
  character: string
) => {
  const characterPromptsFormatted = characterPrompts as CharacterPromptData;
  const generalPromptsFormatted = generalPrompts as GeneralPromptData;

  const prompt = characterPromptsFormatted[time][character]["system"];

  const messagesTruncated = messages.slice(-6);
  const xmlMessages = await formatMessages(messagesTruncated);

  // retrieve context documents based on prompt and previous messages
  const promptAndMessages =
    prompt + "Here is the dialogue so far for context:\n" + xmlMessages;
  const contextDocuments = await retrieveContextDocuments(promptAndMessages);

  // embed XML tags into list of documents
  const taggedDocuments: string[] = contextDocuments.map((doc, index) => {
    const taggedStr = `<document id="${
      index + 1
    }">\n<document_content>\n${doc}\n<document_content>\n</document>`;
    return taggedStr;
  });
  const documentString: string =
    "<documents>\n" + taggedDocuments.join("\n") + "\n<documents>\n";

  let generalPromptRole: string = "user";
  if (character === "Ivan's Devil") {
    generalPromptRole = "role_play_devil";
  } else if (character === "Ivan-roleplay") {
    generalPromptRole = "role_play_grand_inquisitor_alyosha";
  } else if (character === "Alyosha-roleplay") {
    generalPromptRole = "role_play_grand_inquisitor_ivan";
  }

  const finalPrompt: string =
    promptAndMessages +
    "Here are some documents for you to reference for your task:\n" +
    documentString +
    generalPromptsFormatted[generalPromptRole as keyof GeneralPromptData];
  return finalPrompt;
};
