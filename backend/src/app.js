import express from "express"
import cors from "cors"

const app = express()

// basic configurations
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// cors configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"]
}))

import crawlingSiteRouter from "./routes/crawling.route.js"
import chatRouter from "./routes/chat.route.js"

app.use("/v1/api/crawl", crawlingSiteRouter)
app.use("/v1/api", chatRouter)


app.get("/", (req, res) => {
    res.send("Hello siteCrawler-rag");
})

export default app