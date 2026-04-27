"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { projects } from "../data/projects";

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

export default function Projects() {
  const r = useReveal();

  return (
    <section id="projects" style={{ padding: "100px 52px", maxWidth: 1100, margin: "0 auto", borderTop: "1px solid var(--paper3)" }}>
      <div ref={r} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 60, gap: 20 }}>
        <h2 style={{
          fontFamily: "var(--font-fraunces, serif)",
          fontSize: "clamp(36px, 4.5vw, 56px)",
          fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--ink)",
        }}>
          Selected <em style={{ fontStyle: "italic", color: "var(--accent)" }}>work</em>
        </h2>
        <span style={{ fontFamily: "var(--font-geist-mono, monospace)", fontSize: 12, color: "var(--warm-mid)", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          04 projects
        </span>
      </div>

      {projects.map((p) => (
        <Link key={p.slug} href={`/projects/${p.slug}`} style={{ textDecoration: "none", display: "block" }}>
          <div ref={r} className="project-row">
            <div className="project-num project-num-display" style={{
              fontFamily: "var(--font-fraunces, serif)",
              fontSize: 52, fontWeight: 300, fontStyle: "italic",
              color: "var(--paper3)", lineHeight: 1, paddingTop: 4,
            }}>
              {p.num}
            </div>

            <div style={{ paddingTop: 4 }}>
              {p.award && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 11, fontFamily: "var(--font-geist-mono, monospace)",
                  color: "var(--gold)", background: "var(--gold-pale)",
                  border: "1px solid var(--gold-border)",
                  padding: "4px 12px", borderRadius: 100, marginBottom: 14,
                }}>
                  ★ {p.award}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <h3 className="project-name" style={{
                    fontFamily: "var(--font-fraunces, serif)",
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontWeight: 300, letterSpacing: "-0.02em",
                    color: "var(--ink)", marginBottom: 4, lineHeight: 1.15,
                  }}>
                    {p.name}
                  </h3>
                  <p style={{
                    fontSize: 14, color: "var(--warm-mid)",
                    fontFamily: "var(--font-geist, sans-serif)",
                    fontStyle: "italic", marginBottom: 16,
                  }}>
                    {p.tagline}
                  </p>
                </div>
                <span style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 12, color: "var(--warm-dim)", whiteSpace: "nowrap", flexShrink: 0,
                }}>
                  Read more →
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.stack.slice(0, 5).map((tag) => (
                  <span key={tag} className="stack-tag">{tag}</span>
                ))}
                {p.stack.length > 5 && (
                  <span className="stack-tag" style={{ color: "var(--warm-dim)" }}>+{p.stack.length - 5} more</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
