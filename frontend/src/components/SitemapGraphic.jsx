const nodes = [
  { id: "root", x: 20, y: 40, r: 5 },
  { id: "a", x: 90, y: 14, r: 3.5 },
  { id: "b", x: 96, y: 44, r: 3.5 },
  { id: "c", x: 82, y: 70, r: 3.5 },
  { id: "d", x: 150, y: 26, r: 3 },
  { id: "e", x: 150, y: 58, r: 3 },
];

const edges = [
  ["root", "a"],
  ["root", "b"],
  ["root", "c"],
  ["a", "d"],
  ["b", "d"],
  ["b", "e"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

const SitemapGraphic = ({ active = false }) => {
  return (
    <svg
      viewBox="0 0 170 84"
      className="h-16 w-36 shrink-0"
      role="img"
      aria-label="Diagram of a crawled site's page graph"
    >
      {edges.map(([from, to], i) => {
        const a = byId[from];
        const b = byId[to];
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--color-line-2)"
            strokeWidth="1"
          />
        );
      })}
      {nodes.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.id === "root" ? "var(--color-rust)" : "var(--color-indigo)"}
          className={active ? "node-pulse" : ""}
          style={n.id !== "root" && active ? { animationDelay: `${Math.random() * 0.6}s` } : undefined}
        />
      ))}
    </svg>
  );
};

export default SitemapGraphic;
