-- Increase the vector dimension for the documents.embedding column
-- This should match the embedding model output size (e.g. Gemini embedding 3072).

ALTER TABLE "documents"
  ALTER COLUMN "embedding" TYPE vector(3072);
