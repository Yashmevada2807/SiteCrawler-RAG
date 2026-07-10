import axios from "axios"
import * as cheerio from "cheerio"
import { asyncHandler } from "../utils/async-handler.js"
import { ApiError } from "../utils/api-error.js"
import { ApiRespose } from "../utils/api-response.js"
import { Document } from "@langchain/core/documents";
import { vectoreStore } from "../db/index.js"

const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const chunkText = (text, chunkSize = 600, overlap = 100) => {

    const chunks = []
    let index = 0

    while (index < text.length) {
        chunks.push(text.slice(index, index + chunkSize))
        index += chunkSize - overlap
    }

    return chunks
}

export const crawlingSite = async (incomingUrl, pageLimit = 22) => {
    const targetHostname = new URL(incomingUrl).hostname
    const visited = new Set()
    const queue = [incomingUrl]

    while (queue.length > 0 && visited.size < pageLimit) {
        let currentUrl = queue.shift()

        if (visited.has(currentUrl)) continue
        visited.add(currentUrl)
        console.log(`[CRAWLER] Politely visiting: ${currentUrl}`);
        try {

            await delay(2000)

            const { data } = await axios.get(currentUrl)

            const $ = cheerio.load(data)

            console.log("Current URL:", currentUrl);
            console.log("Links found:", $("a[href]").length);

            $("a[href]").each((_, element) => {
                const href = $(element).attr("href")

                if (!href) return

                try {
                    const absoluteUrl = new URL(href, incomingUrl).href
                    console.log("Absolute:", absoluteUrl);
                    const discoveredHostname = new URL(absoluteUrl).hostname

                    if (discoveredHostname === targetHostname && !visited.has(absoluteUrl)) {
                        console.log("Added to queue:", absoluteUrl);
                        queue.push(absoluteUrl)
                    }
                } catch (error) {
                    console.error(error)
                }
            })

            $("nav, footer, script, style, header, .cookie-banner, #menu").remove();

            const cleanText = $("body").text().replace(/\s+/g, " ").trim()

            const textChunks = chunkText(cleanText, 700, 100)

            const documents = textChunks.map((chunkStr) => {
                return new Document({
                    pageContent: chunkStr,
                    metadata: {
                        sourceUrl: currentUrl
                    }
                })
            })

            if (documents.length > 0) {
                console.log("Documents:", documents.length);
                console.log("First document:", documents[0]);

                try {
                    const result = await vectoreStore.addDocuments(documents);
                    console.log("addDocuments result:", result);
                } catch (err) {
                    console.error("addDocuments error:");
                    console.error(err);
                }
            }   
        } catch (error) {
            console.error(`[CRAWLER ERROR] Failed processing ${currentUrl}: ${error}`);
        }
    }

    console.log("Visited:", [...visited]);
    console.log("Queue:", queue);

    return visited.size
}