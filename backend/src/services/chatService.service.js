import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { vectoreStore } from "../db/index.js";
import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv"


const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-8b-instant",
});


export const processUserQuery = async (userPrompt, userId) => {

    console.time("Similarity Search");
    const relevantData = await vectoreStore.similaritySearch(
        userPrompt,
        10,
        {
            user_id: userId
        }
    )
    console.log("userId: ",userId)
    console.log("relevant data: ",relevantData)
    console.timeEnd("Similarity Search");

    if (relevantData.length === 0) {
        return {
            answer: "I haven't indexed any website content yet. Please provide a URL first so I can crawl it!",
            sources: []
        };
    }

    // console.log("Retrieved Documents:");
    // relevantData.forEach((doc, index) => {
    //     console.log(`\nDocument ${index + 1}`);
    //     console.log("Source:", doc.metadata.sourceUrl);
    //     console.log("Content:", doc.pageContent.slice(0, 500));
    // });

    console.time("Context Building");
    const contextText = relevantData.map((docs) => docs.pageContent).join("\n\n")
    console.timeEnd("Context Building");

    const uniqueSources = [...new Set(relevantData.map((docs) => docs.metadata.sourceUrl))]

    const systemPrompt = `
    You are an AI assistant.

    Use ONLY the provided context.

    If the context contains enough information to answer the question, answer clearly.

    If the answer is not present in the context, reply exactly:
    "I cannot find the answer in the provided website."

    Context:
    ${contextText}

    Question:
    ${userPrompt}`

    try {

        console.time("Embedding Query");
        const queryEmbedding = await vectoreStore.embeddings.embedQuery(userPrompt);
        console.timeEnd("Embedding Query");
        console.time("Gemini")
        const response = await model.invoke(systemPrompt)
        console.timeEnd("Gemini");

        return {
            answer: response.content,
            source: uniqueSources
        }
    } catch (error) {
        console.error(`[CHAT SERVICE ERROR]: ${error.message}`);
        throw new Error("Failed to communicate with Gemini AI engine.");
    }
}