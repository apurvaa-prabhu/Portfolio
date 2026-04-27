"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { certs } from "../data/certs";

const courses = [
  "Advanced Algorithms",
  "Computer Architecture & Org",
  "Operating Systems",
  "Internetworking",
  "Compilers",
  "Computer Security",
  "Graphics",
  "Artificial Intelligence",
  "Database Management",
  "Intro Software Engineering",
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
  return (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.add("reveal");
    refs.current.push(el);
  };
}

export default function Education() {
  const r = useReveal();

  return (
    <div id="education" style={{ background: "var(--paper2)", padding: "100px 52px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div ref={r} style={{ marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "var(--font-fraunces, serif)",
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--ink)",
          }}>
            Where I <em style={{ fontStyle: "italic", color: "var(--accent)" }}>learned</em>
          </h2>
        </div>

        {/* Degree */}
        <div ref={r} style={{
          background: "white", borderRadius: 16,
          border: "1px solid var(--paper3)", padding: 48, marginBottom: 48,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{
                fontFamily: "var(--font-fraunces, serif)",
                fontSize: 28, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 6,
              }}>
                University of Massachusetts Boston
              </div>
              <div style={{ fontSize: 14, color: "var(--warm-mid)", fontFamily: "var(--font-geist, sans-serif)" }}>
                Bachelor of Computer Science · Expected May 2026
              </div>
            </div>
          </div>
          <div style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
            color: "var(--warm-mid)", marginBottom: 14,
          }}>
            Relevant coursework
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {courses.map((c) => <span key={c} className="edu-chip">{c}</span>)}
          </div>
        </div>

        {/* Certifications */}
        <h3 ref={r} style={{
          fontFamily: "var(--font-fraunces, serif)",
          fontSize: 26, fontWeight: 300, letterSpacing: "-0.02em",
          color: "var(--ink)", marginBottom: 24,
        }}>
          Certifications
        </h3>

        <div ref={r} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {certs.map((c) => (
            <Link
              key={c.code}
              href={c.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card"
            >
              <div style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 11, color: "var(--accent)",
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10,
              }}>
                {c.issuer}
              </div>
              <div style={{
                fontSize: 14, color: "var(--ink)", lineHeight: 1.4,
                marginBottom: 8, fontFamily: "var(--font-geist, sans-serif)",
                fontWeight: 400,
              }}>
                {c.title}
              </div>
              {c.issued && (
                <div style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10, color: "var(--warm-mid)", marginBottom: 6,
                }}>
                  Issued {c.issued}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                <div style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10, color: "var(--warm-dim)", letterSpacing: "0.05em",
                }}>
                  {c.code}
                </div>
                <span style={{ fontSize: 11, color: "var(--accent)", fontFamily: "var(--font-geist-mono, monospace)" }}>
                  View ↗
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
