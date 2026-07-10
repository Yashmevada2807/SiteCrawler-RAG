import { Bot, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Bot className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              SiteCrawler AI
            </h1>

            <p className="text-sm text-slate-400">
              AI Powered Website Question Answering
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 md:flex">
          <Sparkles className="h-4 w-4 text-blue-400" />

          <span className="text-sm text-slate-300">
            RAG Assistant
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;