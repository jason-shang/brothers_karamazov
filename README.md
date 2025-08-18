# An AI Journey into The Brothers Karamazov 📚

**⚠️ Spoiler Alert:** If you haven't read *The Brothers Karamazov*, please turn back now!

This website allows you to step into the world of Dostoevsky and interact with characters from "The Brothers Karamazov" within pivotal scenes. Ever wondered what you would say to Smerdyakov moments before his suicide, or to Father Zossima on his deathbed? Now you can find out.

**👉 Check out the live experience [here](https://brothers-karamazov-kwni41e4s-jason-shangs-projects.vercel.app)!**

I also wrote a [blog post](https://bloggerskaramazov.com/2024/08/07/an-ai-powered-journey-into-the-world-of-the-brothers-karamazov/) that dives deeper into the project's inspiration and my reflections on AI and humanity. A huge thank you to [the North American Dostoevsky Society](https://dostoevsky.org) for graciously featuring this work! 

---

## 👨‍💻 For the Programmers Out There

This project is powered by a Retrieval-Augmented Generation (RAG) pipeline designed to provide a Large Language Model with relevant context from the novel. Here's a look at the tech stack and architecture:

### Ingestion Pipeline 📤

1.  **Text Chunking**: The source texts (`/public/texts/summary.txt` and `/public/texts/the_brothers_karamazov.txt`) are split into manageable chunks—500 characters for the summary and 2000 for the original text.
2.  **Embedding Generation**: I used `voyage-large-2` model from Voyage AI to generate vector embeddings for each text chunk (and for queries at retrieval time).
3.  **Vector Storage**: The embeddings and their corresponding text are stored in a Supabase PostgreSQL database with `pgvector` extension enabled. 

### Retrieval & Serving Pipeline 📥

1.  **Similarity Search**: When a user interacts with a character, the application queries the vector store, retrieving the top 20 most similar chunks from both the summary and the original text based on the conversation's context.
2.  **Reranking for Precision**: The [Cohere Rerank API](https://docs.cohere.com/docs/rerank-overview) is then used to sift through the initial results and distill them down to the 4 most relevant summaries and 3 most relevant passages from the original text.
3.  **Building Context**: This refined context, along with custom system prompts, is then fed to `meta-llama/Llama-3.3-70B-Instruct-Turbo` hosted on Together AI's serverless platform. 

Note: in my opinion the biggest innovations (literary, not technical) here are the system prompts (check them out at `/public/characterPrompts.json`). These are my personal interpretations of the characters at various points in the novel. So perhaps, the characters you end up talking to on the website is half Dostoevsky and half me...

### Development Notes 📝

For local development, get started by installing the dependencies and linking your local repository with Vercel to sync your environment variables.

1.  **Install Dependencies:**
    ```bash
    npm i
    ```

2.  **Link Vercel & Sync Environment Variables:**
    ```bash
    vercel link
    vercel env pull .env.local
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.