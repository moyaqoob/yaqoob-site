export const PROFILE = {
  firstName: 'Yaqoob',
  fullName: 'Mohammed Yaqoob',
  role: 'Full-stack Engineer',
  email: 'moyaqoob28@gmail.com',
  github: 'https://github.com/moyaqoob',
  linkedin: 'https://linkedin.com/in/moyaqoob',
  photo: '/me.png',
  statusTitle: 'Building & shipping',
  statusDetail: 'Working on Meridian',
};

export const HERO_CHIPS = [
  { label: 'Python', href: 'https://www.python.org/' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org/' },
  { label: 'Rust', href: 'https://www.rust-lang.org/' },
];

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  working?: boolean;
  website?: string;
  bullets: string[];
  tech: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Full-stack engineer',
    start: '2025',
    end: 'Present',
    location: 'Remote',
    working: true,
    bullets: [
      'Most of the work starts the same way: someone has a messy idea, and I turn it into a small product that actually runs — login, the main flow, an API, a database, and the bits that break when a user does something weird.',
      'Shipped a handful of MVPs end to end: the landing page, the one feature that matters, a simple admin, and enough backend that it didn’t fall over the week after we launched.',
      'Built chatbot and AI features on a real backend, not a demo prompt box — answers grounded in the product’s own docs or data, with streaming replies, basic auth, and a log of what the model did when it got it wrong.',
      'Comfortable sitting between AI and backend: retrieval, rate limits, webhooks, retries. The model is the interesting part; keeping it from lying or hanging the server is the job.',
      'Same loop on client work and my own products (Meridian, Zebra, mem-engine, micrograd): write the spec, design the contracts, ship a thin first version, then stay with it until the edge cases are boring.',
    ],
    tech: ['TypeScript', 'Python', 'React', 'Node.js', 'FastAPI', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'stalwart',
    company: 'Stalwart.ae',
    role: 'Software engineering intern',
    start: '2024',
    end: '2024',
    location: 'Dubai, UAE (Remote)',
    website: 'https://stalwart.ae',
    bullets: [
      'Delivered production features across a React + Node.js stack, owning the full cycle from spec to live deployment in an agile sprint cadence.',
      'Integrated third-party payment and logistics APIs with retry queues and webhook signature validation, reducing failed transaction incidents by ~40%.',
      'Migrated untyped REST route handlers to strict Zod-validated schemas, eliminating a class of runtime input errors at the API boundary before they reached the database.',
      'Established the team’s first test coverage on financial flows using Jest, covering critical payment paths end-to-end.',
      'Designed the payment webhook path as a queue, not a one-shot handler: verify the signature, persist an idempotent event, then update order state so a delayed or duplicated provider callback could not double-charge or leave a checkout stuck.',
      'Shipped logistics status as an inbound webhook → validate → write status → surface in the UI loop, so the team could see where a shipment actually was instead of living in a vendor dashboard.',
    ],
    tech: ['TypeScript', 'React', 'Node.js', 'Zod', 'Jest', 'PostgreSQL'],
  },
];

export interface ProjectItem {
  id: string;
  name: string;
  oneLiner: string;
  stack: string[];
  href: string;
  detail: string[];
  status?: string;
  featured?: boolean;
  cover: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'meridian',
    name: 'Meridian',
    oneLiner:
      'Agentic PR reviewer that retrieves real code, runs staged workers, and streams the review path live.',
    stack: ['Python', 'FastAPI', 'pgvector', 'Redis', 'Next.js'],
    href: 'https://github.com/moyaqoob/meridian',
    status: 'Building',
    featured: true,
    cover: '/projects/meridian.png',
    detail: [
      'Indexes a repo with tree-sitter chunking and embeddings in pgvector so reviews are grounded in real context.',
      'GitHub webhooks kick a staged pipeline: validation → retrieval → generation → citation mapping, with Redis locking so the same PR head does not double-run.',
      'Clients watch stage progress over Redis Streams SSE — the review is a visible path, not a black box.',
    ],
  },
  {
    id: 'zebra',
    name: 'Zebra Search',
    oneLiner:
      'Hybrid BM25 + semantic search from first principles, edge-deployed with sub-1s query latency.',
    stack: ['TypeScript', 'Cloudflare Workers', 'D1', 'BM25'],
    href: 'https://zebrasearch.moyaqoob28.workers.dev/',
    featured: true,
    cover: '/projects/zebra.png',
    detail: [
      'Crawler, indexer, ranking, and query UI — no off-the-shelf search framework.',
      'Lexical + embedding similarity weighted by freshness and domain authority.',
      'Runs on Cloudflare Workers + D1 so the index stays close to the edge.',
    ],
  },
  {
    id: 'mem-engine',
    name: 'mem-engine',
    oneLiner:
      'Personal memory that lives on your machine — it reads the browser, terminal, git, and files.',
    stack: ['TypeScript', 'Python', 'Local embeddings'],
    href: 'https://github.com/moyaqoob/mem-engine',
    featured: true,
    cover: '/projects/mem-engine.png',
    detail: [
      'A local memory layer that watches what you are already doing: browser tabs, terminal history, git activity, and files on disk.',
      'Keeps that context on your computer so an agent can recall recent work without sending everything to the cloud.',
      'Built for personal use — one machine, your data, searchable memory across the tools you already open every day.',
    ],
  },
  {
    id: 'micrograd',
    name: 'micrograd',
    oneLiner:
      'A tiny neural engine in NumPy — scalars, graphs, and backprop you can actually read.',
    stack: ['Python', 'NumPy'],
    href: 'https://github.com/moyaqoob/micrograd',
    featured: true,
    cover: '/projects/micrograd.png',
    detail: [
      'A small autograd engine: build a computation graph from scalars, then reverse-mode backprop through it.',
      'Enough to train a tiny MLP without a heavy framework — good for understanding how gradients actually move.',
      'NumPy under the hood, short code path, no magic.',
    ],
  },
];

export const ABOUT = {
  name: PROFILE.fullName,
  body: 'I focus on building production backend and AI systems that have to stay up — not just look good in a demo. My work sits with agentic workflows on real infrastructure: APIs, data, queues, and the path a request actually takes. I like solving hard problems in the open, and I contribute to open source when I can.',
};

export const SKILL_GROUPS: { title: string; items: string[] }[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Rust'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'Redis', 'Cloudflare D1'],
  },
  {
    title: 'Frameworks',
    items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Express'],
  },
];

export const EXPLORE = [
  {
    kicker: 'Development',
    title: 'Professional',
    items: [
      {
        name: 'The mindset',
        note: 'How I think as a backend-heavy engineer',
        href: '#about',
      },
      {
        name: 'Perspective',
        note: 'Approach to system design and failure modes',
        href: '#about',
      },
    ],
  },
  {
    kicker: 'Personal',
    title: 'Life',
    items: [
      {
        name: 'Notes',
        note: 'Things I have actually worked through',
        href: '#/writing',
      },
      {
        name: 'Proof',
        note: 'DSA, contests, and intern work',
        href: '#talk',
      },
    ],
  },
];
