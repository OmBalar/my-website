import React, { useMemo, useState } from "react";
import { skillGraph } from "./data";

const RING_RADIUS = { 1: 132, 2: 205, 3: 268 };
const RING_LABEL = { 1: "Core", 2: "Proficient", 3: "Familiar" };
const DOT_RADIUS = { 1: 9, 2: 7, 3: 5.5 };

/*
 * Deterministic force-directed layout: nodes are seeded near the angle of the
 * skills they connect to, then relaxed with repulsion, link springs, and a
 * radial pull toward their proficiency ring.
 */
function computeLayout(nodes, links) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const ringRadiusOf = (id) => (id === "om" ? 0 : RING_RADIUS[byId.get(id).ring]);

  const parents = new Map();
  links.forEach(([a, b]) => {
    const ra = a === "om" ? 0 : byId.get(a).ring;
    const rb = b === "om" ? 0 : byId.get(b).ring;
    if (ra === rb) return;
    const child = ra > rb ? a : b;
    const parent = ra > rb ? b : a;
    if (!parents.has(child)) parents.set(child, []);
    parents.get(child).push(parent);
  });

  const angles = new Map();
  const ring1 = nodes.filter((n) => n.ring === 1);
  ring1.forEach((n, i) => {
    angles.set(n.id, (i / ring1.length) * Math.PI * 2 - Math.PI / 2);
  });
  [2, 3].forEach((ring) => {
    const layer = nodes.filter((n) => n.ring === ring);
    layer.forEach((n, i) => {
      const anchors = (parents.get(n.id) || []).filter((p) => angles.has(p));
      let angle;
      if (anchors.length > 0) {
        let sx = 0;
        let sy = 0;
        anchors.forEach((p) => {
          sx += Math.cos(angles.get(p));
          sy += Math.sin(angles.get(p));
        });
        angle = Math.atan2(sy, sx);
      } else {
        angle = (i / layer.length) * Math.PI * 2;
      }
      angles.set(n.id, angle + ((i % 5) - 2) * 0.42);
    });
  });

  const pos = new Map([["om", { x: 0, y: 0 }]]);
  nodes.forEach((n) => {
    const a = angles.get(n.id);
    const r = RING_RADIUS[n.ring];
    pos.set(n.id, { x: Math.cos(a) * r, y: Math.sin(a) * r });
  });

  const ids = ["om", ...nodes.map((n) => n.id)];
  const ITERATIONS = 340;
  for (let iter = 0; iter < ITERATIONS; iter++) {
    const alpha = 0.9 * (1 - iter / ITERATIONS);

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const A = pos.get(ids[i]);
        const B = pos.get(ids[j]);
        let dx = B.x - A.x;
        let dy = B.y - A.y;
        const d2 = dx * dx + dy * dy || 1;
        const d = Math.sqrt(d2);
        // extra push between same-ring nodes so labels don't collide along a ring
        const ringA = ids[i] === "om" ? 0 : byId.get(ids[i]).ring;
        const ringB = ids[j] === "om" ? 0 : byId.get(ids[j]).ring;
        const sameRingBoost = ringA === ringB ? 1.9 : 1.25;
        const f = Math.min((4600 * sameRingBoost) / d2, 10) * alpha;
        dx /= d;
        dy /= d;
        if (ids[i] !== "om") {
          A.x -= dx * f;
          A.y -= dy * f;
        }
        if (ids[j] !== "om") {
          B.x += dx * f;
          B.y += dy * f;
        }
      }
    }

    links.forEach(([a, b]) => {
      const A = pos.get(a);
      const B = pos.get(b);
      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const d = Math.hypot(dx, dy) || 1;
      const ideal = Math.max(Math.abs(ringRadiusOf(a) - ringRadiusOf(b)), 80);
      const f = (d - ideal) * 0.045 * alpha;
      const ux = dx / d;
      const uy = dy / d;
      if (a !== "om") {
        A.x += ux * f;
        A.y += uy * f;
      }
      if (b !== "om") {
        B.x -= ux * f;
        B.y -= uy * f;
      }
    });

    nodes.forEach((n) => {
      const P = pos.get(n.id);
      const d = Math.hypot(P.x, P.y) || 1;
      const f = (RING_RADIUS[n.ring] - d) * 0.1 * alpha;
      P.x += (P.x / d) * f;
      P.y += (P.y / d) * f;
    });
  }
  return pos;
}

function scrollToCard(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("flash-highlight");
  setTimeout(() => el.classList.remove("flash-highlight"), 2000);
}

