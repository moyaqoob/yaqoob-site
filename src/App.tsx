import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ActivitySection } from "@/components/ActivitySection";

const BIRTH_DATE = new Date("2003-01-15T00:00:00Z");

type Project = {
  id: number;
  title: string;
  href?: string;
  summary: string;
  body: string;
  github: string;
  tech: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Zebra Search",
    href: "https://zebrasearch.moyaqoob28.workers.dev/",
    summary: "A technical search engine built from the ground up \u2014 custom tokenizer, inverted index, and a query engine that understands engineering language.",
    body: "Building a search engine meant confronting every abstraction I usually take for granted. Zebra Search is the result: a custom tokenizer that breaks down technical queries, an inverted index that maps terms to documents efficiently, and a query runtime that ranks results by relevance. The stack is pure TypeScript running on Node.js, with the indexing pipeline designed to handle the vocabulary of algorithms, engineering papers, and technical writing. Every component \u2014 from the parser to the ranking function \u2014 was written without depending on off-the-shelf search libraries.",
    github: "https://github.com/moyaqoob",
    tech: ["TypeScript", "Tokenizer \u2011 indexer", "Query engine", "Node.js"],
  },
  {
    id: 2,
    title: "Sketch.io",
    href: "https://sketch-io.moyaqoob28.workers.dev/",
    summary: "A collaborative whiteboard that syncs strokes in real time \u2014 canvas rendering, presence awareness, and low-latency updates.",
    body: "Sketch.io is what happens when you combine a Canvas API with WebSockets and see what emerges. Multiple users can draw on the same board simultaneously, with each stroke broadcast and rendered in near real-time. The challenge was reconciling local drawing state with remote updates without causing visual tearing or conflicts. I built a CRDT-inspired reconciliation layer on top of Node.js and WebSockets, with React handling the UI shell and the Canvas API managing the pixel-perfect rendering. Presence indicators show who else is in the room and what they are working on.",
    github: "https://github.com/moyaqoob/Sketch.io",
    tech: ["React", "Node.js", "Canvas API", "WebSocket"],
  },
  {
    id: 3,
    title: "Signal",
    href: "https://signal-inky.vercel.app/",
    summary: "A live market dashboard that streams real-time data \u2014 because stale information is worse than no information.",
    body: "Financial data loses value by the second. Signal is a dashboard that subscribes to live market feeds and pushes updates to the UI as they arrive. The backend uses WebSockets to maintain persistent connections to data sources, with PostgreSQL storing historical snapshots for analysis. On the frontend, React handles the rapid state changes gracefully \u2014 charts re-render without jank, and the UI stays responsive even under high-frequency updates. The architecture is built for extensibility: adding a new data source means writing one adapter.",
    github: "https://github.com/moyaqoob",
    tech: ["React", "Node.js", "WebSocket", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Accredian landing",
    href: "https://accredian-khaki.vercel.app/",
    summary: "A marketing landing page built for conversion \u2014 performance-optimised, layout-polished, and designed to guide visitors toward a clear action.",
    body: "This was a focused exercise in front-end craft: build a page that loads fast, looks sharp, and converts. Built with Next.js for server-side rendering and optimal Core Web Vitals, the page uses a component-based layout system that made iteration quick. Every section was tuned for visual hierarchy \u2014 the hero, the feature grid, the social proof, the call-to-action. The result is a clean, professional landing page that serves its business purpose without unnecessary complexity.",
    github: "https://github.com/moyaqoob/accredian",
    tech: ["Next.js"],
  },
  {
    id: 5,
    title: "Micrograd Engine",
    summary: "A minimal autograd engine from scratch that reveals the mathematical machinery behind neural network training.",
    body: "Micrograd is a from-scratch implementation of automatic differentiation \u2014 the core mechanism that makes gradient descent possible. By building a computational graph where every operation tracks its own gradient, the engine can backpropagate errors through arbitrarily complex networks. Writing it meant reasoning about the chain rule at the level of individual nodes: addition, multiplication, activation functions, and how they compose. It is a teaching tool that makes the black box of deep learning transparent.",
    github: "https://github.com/moyaqoob/micrograd.git",
    tech: ["Math", "Python"],
  },
];

