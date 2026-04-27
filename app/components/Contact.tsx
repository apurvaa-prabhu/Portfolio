"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const infoRows = [
  { key: "Status",          val: "open" },
  { key: "Location",        val: "Boston, MA" },
  { key: "Open to",         val: "United States" },
  { key: "Graduation",      val: "May 2026" },
  { key: "Roles",           val: "SWE · ML Engineer · Full-Stack" },
  { key: "Also managed by", val: "🐱 Ash (kitten, very demanding)" },
];

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
  return (delay = 0) => (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.add("reveal");
    if (delay) el.style.transitionDelay = `${delay}ms`;
    refs.current.push(el);
  };
}

export default function Contact() {
  const r = useReveal();

  return (
    <section
      id="contact"
      style={{ padding: "120px 52px 100px", maxWidth: 1100, margin: "0 auto", borderTop: "1px solid var(--paper3)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

        <div ref={r()}>
          <h2 style={{
            fontFamily: "var(--font-fraunces, serif)",
            fontSize: "clamp(38px, 5vw, 64px)",
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: "-0.03em", marginBottom: 24, color: "var(--ink)",
          }}>
            Let&apos;s build<br />
            something <em style={{ fontStyle: "italic", color: "var(--accent)" }}>good.</em>
          </h2>

          <p style={{
            fontSize: 15, color: "#5A5750", lineHeight: 1.75,
            maxWidth: 380, marginBottom: 40,
            fontFamily: "var(--font-geist, sans-serif)",
          }}>
            I&apos;m actively looking for new grad and internship roles in software engineering,
            AI/ML, and full-stack. Open to roles anywhere in the United States — let&apos;s talk.
          </p>

          <Link href="mailto:apurvaaprabhu1015@gmail.com" style={{
            display: "block",
            fontFamily: "var(--font-fraunces, serif)",
            fontSize: "clamp(14px, 1.8vw, 20px)",
            fontStyle: "italic",
            color: "var(--accent)",
            textDecoration: "none",
            borderBottom: "1px solid var(--accent-pale)",
            paddingBottom: 8,
            marginBottom: 32,
            wordBreak: "break-all",
            transition: "border-color .2s",
          }}>
            apurvaaprabhu1015@gmail.com
          </Link>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { href: "https://linkedin.com/in/apurvaa-prabhu-1b6155254/", label: "LinkedIn" },
              { href: "https://github.com/apurvaa-prabhu", label: "GitHub" },

            ].map(({ href, label }) => (
              <Link key={label} href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  fontSize: 12, fontFamily: "var(--font-geist-mono, monospace)",
                  color: "var(--warm-mid)", border: "1px solid var(--paper3)",
                  padding: "9px 16px", borderRadius: 100,
                  textDecoration: "none",
                  transition: "color .2s, border-color .2s, background .2s",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div ref={r(160)} style={{
          background: "var(--paper2)", borderRadius: 20,
          border: "1px solid var(--paper3)", padding: 40,
        }}>
          <div style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: 11, color: "var(--warm-mid)",
            letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24,
          }}>
            Quick facts
          </div>

          {infoRows.map((row, i) => (
            <div key={row.key} style={{
              display: "flex", justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: i < infoRows.length - 1 ? "1px solid var(--paper3)" : "none",
              fontSize: 14,
            }}>
              <span style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 12, color: "var(--warm-mid)",
              }}>
                {row.key}
              </span>
              <span style={{ color: "var(--ink)", textAlign: "right", fontFamily: "var(--font-geist, sans-serif)" }}>
                {row.val === "open"
                  ? <span className="avail-dot">Open to opportunities</span>
                  : row.val}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
