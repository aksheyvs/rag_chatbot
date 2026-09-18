import { embed, embedMany } from "ai"
import { google } from "@ai-sdk/google";

export async function generateEmbedding(text: string) {
    const input = text.replace("\n", " ");

    const { embedding } = await embed({
        model: google.embeddingModel("gemini-embedding-001"),
        value: input,
    });

    return embedding;
}

export async function generateEmbeddings(texts: string[]) {
    const input = texts.map((text) => text.replace("\n", " "))

    const { embeddings } = await embedMany({
        model: google.embeddingModel("gemini-embedding-001"),
        values: input,
    });

    return embeddings;
}
