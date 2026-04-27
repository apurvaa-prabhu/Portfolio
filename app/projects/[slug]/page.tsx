import { projects } from "../../data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Cursor from "../../components/Cursor";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Next.js 15: params is a Promise
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main style={{ backgroundColor: "var(--paper)", minHeight: "100vh" }}>
      <Cursor />
      <Nav />

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "140px 52px 100px" }}>

        {/* Back */}
        <Link href="/#projects" className="back-link">
          ← back to projects
        </Link>

        {/* Award pill */}
        {project.award && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 11, fontFamily: "var(--font-geist-mono, monospace)",
            color: "var(--gold)", background: "var(--gold-pale)",
            border: "1px solid var(--gold-border)",
            padding: "5px 14px", borderRadius: 100,
            marginBottom: 20, marginTop: 36, letterSpacing: "0.03em",
          }}>
            ★ {project.award}
          </div>
        )}

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-fraunces, serif)",
          fontSize: "clamp(40px, 6vw, 68px)",
          fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.0,
          color: "var(--ink)", marginBottom: 10,
          marginTop: project.award ? 0 : 36,
        }}>
          {project.name}
        </h1>
        <p style={{
          fontFamily: "var(--font-fraunces, serif)",
          fontSize: "clamp(16px, 2vw, 21px)",
          fontStyle: "italic", color: "var(--warm-mid)",
          marginBottom: 36, lineHeight: 1.4,
        }}>
          {project.tagline}
        </p>

        {/* Stack */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          paddingBottom: 40, borderBottom: "1px solid var(--paper3)", marginBottom: 48,
        }}>
          {project.stack.map((tag) => (
            <span key={tag} className="stack-tag">{tag}</span>
          ))}
        </div>

        {/* Detail paragraphs */}
        <div style={{
          fontSize: 17, color: "#4A4840", lineHeight: 1.85,
          fontFamily: "var(--font-geist, sans-serif)",
        }}>
          {project.detail.map((para, i) => (
            <p key={i} style={{ marginBottom: 24 }}>{para}</p>
          ))}
        </div>

        {/* Highlights */}
        <div style={{
          marginTop: 48, padding: 36,
          background: "var(--paper2)",
          borderRadius: 16, border: "1px solid var(--paper3)",
        }}>
          <div style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: 11, color: "var(--warm-mid)",
            letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20,
          }}>
            Key highlights
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {project.highlights.map((h) => (
              <li key={h} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                fontSize: 15, color: "var(--ink)",
                fontFamily: "var(--font-geist, sans-serif)", lineHeight: 1.5,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--accent2)", flexShrink: 0, marginTop: 7, display: "block",
                }} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/#projects" className="btn-outline">
            ← All projects
          </Link>
        </div>

      </article>
      <Footer />
    </main>
  );
}