export default function SkillGraph() {
  const { center, nodes, links } = skillGraph;
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);

  const positions = useMemo(() => computeLayout(nodes, links), [nodes, links]);

  const neighbors = useMemo(() => {
    const m = new Map();
    const add = (a, b) => {
      if (!m.has(a)) m.set(a, new Set());
      m.get(a).add(b);
    };
    links.forEach(([a, b]) => {
      add(a, b);
      add(b, a);
    });
    return m;
  }, [links]);

  const activeId = hovered || pinned;
  const activeNode =
    activeId === "om" ? center : nodes.find((n) => n.id === activeId) || null;

  const isNodeDim = (id) =>
    activeId && id !== activeId && !(neighbors.get(activeId) || new Set()).has(id);
  const isLinkActive = (a, b) => activeId && (a === activeId || b === activeId);

  const handleNodeClick = (id) => setPinned((prev) => (prev === id ? null : id));

  return (
    <div className="skill-graph-layout reveal">
      <svg
        className="skill-graph-svg"
        viewBox="-320 -320 640 640"
        role="img"
        aria-label="Interactive graph of skills, positioned by experience level"
        onMouseLeave={() => setHovered(null)}
      >
        {/* proficiency ring guides */}
        {[1, 2, 3].map((ring) => (
          <circle key={ring} className="ring-guide" cx="0" cy="0" r={RING_RADIUS[ring]} />
        ))}

        {links.map(([a, b]) => {
          const A = positions.get(a);
          const B = positions.get(b);
          return (
            <line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              className={`graph-edge ${isLinkActive(a, b) ? "edge-active" : ""} ${
                activeId && !isLinkActive(a, b) ? "edge-dim" : ""
              }`}
            />
          );
        })}

        {nodes.map((n) => {
          const P = positions.get(n.id);
          const r = DOT_RADIUS[n.ring];
          const active = activeId === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${P.x}, ${P.y})`}
              className={`graph-node ring-${n.ring} ${active ? "node-active" : ""} ${
                isNodeDim(n.id) ? "node-dim" : ""
              } ${pinned === n.id ? "node-pinned" : ""}`}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleNodeClick(n.id)}
            >
              <circle className="node-hit" r={Math.max(r + 14, 18)} />
              <circle className="node-glow" r={r + 5} />
              <circle className="node-dot" r={r} />
              <text className="node-label" y={r + 15} textAnchor="middle">
                {n.label}
              </text>
            </g>
          );
        })}

        {/* center node */}
        <g
          className={`graph-node graph-center ${activeId === "om" ? "node-active" : ""}`}
          onMouseEnter={() => setHovered("om")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleNodeClick("om")}
        >
          <circle className="center-glow" r="42" />
          <circle className="center-dot" r="32" />
          <text className="center-label" textAnchor="middle" dominantBaseline="central">
            {center.label}
          </text>
        </g>
      </svg>

      <aside className="skill-panel">
        {activeNode ? (
          <>
            <div className="skill-panel-header">
              <h4>{activeNode.label === "Om" ? "Om Balar" : activeNode.label}</h4>
              {activeNode.ring && (
                <span className={`ring-badge ring-badge-${activeNode.ring}`}>
                  {RING_LABEL[activeNode.ring]}
                </span>
              )}
            </div>
            <p className="skill-panel-desc">{activeNode.desc}</p>
            {activeNode.usedIn && activeNode.usedIn.length > 0 && (
              <>
                <p className="skill-panel-subhead">Where I've used it</p>
                <div className="skill-panel-chips">
                  {activeNode.usedIn.map((u) => (
                    <button
                      key={u.target + u.label}
                      className="used-chip"
                      onClick={() => scrollToCard(u.target)}
                    >
                      {u.label} ↗
                    </button>
                  ))}
                </div>
              </>
            )}
            {pinned === activeId && (
              <p className="skill-panel-hint">Pinned. Click the node again to unpin.</p>
            )}
          </>
        ) : (
          <>
            <div className="skill-panel-header">
              <h4>Explore the graph</h4>
            </div>
            <p className="skill-panel-desc">
              Every skill here has shipped real software. The closer a node sits to the
              center, the deeper my experience with it.
            </p>
            <p className="skill-panel-desc">
              <strong>Hover</strong> a node to see what it is and where I've used it.{" "}
              <strong>Click</strong> to pin it, then jump straight to the experience or
              project.
            </p>
            <div className="ring-legend">
              {[1, 2, 3].map((ring) => (
                <span key={ring} className="legend-item">
                  <span className={`legend-dot legend-dot-${ring}`} />
                  {RING_LABEL[ring]}
                </span>
              ))}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
