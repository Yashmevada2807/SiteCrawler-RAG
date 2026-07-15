import axios from "axios";
import { Globe, ArrowRight } from "lucide-react";
import { useState } from "react";
import { getUserId } from "../random/GenerateUserId";
import { toast } from "react-toastify";

const UrlInput = ({ setCrawledPagesStatus, setLoading, loading }) => {
  const [url, setUrl] = useState("");

  const crawlingSite = async () => {
    if (!url.trim()) {
      toast.warn("Please Insert Website Url first")
      return
    };
    try {
      toast("Website Crawling Initiated")
      setLoading(true);
      const response = await axios.post(
        ` ${import.meta.env.VITE_BACKEND_SERVER_URL}v1/api/crawl/crawlingSite`,
        {
          url,
          userId: getUserId()
        }
      );
      setCrawledPagesStatus(response.data.data);
      setUrl("")
      return response.data;
    } catch (error) {
      console.error("Error", error);
    } finally {
      toast.success("Website Crawled successfull , Ask anything about Website in ChatBox.")
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") crawlingSite();
  };

  return (
    <div className="space-y-3">
      <label className="font-mono text-xs uppercase tracking-wider text-ink-3">
        Source url
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Globe className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="https://docs.example.com"
            className="w-full rounded-lg border border-line bg-paper-3 py-2.5 pl-10 pr-4 font-mono text-sm text-ink outline-none placeholder:text-ink-3 focus:border-rust"
          />
        </div>

        <button
          onClick={crawlingSite}
          disabled={loading}
          className={`flex ${loading ? "disabled:cursor-not-allowed disabled:opacity-60": "cursor-pointer"} items-center justify-center gap-2 rounded-lg bg-rust px-5 py-2.5 text-sm font-medium text-paper-2 hover:bg-rust-dark `}
        >
          {loading ? "Crawling" : "Crawl site"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default UrlInput;
