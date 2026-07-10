import { CircleDot } from "lucide-react";

const StatusBar = ({ crawledPagesStatus, loading }) => {
    return (
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <CircleDot className="h-5 w-5 text-yellow-400" />

                    <div>
                        <h3 className="font-semibold text-white">
                            Status
                        </h3>

                        <p className="text-sm text-slate-400">
                            {crawledPagesStatus === 0 ? "Waiting to crawl a website..." : "Website crawled successfully"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2">
                        <p className="text-xs text-slate-500">
                            Pages Crawled
                        </p>

                        <p className="font-semibold text-white">
                            {crawledPagesStatus}
                        </p>
                    </div>

                    {/* <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2">
                        <p className="text-xs text-slate-500">
                            Chunks Indexed
                        </p>

                        <p className="font-semibold text-white">
                            0
                        </p>
                    </div> */}
{/* 
                    <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2">
                        <p className="text-xs text-slate-500">
                            AI Ready
                        </p>

                        <p className="font-semibold text-yellow-400">
                            Idle
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default StatusBar;