const skillLinks = [
  "React", "TypeScript", "Node.js", "Math", "Python",
  "PostgreSQL", "MongoDB", "Docker", "Rust", "AWS", "CI/CD",
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-xl border border-neutral-300 bg-white p-5 transition-all hover:border-neutral-500">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight">
          {project.title}
        </h3>
        <div className="flex shrink-0 items-center gap-2 pt-0.5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
          >
            GitHub
          </a>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              Live
              <ArrowUpRight size={12} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>

      <p className="mb-2 text-sm leading-relaxed text-neutral-700">
        {project.summary}
      </p>

      <div className="mb-3 space-y-1 text-sm leading-relaxed text-neutral-500">
        {(() => {
          const s = project.body;
          const parts = s.split(". ");
          return parts.slice(0, 3).map((sentence, i) => (
            <p key={i} className="leading-relaxed">{sentence.trim()}{i < parts.length - 1 && i < 2 ? "." : ""}</p>
          ));
        })()}
      </div>

      {project.tech.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tech.map((t) => (
            <span key={t} className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-neutral-600">
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const age = useAgeSeconds();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const year = new Date().getFullYear();

  return (
    <main className={`relative min-h-screen bg-[#f8f8f6] font-heading text-neutral-900 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
      <div className="fixed inset-0 -z-10 bg-grid-white opacity-60" />

      <div className="mx-auto max-w-6xl px-6 py-8 md:py-16">

        {/* Top nav */}
        <nav className="mb-16 flex items-center justify-between">
          <span className="font-heading text-sm font-semibold tracking-tight text-neutral-500">
            yaqoob.dev
          </span>
          <Link
            to="/resume"
            className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <span className="text-neutral-400">[</span>
            Resume
            <span className="text-neutral-400">]</span>
          </Link>
        </nav>

        {/* Hero */}
        <section className="mb-20 md:mb-28" aria-labelledby="hero-heading">
          <div className="mb-8 flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-neutral-300 bg-white md:h-24 md:w-24">
              <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-3xl font-semibold text-neutral-400 md:text-4xl">
                Y
              </div>
            </div>
            <div>
              <p className="mb-1 font-mono text-xs font-medium uppercase tracking-widest text-neutral-500">
                Full-Stack Developer
              </p>
              <h1
                id="hero-heading"
                className="font-heading text-5xl font-bold tracking-tight md:text-7xl"
              >
                Yaqoob
              </h1>
            </div>
          </div>

          <p className="max-w-prose text-base leading-relaxed text-neutral-700 md:text-lg">
            Building reliable software that works in the long run. I love solving hard problems in tech &mdash;
            my long-term focus is working on a memory layer for AI. Based in India.
          </p>

          <p className="mt-3 font-mono text-xs tabular-nums text-neutral-400" aria-live="polite">
            <span>been here since </span>
            {age > 0 ? age.toFixed(7) : "\u2014"}
          </p>

          {/* Social links */}
          <nav className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Social links">
            {[
              { label: "GitHub", href: "https://github.com/moyaqoob" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/moyaqoob/" },
              { label: "X", href: "https://x.com/yaqoobxe" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText("moyaqoob28@gmail.com");
                setEmailCopied(true);
                window.setTimeout(() => setEmailCopied(false), 2200);
              }}
              className="font-medium text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
            >
              {emailCopied ? "Copied!" : "Email"}
            </button>
          </nav>
        </section>

        {/* Projects */}
        <section className="mb-20" aria-labelledby="work-heading">
          <h2 id="work-heading" className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-neutral-500">
            Selected work
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Activity */}
        <section className="mb-20" aria-labelledby="activity-heading">
          <h2 id="activity-heading" className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-neutral-500">
            Activity
          </h2>
          <ActivitySection />
        </section>

        {/* Skills & tools */}
        <section className="mb-20" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-neutral-500">
            Skills &amp; tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillLinks.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-500"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-300 pt-8">
          <div className="flex flex-col gap-1 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>yaqoob.dev &middot; {year}</p>
            <p>Built with React &amp; Vite</p>
          </div>
        </footer>

      </div>
    </main>
  );
}

export default App;
