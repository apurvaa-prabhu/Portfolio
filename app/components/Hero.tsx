"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

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
  return (delay = 0) => (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.add("reveal");
    if (delay) el.style.transitionDelay = `${delay}ms`;
    refs.current.push(el);
  };
}

function HoverCard({ children, rotate = "-0.5deg", style = {} }: {
  children: React.ReactNode; rotate?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className="hoverable"
      style={{
        background: "white", border: "1px solid var(--paper3)",
        borderRadius: 16, padding: "24px 28px",
        transition: "transform .3s, box-shadow .3s", ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = `translateY(-4px) rotate(${rotate})`;
        el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.09)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = ""; el.style.boxShadow = "";
      }}
    >
      {children}
    </div>
  );
}

const scrollToProjects = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("projects");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    // Clear the hash so reload doesn't jump to #projects
    window.history.replaceState(null, "", window.location.pathname);
  }
};

export default function Hero() {
  const r = useReveal();

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      alignItems: "center", padding: "100px 52px 80px", gap: 60,
      backgroundColor: "var(--paper)",
    }}>
      {/* LEFT */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div ref={r()} style={{
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: 12, color: "var(--warm-mid)",
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28,
        }}>
          <span style={{ width: 32, height: 1, background: "var(--warm-dim)", display: "block" }} />
          CS Student · United States
        </div>

        <h1 ref={r(80)} style={{
          fontFamily: "var(--font-fraunces, serif)",
          fontSize: "clamp(52px, 6.5vw, 88px)",
          fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.03em",
          marginBottom: 8, color: "var(--ink)",
        }}>
          Hi, I&apos;m<br />
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Apurvaa.</em>
        </h1>

        <p ref={r(160)} style={{
          fontFamily: "var(--font-fraunces, serif)",
          fontSize: "clamp(18px, 2.2vw, 26px)",
          fontWeight: 300, color: "var(--warm-mid)",
          letterSpacing: "-0.01em", marginBottom: 36, fontStyle: "italic",
        }}>
          Software Engineer &amp; Builder
        </p>

        <p ref={r(160)} style={{
          fontSize: 15, color: "#5A5750", lineHeight: 1.75,
          maxWidth: 440, marginBottom: 44,
          fontFamily: "var(--font-geist, sans-serif)",
        }}>
          I&apos;m a final-year CS student at UMass Boston, originally from{" "}
          <strong style={{ fontWeight: 500, color: "var(--ink)" }}>India</strong>, building things
          at the intersection of{" "}
          <strong style={{ fontWeight: 500, color: "var(--ink)" }}>AI, full-stack, and civic tech</strong>.
          I care deeply about making software that actually matters to people.
        </p>

        <div ref={r(200)} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 44 }}>
          <span style={{
            fontSize: 12, fontFamily: "var(--font-geist-mono, monospace)",
            padding: "5px 12px", borderRadius: 100,
            border: "1px solid var(--rust-border)",
            color: "var(--rust)", background: "var(--rust-pale)",
          }}>
            May 2026 Grad
          </span>
        </div>

        <div ref={r(240)} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* Explicit scroll handler fixes the #projects anchor reliability issue */}
          <a href="#projects" onClick={scrollToProjects} className="btn-fill">
            See my work
          </a>
          <Link href="/contact" className="btn-outline">
            Get in touch
          </Link>
        </div>
      </div>

      {/* RIGHT — photo + stack preview */}
      <div ref={r(80)} className="hero-right" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Top: two stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <HoverCard rotate="-0.4deg" style={{ background: "var(--accent-pale)", border: "1px solid #B7DFC9" }}>
            <div style={{ fontFamily: "var(--font-geist-mono, monospace)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Status</div>
            <div style={{ fontFamily: "var(--font-fraunces, serif)", fontSize: 20, fontWeight: 300, color: "var(--accent)", lineHeight: 1.2 }}>Open to<br/><em>new roles</em></div>
            <div style={{ fontSize: 11, color: "var(--accent)", opacity: 0.7, marginTop: 6, fontFamily: "var(--font-geist-mono, monospace)" }}>May 2026 · US</div>
          </HoverCard>

          <HoverCard rotate="0.4deg">
            <div style={{ fontFamily: "var(--font-geist-mono, monospace)", fontSize: 10, color: "var(--warm-mid)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Currently</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
              {[
                { dot: "#52b788", text: "Building AI tools" },
                { dot: "#E9C46A", text: "Learning RAG / LLMs" },
                { dot: "#BFA2DB", text: "SWE & ML roles" },
              ].map(({ dot, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontFamily: "var(--font-geist, sans-serif)", color: "#5A5750" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: dot, flexShrink: 0, display: "block" }} />
                  {text}
                </div>
              ))}
            </div>
          </HoverCard>
        </div>

        {/* Recent wins */}
        <div style={{
          background: "var(--ink)", borderRadius: 16, padding: "22px 24px",
        }}>
          <div style={{ fontFamily: "var(--font-geist-mono, monospace)", fontSize: 10, color: "rgba(247,244,238,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            Recent wins
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { event: "CivicHacks 2026", prize: "Original Research Award", dot: "#E9C46A" },
              { event: "WHACK 2025", prize: "Best Use of Google AI + ElevenLabs", dot: "#52b788" },
            ].map(({ event, prize, dot }) => (
              <div key={event} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0, marginTop: 5, display: "block" }} />
                <div>
                  <div style={{ fontSize: 11, fontFamily: "var(--font-geist-mono, monospace)", color: "rgba(247,244,238,0.4)", letterSpacing: "0.06em", marginBottom: 2 }}>{event}</div>
                  <div style={{ fontSize: 13, color: "rgba(247,244,238,0.8)", fontFamily: "var(--font-geist, sans-serif)", lineHeight: 1.35 }}>{prize}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
