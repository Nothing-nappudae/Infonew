import { useEffect, useMemo, useState } from "react";
import { site } from "./content.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import FeaturedGrid from "./components/FeaturedGrid.jsx";
import Section from "./components/Section.jsx";
import Skills from "./components/Skills.jsx";
import ReadingList from "./components/ReadingList.jsx";
import HobbiesStrip from "./components/HobbiesStrip.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Now from "./components/Now.jsx";
import Starfield from "./components/Starfield.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Animation from "./assets/Animation.gif"; // 👈 your GIF

/* ---------------------- Theme persistence ---------------------- */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) return saved;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

/* ---------------------- Scrollspy ---------------------- */
function useScrollSpy(ids) {
  const [active, setActive] = useState("home");
  const options = useMemo(
    () => ({ rootMargin: "-45% 0px -50% 0px", threshold: 0 }),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => entry.isIntersecting && setActive(entry.target.id)
      );
    }, options);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, options]);

  return active;
}

/* ---------------------- Main App ---------------------- */
export default function App() {
  const { theme, setTheme } = useTheme();
  const sectionIds = site.sections.map((s) => s.id);
  const active = useScrollSpy(sectionIds);

  return (
    <div className="relative">
      {/* Background & FX (behind all content) */}
      <Starfield />
      <CursorGlow />

      <Header
        sections={site.sections}
        active={active}
        theme={theme}
        onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      <main id="main" className="mx-auto max-w-6xl px-4">
        {/* ---------------------- Home ---------------------- */}
        <Section id="home">
          <Hero />
        </Section>

        {/* ---------------------- Highlights ---------------------- */}
        <Section id="featured" title="Highlights 🔥">
          <FeaturedGrid items={site.featured} />
        </Section>

        {/* ---------------------- Projects ---------------------- */}
        <Section id="projects" title="Projects">
          {/* 👇 Add your GIF demo here */}
          <figure className="mb-6">
            <img
              src={Animation}
              alt="Project demo animation"
              className="w-full rounded-xl shadow-lg"
            />
            <figcaption className="mt-2 text-sm opacity-80 text-center">
              Demo: how my project works 🚀
            </figcaption>
          </figure>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.projects.map((p) => (
              <FeaturedGrid.Card key={p.title} item={p} compact />
            ))}
          </div>
        </Section>

        {/* ---------------------- Skills ---------------------- */}
        <Section id="skills" title="Skills">
          <Skills />
        </Section>

        {/* ---------------------- Now ---------------------- */}
        <Section id="now" title={site.now.heading}>
          <Now now={site.now} />
        </Section>

        {/* ---------------------- Reading ---------------------- */}
        <Section id="reading" title="Reading">
          <ReadingList items={site.reading} />
        </Section>

        {/* ---------------------- Hobbies ---------------------- */}
        <Section id="hobbies" title="Hobbies">
          <HobbiesStrip items={site.hobbies} />
          <div id="back-to-fun" aria-hidden="true" />
        </Section>

        {/* ---------------------- Contact ---------------------- */}
        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>

      <Footer />
    </div>
  );
}
