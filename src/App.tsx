import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, FileText } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ActivitySection } from '@/components/ActivitySection';

// Birth date for age timer (adjust to your actual birth date)
const BIRTH_DATE = new Date('2003-01-15T00:00:00Z');

// Social links data
const socialLinks = [
  { name: 'github', href: 'https://github.com/moyaqoob' },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/moyaqoob/' },
  { name: 'email', href: 'mailto:moyaqoob28@gmail.com' },
  { name: 'x', href: 'https://x.com/yaqoobstwt' },
];

// Experience data
const experiences = [
];

// Projects data: href = live URL, github = profile/repo (fix repo path as needed)
export type Project = {
  id: number;
  title: string;
  href: string;
  imgUrl: string;
  description: string;
  github: string;
  tech?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Zebra Search',
    href: 'https://zebrasearch.moyaqoob28.workers.dev/',
    imgUrl: '/images/zentry.png',
    description: 'GSAP powered animated website',
    github: 'https://github.com/moyaqoob',
    tech: ['GSAP', 'React', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'DevFork',
    href: 'https://dev-fork-web.vercel.app/',
    imgUrl: '/images/devfork.png',
    description: 'View Github Repos',
    github: 'https://github.com/moyaqoob',
    tech: ['Next.js', 'TypeScript', 'GitHub API'],
  },
  {
    id: 4,
    title: 'Sketch.io',
    href: 'https://sketch-io.moyaqoob28.workers.dev/',
    imgUrl: '/images/scribly.png',
    description: 'A whiteboard app that allows you to draw and collaborate in realtime',
    github: 'https://github.com/moyaqoob/Sketch.io',
    tech: ['React', 'Nodejs', 'Canvas API','websocket'],
  },
  {
    id: 6,
    title: 'Signal',
    href: 'https://signal-inky.vercel.app/',
    imgUrl: '/images/signal.png',
    description: 'A real time stock market app',
    github: 'https://github.com/moyaqoob',
    tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'FlowBoard',
    href: 'https://flow-board-pied.vercel.app/',
    imgUrl: '/images/flowboard.png',
    description: 'A sleek, motion-rich landing page crafted with Tailwind, Next.js, and Framer Motion.',
    github: 'https://github.com/moyaqoob',
    tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    id: 5,
    title: 'AI Note Taker App',
    href: 'https://noteflow-app-ashen.vercel.app/',
    imgUrl: '/images/ai-notes-page.png',
    description: 'An intuitive app for note-taking and AI-powered discussions, developed with Next.js.',
    github: 'https://github.com/moyaqoob',
    tech: ['Next.js', 'OpenAI', 'Prisma'],
  },
];

// Books data
const books = [
  { title: 'Scopes and Closures', author: 'Robert C. Martin', note: 'Internal working on javascript' },
  { title: 'Architecture Patterns with Python', author: 'Martin Kleppmann', note: 'Helps you understand python in backend at production level' },
  { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', note: 'Journey to mastery in software development.' },
];

// Tech / skills links (amritwt.me style)
const skillLinks = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'AWS',
  'CI/CD',
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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const age = useAgeSeconds();

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    setTimeout(() => setLoaded(true), 50);
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-2xl mx-auto px-5 py-8">
        <div className="fixed top-6 right-10 flex items-center gap-2 z-10">
          <Link
            to="/resume"
            className="p-2 rounded-lg hover:bg-[hsl(var(--border))] transition-colors"
            aria-label="View resume"
          >
            <FileText size={18} />
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-[hsl(var(--border))] transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Header */}
        <header className="mb-5">
          <h1 className="text-xl font-medium mb-0.5">
            Hey, I&apos;m Yaqoob
          </h1>
          <span className="inline-block text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5">
            Full Stack Engineer
          </span>
          <p className="text-muted text-[13px] leading-snug mb-1.5 max-w-lg">
            Building reliable systems and shipping open source. I work across the stack with a focus on clean architecture and developer experience. Based in India.
          </p>
          <p className="font-mono text-[13px] text-muted tabular-nums" aria-live="polite">
            been here since {age > 0 ? age.toFixed(7) : '—'}
          </p>
        </header>

        {/* Social Links + Resume */}
        <nav className="mb-5 flex flex-wrap items-center gap-1.5">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name === 'email' ? undefined : '_blank'}
              rel={link.name === 'email' ? undefined : 'noopener noreferrer'}
              className="nav-link-pill link"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Tabs: Projects (default), Experience, Books */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="glass-tabs-list mb-3 inline-flex h-9 w-full max-w-inherit items-center justify-start gap-0.5 rounded-xl p-1 transition-all duration-300">
            <TabsTrigger
              value="projects"
              className="glass-tab-trigger flex-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted transition-all duration-300 data-[state=active]:text-foreground"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="glass-tab-trigger flex-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted transition-all duration-300 data-[state=active]:text-foreground"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="books"
              className="glass-tab-trigger flex-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted transition-all duration-300 data-[state=active]:text-foreground"
            >
              Books
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="projects"
            className="tab-content-natural mt-0 overflow-hidden pt-4 outline-none data-[state=inactive]:animate-tabs-out data-[state=active]:animate-tabs-in"
          >
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-b border-[hsl(var(--border))]/50 pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
                    <span className="font-medium text-[13px]">{project.title}</span>
                    <div className="flex gap-2 text-[12px]">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-muted"
                      >
                        GitHub
                      </a>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-muted"
                      >
                        View
                      </a>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted mb-1 leading-snug">{project.description}</p>
                  {project.tech?.length ? (
                    <div className="text-[12px] text-muted">{project.tech.join(' / ')}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent
            value="experience"
            className="tab-content-natural mt-0 overflow-hidden pt-4 outline-none data-[state=inactive]:animate-tabs-out data-[state=active]:animate-tabs-in"
          >
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="border-b border-[hsl(var(--border))]/50 pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
                    <span className="font-medium text-[13px]">{exp.title}</span>
                    <span className="text-muted text-[12px]">at {exp.company}</span>
                  </div>
                  <div className="text-muted text-[12px] mb-1">{exp.period}</div>
                  <p className="text-[13px] text-muted mb-1 leading-snug">{exp.description}</p>
                  <div className="text-[12px] text-muted">{exp.tech.join(' / ')}</div>
                </div>
              ))}
            </div>
          </TabsContent> */}

          <TabsContent
            value="books"
            className="tab-content-natural mt-0 overflow-hidden pt-4 outline-none data-[state=inactive]:animate-tabs-out data-[state=active]:animate-tabs-in"
          >
            <div className="space-y-4">
              {books.map((book, index) => (
                <div key={index} className="border-b border-[hsl(var(--border))]/50 pb-4 last:border-0 last:pb-0">
                  <div className="font-medium text-[13px] mb-0.5">{book.title}</div>
                  <div className="text-muted text-[12px] mb-0.5">{book.author}</div>
                  <p className="text-[13px] text-muted leading-snug">{book.note}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <ActivitySection />

        <section className="mt-6">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted mb-2">skills</h2>
          <div className="flex flex-wrap items-center gap-x-0 gap-y-1 text-[13px] text-muted">
            {skillLinks.map((skill, i) => (
              <span key={skill} className="inline-flex items-center">
                <span className="link hover:opacity-70 transition-opacity">{skill.toLowerCase()}</span>
                {i < skillLinks.length - 1 && (
                  <span className="mx-2.5 text-muted/50 select-none" aria-hidden>·</span>
                )}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-[hsl(var(--border))]">
          <p className="text-[13px] text-muted">
            yaqoob.dev
          </p>
          <p className="text-[13px] text-muted mt-0.5">
            Built with React
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
