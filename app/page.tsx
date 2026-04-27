import Nav        from "./components/Nav";
import Hero       from "./components/Hero";
import About      from "./components/About";
import Projects   from "./components/Projects";
import Skills     from "./components/Skills";
import Experience from "./components/Experience";
import Education  from "./components/Education";
import Contact    from "./components/Contact";
import Footer     from "./components/Footer";
import Cursor     from "./components/Cursor";

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--paper)", minHeight: "100vh" }}>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
