# 🕸️ SiteCrawler-RAG

A Retrieval-Augmented Generation (RAG) app that lets you **chat with any website**. Give it a URL, it crawls and scrapes the page content, converts it into embeddings, stores them in a vector database, and then answers your questions using only what it found on that site — with an LLM generating the final response.

🔗 **Live App:** [https://site-crawler-rag.vercel.app/](https://site-crawler-rag.vercel.app/)

---

## 💡 What this project does

1. You paste in a website URL.
2. The backend crawls the page and scrapes readable content from it using **Cheerio**.
3. That content is split into chunks and converted into vector embeddings.
4. The embeddings + chunks are stored in **Supabase** (as a vector store).
5. When you ask a question, the app converts your question into an embedding too, finds the most relevant chunks from that site using similarity search, and passes them as context to an LLM.
6. The LLM (Groq's `llama-3.1-8b-instant`) generates a natural-language answer based only on the retrieved context — so answers stay grounded in the actual site content instead of the model hallucinating.

Basically: **Crawl → Chunk → Embed → Store → Retrieve → Answer.**

---

## 🛠️ Tech Stack

### Frontend
- **Vite + React** — fast dev environment and UI
- **Axios** — API calls to the backend
- **Lucide React** — icons
- **Tailwind CSS** — styling

### Backend
- **Express.js** — REST API server
- **CORS** — cross-origin handling between frontend and backend
- **Dotenv** — environment variable management
- **Cheerio** — web scraping / HTML parsing for the crawler
- **Groq API** (`llama-3.1-8b-instant`) — fast LLM inference for generating chat responses
- **Hugging Face Inference API** (`BAAI/bge-small-en-v1.5`) — generates embeddings for both site content and user queries
- **LangChain (`@langchain/community`)** — used as the framework layer to wire up the Hugging Face embedding model and the Groq chat model into the RAG pipeline
- **`@langchain/groq`** — LangChain's Groq integration, used to call `llama-3.1-8b-instant` for generating chat responses
- **Supabase** — Postgres + `pgvector` used as the vector database to store and query embeddings

---

## ⚙️ How it works (Workflow)

```
User enters a URL
        │
        ▼
POST /crawl  ──▶  Cheerio scrapes & cleans the page content
        │
        ▼
Content is split into chunks
        │
        ▼
Each chunk → LangChain (Hugging Face bge-small-en-v1.5) → 384-dim embedding
        │
        ▼
Chunks + embeddings stored in Supabase (vector table)
        │
        ▼
User asks a question  ──▶  POST /chat
        │
        ▼
Question → embedding → similarity search in Supabase
        │
        ▼
Top matching chunks retrieved as context
        │
        ▼
Context + question sent via LangChain (@langchain/groq) to Groq (llama-3.1-8b-instant)
        │
        ▼
LLM generates final answer → returned to frontend
```

---

## 🔌 API Endpoints

### `POST /crawl`
Crawls and scrapes a given website, generates embeddings for its content, and stores them in Supabase.

**Request body:**
```json
{
  "url": "https://example.com"
}
```

**Response:** confirmation that the site was crawled and its chunks were embedded and stored.

---

### `POST /chat`
Takes a user question, retrieves the most relevant chunks for the previously crawled site, and returns an AI-generated answer.

**Request body:**
```json
{
  "userInput": "What does this website offer?"
}
```

**Response:** an AI-generated answer based on the retrieved context from the crawled site.

---

## 🚧 Problems I faced (and how I solved them)

**1. Gemini's embedding model didn't work as expected**
I initially tried using Gemini's `text-embedding-004` model for generating embeddings, but I kept running into issues getting it to work reliably. After digging around, I switched to Hugging Face's `BAAI/bge-small-en-v1.5` model instead, and it worked perfectly right away.

**2. Gemini's chat responses were too slow**
For the actual chat/answer generation, I first used Gemini, but the response time was noticeably slow for a chat-like experience. I switched to **Groq**, running `llama-3.1-8b-instant`, which gave near-instant responses and made the app feel much more responsive.

**3. Vector dimension mismatch in Supabase**
Since I originally planned around Gemini's embedding output (1536 dimensions... adjust if different), my Supabase table was set up with a `vector(1536)` column. After switching to the Hugging Face model, which outputs **384-dimensional** embeddings, I had to go back and update the column type in Supabase from `vector(1536)` to `vector(384)` to match. Once that was fixed, storing and querying embeddings worked smoothly.

---

## 🧪 Try it yourself

**Test website to crawl:**
```
https://posimyth.com
```

**Sample prompts to ask after crawling:**
1. "What services does this company offer?"
2. "Summarize what this website is about in a few lines."
3. "Does this site mention anything about contact details or location?"

---

## 🚀 Running this project locally

### Prerequisites
- Node.js (v18 or above recommended)
- A Supabase project with `pgvector` enabled
- A Groq API key
- A Hugging Face API key/token

### 1. Clone the repository
```bash
git clone https://github.com/Yashmevada2807/SiteCrawler-RAG.git
cd SiteCrawler-RAG
```

### 2. Setup the backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
```

Run the backend:
```bash
npm run dev
```

### 3. Setup the frontend
Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/` with:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```

### 4. Open the app
Visit `http://localhost:5173` (or whichever port Vite gives you) in your browser, paste in a website URL to crawl, and start chatting with it.

---

## 📌 Notes
- Supabase's vector column dimension **must match** the embedding model's output size (384 for `BAAI/bge-small-en-v1.5`). If you swap embedding models later, update the column accordingly.
- Since Groq is used for generation, make sure your API key has access to `llama-3.1-8b-instant`.

---

## 🙌 Author
Built by **Yash Mevada** — feel free to fork this repo, raise issues, or suggest improvements.
