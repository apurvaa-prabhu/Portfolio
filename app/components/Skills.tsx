"use client";

import { useEffect, useRef } from "react";

const zones = [
  { label: "// Languages",    title: "I write in",  chips: ["Python", "Java", "C++", "JavaScript", "C#", "SQL", "Bash"] },
  { label: "// Frameworks",   title: "I build with", chips: ["React", "Next.js", "Node.js", "FastAPI", "Spring Boot", ".NET"] },
  { label: "// AI / ML",      title: "I think in",  chips: ["Deep Learning", "Computer Vision", "Transfer Learning", "RAG", "Gemini API", "Prompt Eng."] },
  { label: "// Infra & Cloud",title: "I deploy on", chips: ["GCP", "AWS", "Azure", "Docker", "Kubernetes", "PostgreSQL", "CI/CD"] },
];

function useReveal() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.add("reveal");
    refs.current.push(el);
  };
}

export default function Skills() {
  const r = useReveal();

  return (
    <div id="skills" style={{ background: "var(--ink)", padding: "100px 52px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={r} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 60, gap: 20 }}>
          <h2 style={{
            fontFamily: "var(--font-fraunces, serif)",
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05,
            color: "#f7f4ee",
          }}>
            What I <em style={{ fontStyle: "italic", color: "#52b788" }}>reach for</em>
          </h2>
          <span style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: 12, color: "rgba(247,244,238,0.3)", letterSpacing: "0.1em",
          }}>
            tools &amp; tech
          </span>
        </div>

        <div
          ref={r}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {zones.map((z) => (
            <div
              key={z.label}
              style={{ padding: "32px 28px", background: "#1a1916", transition: "background .2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#222019"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a1916"; }}
            >
              <div style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10, color: "#52b788",
                letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 18,
              }}>
                {z.label}
              </div>
              <div style={{
                fontFamily: "var(--font-fraunces, serif)",
                fontSize: 20, fontWeight: 300, fontStyle: "italic",
                color: "#f7f4ee", marginBottom: 16,
              }}>
                {z.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {z.chips.map((c) => <span key={c} className="sz-chip">{c}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
