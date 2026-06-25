import { Pinecone } from "@pinecone-database/pinecone";

let pinecone: Pinecone | null = null;

export function getPineconeIndex() {
    const indexName = process.env.PINECONE_INDEX;

    if (!indexName) {
        throw new Error("PINECONE_INDEX is not set");
    }

    if (!pinecone) {
        const apiKey = process.env.PINECONE_API_KEY;

        if (!apiKey) {
            throw new Error("PINECONE_API_KEY is not set");
        }

        pinecone = new Pinecone({ apiKey });
    }

    return pinecone.index(indexName);
}
