import SitemapGraphic from "./SitemapGraphic";

const StatusBar = ({ crawledPagesStatus, loading }) => {
  const isDone = crawledPagesStatus > 0;

  return (
    <div className="rounded-lg border border-line bg-paper-3 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-3">
            Pages indexed
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            {crawledPagesStatus}
          </p>
          <p className="mt-1 text-sm text-ink-2">
            {loading
              ? "Crawling in progress\u2026"
              : isDone
              ? "Ready for questions"
              : "Waiting for a source url"}
          </p>
        </div>

        <SitemapGraphic active={loading} />
      </div>

      {isDone && !loading && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-sage-tint px-2.5 py-1 text-xs font-medium text-sage">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          Site indexed
        </div>
      )}
    </div>
  );
};

export default StatusBar;
