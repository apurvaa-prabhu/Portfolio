"use client";

import { useEffect, useRef } from "react";

function useReveal() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
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

export default function Experience() {
  const r = useReveal();

  return (
    <section
      id="experience"
      style={{
        padding: "100px 52px", maxWidth: 1100, margin: "0 auto",
        borderTop: "1px solid var(--paper3)",
        display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start",
      }}
    >
      <div style={{ position: "sticky", top: 80 }}>
        <div ref={r} style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: 11, color: "var(--warm-mid)",
          letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
        }}>
          Experience
        </div>
        <p ref={r} style={{ fontSize: 13, color: "var(--warm-mid)", lineHeight: 1.6, fontFamily: "var(--font-geist, sans-serif)" }}>
          A mix of technical projects, team operations, and the kind of real-world accountability you don&apos;t get in a classroom.
        </p>
      </div>

      <div>
        <div ref={r} style={{
          padding: "32px 0",
          borderTop: "1px solid var(--paper3)",
          borderBottom: "1px solid var(--paper3)",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: 11, color: "var(--warm-mid)",
            letterSpacing: "0.08em", marginBottom: 10,
          }}>
            <span>Jan 2023 — Present</span>
            <span>UMass Boston</span>
          </div>

          <div style={{
            fontFamily: "var(--font-fraunces, serif)",
            fontSize: 20, fontWeight: 300, color: "var(--ink)",
            marginBottom: 4, letterSpacing: "-0.01em",
          }}>
            Building &amp; Events Manager
          </div>

          <div style={{
            fontSize: 13, color: "var(--accent)",
            fontFamily: "var(--font-geist-mono, monospace)",
            letterSpacing: "0.04em", marginBottom: 12,
          }}>
            University of Massachusetts Boston
          </div>

          <p style={{ fontSize: 14, color: "#5A5750", lineHeight: 1.7, fontFamily: "var(--font-geist, sans-serif)" }}>
            Oversee operations of a campus center serving 500+ students daily — event logistics, staff supervision,
            safety compliance, and resolving operational issues weekly. Manages a team of 8+. It&apos;s not a CS role,
            but it&apos;s where I learned to lead under pressure and actually ship things on time.
          </p>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 11, fontFamily: "var(--font-geist-mono, monospace)",
            color: "var(--warm-mid)", background: "var(--paper2)",
            padding: "3px 10px", borderRadius: 100, marginTop: 10,
          }}>
            ⚡ Operations · Leadership · 3+ years
          </div>
        </div>
      </div>
    </section>
  );
}
