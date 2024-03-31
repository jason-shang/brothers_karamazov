import fs from "node:fs/promises";
import { VoyageEmbeddings } from "langchain/embeddings/voyage";
import { VercelPostgres } from "@langchain/community/vectorstores/vercel_postgres";
import { getVoyageAIKey } from "@/lib/utils";
import {
  Document,
  IngestionPipeline,
  OpenAIEmbedding,
  TitleExtractor,
  SimpleNodeParser,
  VectorStoreIndex,
  storageContextFromDefaults,
} from "llamaindex";

async function main() {
  // load book pdf in Node
  const bkPath = "public/The-Brothers-Karamazov.pdf";
  const book = await fs.readFile(bkPath, "utf-8");

  // Create Document object with book Node
  const document = new Document({ text: book, id_: bkPath });
  const pipeline = new IngestionPipeline({
    transformations: [
      new SimpleNodeParser({ chunkSize: 1024, chunkOverlap: 20 }),
      new TitleExtractor(),
      new OpenAIEmbedding(),
    ],
  });

  const nodes = await pipeline.run({ documents: [document] });

  // initialize vector store
  // Voyage AI embedding model is recommended on Anthropic's website
  // TODO: look into Supabase for vector store (goal is to store the calculated indices from the book text)
  const voyageAIKey = getVoyageAIKey();
//   const vercelPostgresStore = await VercelPostgres.initialize(
//     new VoyageEmbeddings({apiKey: voyageAIKey})
//   );
}

main().catch(console.error);