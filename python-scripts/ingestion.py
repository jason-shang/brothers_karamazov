import json
from langchain_community.document_loaders import TextLoader, DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_voyageai import VoyageAIEmbeddings
from supabase.client import create_client

with open('config.json') as f:
    config = json.load(f)
    supabase_url = config["SUPABASE_URL"]
    supabase_service_key = config["SUPABASE_SERVICE_KEY"]
    dev_voyageai_key = config["DEV_VOYAGEAI_KEY"]

chunk_sizes = {
    "summary.txt": 500,
    "the_brothers_karamazov.txt": 2000
}

def ingestTextToSupabase(path: str, chunk_sizes: dict) -> None:
    """
    path: str referencing the directory path storing all the txt files
    chunk_sizes: dict mapping file names to their desired chunk sizes
    """
    loader = DirectoryLoader(path, loader_cls=TextLoader)
    docs = loader.load()

    split_docs = []
    for doc in docs:
        file_name = doc.metadata['source'].split('/')[-1]
        chunk_size = chunk_sizes.get(file_name, 1000)  # Default chunk size is 1000

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=100,
            length_function=len,
            is_separator_regex=False,
        )

        split_doc = text_splitter.split_documents([doc])
        split_docs.extend(split_doc)

    # embedding model recommended by Anthropic
    embeddings = VoyageAIEmbeddings(
        voyage_api_key=dev_voyageai_key, model="voyage-large-2"
    )

    supabase_client = create_client(supabase_url, supabase_service_key)

    vector_store = SupabaseVectorStore.from_documents(
        split_docs,
        embedding=embeddings,
        client=supabase_client,
        table_name="documents",
        query_name="match_documents",
        chunk_size=100, # batch size for inserting embeddings into the documents table
    )

if __name__ == '__main__':
    ingestTextToSupabase("../public/texts", chunk_sizes)