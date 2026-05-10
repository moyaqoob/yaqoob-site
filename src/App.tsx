import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ActivitySection } from "@/components/ActivitySection";
import { SocialLink } from "./types/game";

const BIRTH_DATE = new Date("2003-01-15T00:00:00Z");

const socialLinks: SocialLink[] = [
  { name: "github", href: "https://github.com/moyaqoob", type: "link" },
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/moyaqoob/",
    type: "link",
  },
  { name: "x", href: "https://x.com/yaqoobxe", type: "link" },
  { name: "email", value: "moyaqoob28@gmail.com", type: "copy" },
];

export type Project = {
  id: number;
  title: string;
  href?: string;
  description: string;
  github: string;
  tech?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Zebra Search",
    href: "https://zebrasearch.moyaqoob28.workers.dev/",
    description:
      "A focused search engine for algorithms, engineering, and technical writing custom indexing and query flow.",
    github: "https://github.com/moyaqoob",
    tech: [
      "TypeScript",
      "Tokenizer / indexer",
      "Query engine",
      "Node.js",
    ],
  },
  {
    id: 2,
    title: "Sketch.io",
    href: "https://sketch-io.moyaqoob28.workers.dev/",
    description:
      "Collaborative whiteboard with realtime sync—canvas rendering, presence, and low-latency updates.",
    github: "https://github.com/moyaqoob/Sketch.io",
    tech: ["React", "Node.js", "Canvas API", "WebSocket"],
  },
  {
    id: 3,
    title: "Signal",
    href: "https://signal-inky.vercel.app/",
    description:
      "Live market dashboard with streaming updates so decisions are based on current data, not stale snapshots.",
    github: "https://github.com/moyaqoob",
    tech: ["React", "Node.js", "WebSocket", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Accredian landing",
    href: "https://accredian-khaki.vercel.app/",
    description: "Client-facing marketing site performance, layout polish, and clear conversion paths.",
    github: "https://github.com/moyaqoob/accredian",
    tech: ["Next.js"],
  },
];

const aiprojects: Project[] = [
  {
    id: 1,
    title: "Micrograd engine",
    description:
      "a micrograd engine that shows the abstractions behind the training of a neural network",
    github: "https://github.com/moyaqoob/micrograd.git",
    tech: ["Math", "Python"],
  },
];

const skillLinks = [
  "React",
  "TypeScript",
  "Node.js",
  "Math",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Rust",
  "AWS",
  "CI/CD",
];

function useAgeSeconds() {
  const [age, setAge] = useState(0);
  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const elapsed = (now - BIRTH_DATE.getTime()) / 1000;
      const years = elapsed / (365.25 * 24 * 60 * 60);
      setAge(years);
    };
    update();
    const t = setInterval(update, 100);
    return () => clearInterval(t);
  }, []);
  return age;
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="surface-card group">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-[hsl(var(--foreground))]">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
            {project.description}
          </p>
          {project.tech?.length ? (
            <ul
              className="mt-2.5 flex flex-wrap gap-1.5"
              aria-label="Technologies"
            >
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-[hsl(var(--border))]/80 bg-[hsl(var(--background))]/60 px-2 py-0.5 font-mono text-[11px] leading-none text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 text-[12px] sm:justify-end sm:pt-0.5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link font-medium text-[hsl(var(--foreground))]/85 underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link font-medium text-[hsl(var(--foreground))]/85 underline-offset-4 hover:underline"
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const age = useAgeSeconds();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setDarkMode(prefersDark);
    setTimeout(() => setLoaded(true), 50);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const copyEmail = useCallback(() => {
    const entry = socialLinks.find((l) => l.type === "copy");
    if (!entry || entry.type !== "copy") return;
    void navigator.clipboard.writeText(entry.value);
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2200);
  }, []);

  const year = new Date().getFullYear();

  return (
    <div
      className={`page-shell text-[hsl(var(--foreground))] transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
    >
      <div className="fixed top-6 right-10 z-10 flex items-center gap-2">
        <Link
          to="/resume"
          className="rounded-lg p-2 transition-colors hover:bg-[hsl(var(--border))]"
          aria-label="View resume"
        >
          <FileText size={18} />
        </Link>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-lg p-2 transition-colors hover:bg-[hsl(var(--border))]"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <main className="mx-auto max-w-[42rem] px-5 py-8 pb-16 sm:px-6">
        <section className="mb-5 sm:mb-10" aria-labelledby="intro-heading">
          <p
            id="intro-heading"
            className="mb-1.5 inline-block text-[11px] font-medium uppercase tracking-wider text-muted"
          >
            Full Stack Developer
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-[2.125rem] sm:leading-[1.15]">
            Hey — I&apos;m Yaqoob.
          </h1>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted sm:text-base">
            I build reliable full-stack systems—search, realtime collaboration,
            and data-backed interfaces—with AI integrated where it actually
            helps. About one year of professional experience; based in India.
          </p>
          <p
            className="mt-3 font-mono text-[12px] tabular-nums text-muted sm:text-[13px]"
            aria-live="polite"
          >
            <span className="text-muted">been here since </span>
            {age > 0 ? age.toFixed(7) : "—"}
          </p>
        </section>

        <nav
          className="mb-4 flex flex-wrap items-center gap-2"
          aria-label="Social and contact"
        >
          {socialLinks.map((link) => {
            if (link.type === "copy") {
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={copyEmail}
                  className="nav-link-pill link"
                >
                  {link.name}
                </button>
              );
            }
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link-pill link"
              >
                {link.name}
              </a>
            );
          })}
          <span className="sr-only" aria-live="polite">
            {emailCopied ? "Email address copied to clipboard." : ""}
          </span>
        </nav>

        <section className="mb-2" aria-labelledby="work-heading">
          <h2 id="work-heading" className="section-heading">
            Selected work
          </h2>
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="glass-tabs-list mb-5 inline-flex h-9 w-full max-w-inherit items-center justify-start gap-0.5 rounded-xl p-1 transition-all duration-300">
              <TabsTrigger
                value="projects"
                className="glass-tab-trigger flex-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted transition-all duration-300 data-[state=active]:text-foreground"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="ailearning"
                className="glass-tab-trigger flex-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted transition-all duration-300 data-[state=active]:text-foreground"
              >
                AI learning
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="projects"
              className="tab-content-natural mt-0 overflow-hidden outline-none data-[state=inactive]:animate-tabs-out data-[state=active]:animate-tabs-in"
            >
              <div className="space-y-3">
                {projects.map((project) => (
                  <ProjectEntry key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="ailearning"
              className="tab-content-natural mt-0 overflow-hidden outline-none data-[state=inactive]:animate-tabs-out data-[state=active]:animate-tabs-in"
            >
              <div className="space-y-3">
                {aiprojects.map((project) => (
                  <ProjectEntry key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <ActivitySection />

        <section className="mt-10" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="section-heading">
            Skills & tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillLinks.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <footer className="mt-14 border-t border-[hsl(var(--border))] pt-8">
          <div className="flex flex-col gap-1 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p>yaqoob.dev · {year}</p>
            <p className="sm:text-right">Built with React & Vite</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
