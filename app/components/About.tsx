"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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

export default function About() {
  const r = useReveal();

  return (
    <section
      id="about"
      style={{
        padding: "100px 52px",
        maxWidth: 1100, margin: "0 auto",
        borderTop: "1px solid var(--paper3)",
      }}
    >
      {/* Top row: label + heading */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 52 }}>
        <div ref={r} style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: 11, color: "var(--warm-mid)",
          letterSpacing: "0.2em", textTransform: "uppercase",
          paddingTop: 6, position: "sticky", top: 80,
        }}>
          About me
        </div>
        <h2 ref={r} style={{
          fontFamily: "var(--font-fraunces, serif)",
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1,
          color: "var(--ink)",
        }}>
          I build things that{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>matter.</em>
        </h2>
      </div>

      {/* Bottom row: photo + text */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>

        {/* Photo */}
        <div ref={r} style={{
          borderRadius: 16, overflow: "hidden",
          border: "1px solid var(--paper3)",
          aspectRatio: "3/4",
          background: "var(--paper2)",
          position: "sticky", top: 80,
        }}>
          <img
            src="/apurvaa.jpg"
            alt="Apurvaa Prabhu"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
              const parent = el.parentElement;
              if (parent) {
                parent.style.display = "flex";
                parent.style.alignItems = "center";
                parent.style.justifyContent = "center";
                parent.innerHTML = `<span style="font-family:var(--font-geist-mono,monospace);font-size:11px;color:var(--warm-mid);letter-spacing:0.1em;text-transform:uppercase;padding:20px;text-align:center">Add apurvaa.jpg<br/>to /public</span>`;
              }
            }}
          />
        </div>

        {/* Text */}
        <div ref={r} style={{
          fontSize: 16, color: "#4A4840", lineHeight: 1.85,
          fontFamily: "var(--font-geist, sans-serif)",
        }}>
          <p>
            I grew up in India and came to Boston for my undergrad — a move that taught me how to
            navigate the unfamiliar and find opportunity in it. That same instinct shows up in how I
            approach engineering: I&apos;m drawn to problems that aren&apos;t obvious, and I like
            building solutions that are both technically solid and genuinely useful to people.
          </p>
          <p>
            My work tends to land at the intersection of{" "}
            <strong style={{ fontWeight: 500, color: "var(--ink)" }}>AI systems, full-stack development, and civic good</strong>.
            I built a mobile app that helps pedestrians stay safe using computer vision. I mapped food
            inequity in Boston neighborhoods using open data. I&apos;ve fine-tuned deep learning models
            and shipped production websites in Agile teams. Each project has taught me something
            different about what it means to build with care.
          </p>
          <p>
            Outside of code, I&apos;m pretty easygoing — I find good food, good music, and good people
            equally essential. I care about personal growth and showing up consistently, both as an
            engineer and as a person. And yes, a meaningful portion of my time is now managed by{" "}
            <strong style={{ fontWeight: 500, color: "var(--ink)" }}>Ash</strong>, my recently adopted
            kitten, who is chaotic and absolutely worth it.
          </p>
        </div>
      </div>
    </section>
  );
}
