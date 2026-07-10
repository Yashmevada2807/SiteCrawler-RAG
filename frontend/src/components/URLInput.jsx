import axios from "axios";
import { Globe, Search } from "lucide-react";
import { useState } from "react";

const UrlInput = ({setCrawledPagesStatus, setLoading, loading}) => {

    const [url, setUrl] = useState("")
    
    

    const crawlingSite = async () => {
        if (!url.trim()) return
        try {
            setLoading(true)
            const response = await axios.post(`http://localhost:3000/v1/api/crawl/crawlingSite`, {
                url,
            })
            console.log(response.data.data)
            setCrawledPagesStatus(response.data.data)
            return response.data
        } catch (error) {
            console.error("Error", error)
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-slate-300">
                Website URL
            </label>

            <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                    <Globe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        type="text"
                        placeholder="https://example.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={crawlingSite}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700">
                    <Search className="h-5 w-5" />
                    {loading ? "Crawling..." : "Crawl Website"}
                </button>
            </div>
        </div>
    );
};

export default UrlInput;