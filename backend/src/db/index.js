import "../config/env.js";
import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACE_API_KEY,
  model: "BAAI/bge-small-en-v1.5",
});

// async function testEmbedding() {
//   const vector = await embeddings.embedQuery("Hello");
//   console.log("Vector Length:", vector.length);
// }

// testEmbedding();

const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
)

export const vectoreStore = new SupabaseVectorStore(embeddings,{
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents"
})