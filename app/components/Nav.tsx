"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = `/#${id}`;
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "22px 52px",
      background: scrolled ? "rgba(247,244,238,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.07)" : "none",
      transition: "background .35s, box-shadow .35s",
    }}>
      <Link href="/" style={{
        fontFamily: "var(--font-fraunces, serif)",
        fontSize: 18, fontWeight: 400, fontStyle: "italic",
        color: "var(--ink)", textDecoration: "none",
      }}>
        ap.
      </Link>

      <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
        <li><a href="#about"    onClick={scrollTo("about")}    className="nav-link">About</a></li>
        <li><a href="#projects" onClick={scrollTo("projects")} className="nav-link">Projects</a></li>
        <li><a href="#skills"   onClick={scrollTo("skills")}   className="nav-link">Skills</a></li>
        <li><Link href="/contact" className="nav-cta">Say hello</Link></li>
      </ul>
    </nav>
  );
}
