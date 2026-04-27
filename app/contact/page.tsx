"use client";

import { useState } from "react";
import Link from "next/link";
import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens mail client with pre-filled values — no backend needed
    const body = encodeURIComponent(`Hi Apurvaa,\n\n${message}\n\n— ${name}`);
    const mail = `mailto:apurvaaprabhu1015@gmail.com?subject=${encodeURIComponent(subject || "Portfolio inquiry")}&body=${body}`;
    window.location.href = mail;
    setSent(true);
  };

  return (
    <main style={{ backgroundColor: "var(--paper)", minHeight: "100vh" }}>
      <Cursor />
      <Nav />

      <div style={{
        maxWidth: 640, margin: "0 auto",
        padding: "140px 52px 100px",
      }}>
        <Link href="/" className="back-link" style={{ marginBottom: 48, display: "inline-flex" }}>
          ← back home
        </Link>

        <h1 style={{
          fontFamily: "var(--font-fraunces, serif)",
          fontSize: "clamp(40px, 6vw, 64px)",
          fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.0,
          color: "var(--ink)", marginBottom: 12, marginTop: 32,
        }}>
          Say <em style={{ fontStyle: "italic", color: "var(--accent)" }}>hello.</em>
        </h1>
        <p style={{
          fontSize: 16, color: "#5A5750", lineHeight: 1.75,
          marginBottom: 52, fontFamily: "var(--font-geist, sans-serif)",
        }}>
          I&apos;m looking for new grad and internship roles in software engineering, AI/ML, and full-stack.
          Open to roles anywhere in the United States. I&apos;d love to hear from you.
        </p>

        {sent ? (
          <div style={{
            background: "var(--accent-pale)",
            border: "1px solid #B7DFC9",
            borderRadius: 16, padding: 36,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✉️</div>
            <p style={{
              fontFamily: "var(--font-fraunces, serif)",
              fontSize: 22, fontWeight: 300, color: "var(--accent)",
              marginBottom: 8,
            }}>
              Your mail client should have opened.
            </p>
            <p style={{ fontSize: 14, color: "#3A6B50", fontFamily: "var(--font-geist, sans-serif)" }}>
              If it didn&apos;t, email me directly at{" "}
              <a href="mailto:apurvaaprabhu1015@gmail.com" style={{ color: "var(--accent)" }}>
                apurvaaprabhu1015@gmail.com
              </a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{
                  display: "block", fontSize: 12,
                  fontFamily: "var(--font-geist-mono, monospace)",
                  color: "var(--warm-mid)", letterSpacing: "0.1em",
                  textTransform: "uppercase", marginBottom: 8,
                }}>
                  Your name
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label style={{
                  display: "block", fontSize: 12,
                  fontFamily: "var(--font-geist-mono, monospace)",
                  color: "var(--warm-mid)", letterSpacing: "0.1em",
                  textTransform: "uppercase", marginBottom: 8,
                }}>
                  Your email
                </label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{
                display: "block", fontSize: 12,
                fontFamily: "var(--font-geist-mono, monospace)",
                color: "var(--warm-mid)", letterSpacing: "0.1em",
                textTransform: "uppercase", marginBottom: 8,
              }}>
                Subject
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Internship opportunity, collaboration, etc."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label style={{
                display: "block", fontSize: 12,
                fontFamily: "var(--font-geist-mono, monospace)",
                color: "var(--warm-mid)", letterSpacing: "0.1em",
                textTransform: "uppercase", marginBottom: 8,
              }}>
                Message
              </label>
              <textarea
                className="form-input"
                placeholder="Tell me about the role, your team, or just say hi..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ resize: "vertical" }}
              />
            </div>

            <button type="submit" className="form-submit" style={{ marginTop: 8 }}>
              Send message →
            </button>

            <p style={{
              fontSize: 12, color: "var(--warm-mid)",
              fontFamily: "var(--font-geist-mono, monospace)",
              textAlign: "center", letterSpacing: "0.04em",
            }}>
              Or email directly:{" "}
              <a href="mailto:apurvaaprabhu1015@gmail.com" style={{ color: "var(--accent)", textDecoration: "none" }}>
                apurvaaprabhu1015@gmail.com
              </a>
            </p>
          </form>
        )}

        {/* Quick facts strip */}
        <div style={{
          marginTop: 64,
          paddingTop: 40,
          borderTop: "1px solid var(--paper3)",
          display: "flex", flexWrap: "wrap", gap: 32,
        }}>
          {[
            { label: "Location", val: "Boston, MA" },
            { label: "Open to", val: "United States" },
            { label: "Graduation", val: "May 2026" },

          ].map(({ label, val }) => (
            <div key={label}>
              <div style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10, color: "var(--warm-mid)",
                letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4,
              }}>
                {label}
              </div>
              <div style={{ fontSize: 14, color: "var(--ink)", fontFamily: "var(--font-geist, sans-serif)" }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
