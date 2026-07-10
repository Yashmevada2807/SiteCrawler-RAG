import Navbar from "../components/Navbar";
import StatusBar from "../components/StatusBar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import UrlInput from "../components/URLInput";
import { useState } from "react";

const Home = () => {
  const [crawledPagesStatus, setCrawledPagesStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main className="mx-auto grid h-[calc(100vh-64px)] max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:px-8 lg:grid-cols-[360px_1fr]">
        {/* Crawl column */}
        <section className="flex flex-col gap-6 lg:overflow-y-auto lg:pr-1">
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-rust">
              01 — Index a source
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink">
              Point at a site
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              Give it a url. It crawls the pages and builds a searchable
              index for the assistant to draw answers from.
            </p>

            <div className="mt-5">
              <UrlInput
                setCrawledPagesStatus={setCrawledPagesStatus}
                setLoading={setLoading}
                loading={loading}
              />
            </div>

            <div className="mt-5">
              <StatusBar crawledPagesStatus={crawledPagesStatus} loading={loading} />
            </div>
          </div>
        </section>

        {/* Chat column */}
        <section className="flex min-h-112 flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-paper-2">
          <div className="border-b border-line px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-wider text-indigo">
              02 — Ask questions
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Assistant
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <ChatWindow userPrompt={userPrompt} aiResponse={aiResponse} messages={messages} />
          </div>

          <div className="border-t border-line p-5">
            <ChatInput
              setLoading={setLoading}
              loading={loading}
              userPrompt={userPrompt}
              setUserPrompt={setUserPrompt}
              setAiResponse={setAiResponse}
              setMessages={setMessages}
              messages={messages}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
