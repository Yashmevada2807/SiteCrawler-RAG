import { Waypoints } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper-2/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-paper-2">
            <Waypoints className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <h1 className="font-display text-[15px] font-semibold tracking-tight text-ink">
              SiteCrawler
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-3">
              RAG 
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
