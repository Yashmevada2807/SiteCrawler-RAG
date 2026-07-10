import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { vectoreStore } from "../db/index.js";
import dotenv from "dotenv"


const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL,
    maxOutputTokens: 1024,
})


export const processUserQuery = async (userPrompt) => {

    const relevantData = await vectoreStore.similaritySearch(userPrompt, 10)

    if (relevantData.length === 0) {
        return {
            answer: "I haven't indexed any website content yet. Please provide a URL first so I can crawl it!",
            sources: []
        };
    }

    console.log("Retrieved Documents:");
    relevantData.forEach((doc, index) => {
        console.log(`\nDocument ${index + 1}`);
        console.log("Source:", doc.metadata.sourceUrl);
        console.log("Content:", doc.pageContent.slice(0, 500));
    });

    const contextText = relevantData.map((docs) => docs.pageContent).join("\n\n")

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
        const response = await model.invoke(systemPrompt)

        return {
            answer: response.content,
            source: uniqueSources
        }
    } catch (error) {
        console.error(`[CHAT SERVICE ERROR]: ${error.message}`);
        throw new Error("Failed to communicate with Gemini AI engine.");
    }
}