export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--paper3)",
      padding: "24px 52px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "var(--font-geist-mono, monospace)",
      fontSize: 11,
      color: "var(--warm-dim)",
      letterSpacing: "0.05em",
    }}>
      <span>© 2026 Apurvaa Prabhu</span>
      <span>Designed &amp; built with care</span>
    </footer>
  );
}
