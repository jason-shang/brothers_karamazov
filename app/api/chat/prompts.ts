import { createClient } from "@supabase/supabase-js";
import {
  SupabaseVectorStore,
  SupabaseFilterRPCCall,
} from "@langchain/community/vectorstores/supabase";
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";
import { getSupabaseURL, getSupabaseKey, getVoyageAIKey } from "@/lib/utils";
import characterPrompts from "@/public/characterPrompts.json";
import generalPrompts from "@/public/generalPrompts.json";
import { Message } from "@/app/api/chat/route";

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

// Perform similarity search in Supabase vector store and retrieve top 5 summary chunks & top 3 original text chunks
export const retrieveContextDocuments = async (prompt: string) => {
  const client = createClient(getSupabaseURL(), getSupabaseKey());

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
    5,
    summaryFilter
  );

  const originalTextResults = await vectorStore.similaritySearchWithScore(
    prompt,
    3,
    originalTextFilter
  );

  const mergedResults = [...summaryResults, ...originalTextResults];
  // transform mergedResults into list of just strings
  const mergedStrings: string[] = mergedResults.map(([doc]) => doc.pageContent);
  return mergedStrings;
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
  } else if (character === "Grand Inquisitor") {
    generalPromptRole = "role_play_grand_inquisitor";
  }

  const finalPrompt: string =
    promptAndMessages +
    "Here are some documents for you to reference for your task:\n" +
    documentString +
    generalPromptsFormatted[generalPromptRole as keyof GeneralPromptData];
  return finalPrompt;
};
