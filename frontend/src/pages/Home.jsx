import Navbar from "../components/Navbar";
import StatusBar from "../components/StatusBar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import UrlInput from "../components/URLInput";
import { useState } from "react";

const Home = () => {
  const [crawledPagesStatus, setCrawledPagesStatus] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userPrompt, setUserPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [messages, setMessages] = useState([])
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto flex h-[calc(100vh-72px)] max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
        {/* Website Crawl Section */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Website Crawler</h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter a website URL, crawl its content, and ask AI questions based
              on the indexed data.
            </p>
          </div>

          <UrlInput setCrawledPagesStatus={setCrawledPagesStatus} setLoading={setLoading} loading={loading} />

          <div className="mt-5">
            <StatusBar crawledPagesStatus={crawledPagesStatus} loading={loading} />
          </div>
        </section>

        {/* Chat Section */}
        <section className="flex min-h-120 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
          <div className="border-b border-slate-800 px-6 py-4">
            <h2 className="text-xl font-semibold">AI Assistant</h2>
            <p className="text-sm text-slate-400">
              Ask questions about the crawled website.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <ChatWindow userPrompt={userPrompt} aiResponse={aiResponse} messages={messages}/>
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 p-5">
            <ChatInput setLoading={setLoading} loading={loading} userPrompt={userPrompt} setUserPrompt={setUserPrompt} setAiResponse={setAiResponse} setMessages={setMessages} messages={messages} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;