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
      'Same loop on client work and my own products (Meridian, Zebra Search): write the spec, design the contracts, ship a thin first version, then stay with it until the edge cases are boring.',
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
  cover?: 'zebra' | 'plain';
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'meridian',
    name: 'Meridian',
    oneLiner:
      'Agentic PR reviewer: tree-sitter → pgvector retrieval → staged workers with Redis Streams progress and citation mapping.',
    stack: ['Python', 'FastAPI', 'pgvector', 'Redis', 'Next.js'],
    href: 'https://github.com/moyaqoob/meridian',
    status: 'Building',
    featured: true,
    detail: [
      'Indexes the codebase with tree-sitter chunking and 2048-dim embeddings in pgvector; retrieves top chunks by cosine similarity so reviews are grounded in real context.',
      'GitHub webhooks (HMAC) kick a 4-stage RQ pipeline: validation → retrieval → generation → citation mapping. Redis dedup (24h TTL) and (repo, PR, head SHA) locking keep generation idempotent.',
      'Clients get live stage progress over Redis Streams SSE with latency metrics and replay on reconnect — the pipeline is legible, not a black box.',
    ],
  },
  {
    id: 'zebra',
    name: 'Zebra Search',
    oneLiner:
      'Hybrid BM25 + semantic search from first principles, edge-deployed on Cloudflare D1 with sub-1s query latency.',
    stack: ['TypeScript', 'Cloudflare Workers', 'D1', 'BM25', 'Embeddings'],
    href: 'https://zebrasearch.moyaqoob28.workers.dev/',
    featured: true,
    cover: 'zebra',
    detail: [
      'Crawler, indexer, multi-factor ranking, and query UI — no off-the-shelf search framework.',
      '50,000+ pages admitted through quality gates (content length, keyword density, duplicate URL fingerprints).',
      'Lexical + embedding similarity weighted by freshness decay and domain authority; globally distributed, no cold-start tax.',
    ],
  },
  {
    id: 'redis-clone',
    name: 'Redis clone (Rust)',
    oneLiner:
      'From-scratch Redis-compatible server over raw TCP / RESP — learning the protocol and concurrency model by building it.',
    stack: ['Rust', 'TCP', 'RESP'],
    href: 'https://github.com/moyaqoob',
    detail: [
      'Implements the RESP wire protocol and a subset of Redis commands over a raw TCP listener.',
      'Goal: understand connection handling, command parsing, and in-memory data structures without hiding behind a client library.',
    ],
  },
  {
    id: 'caretrace',
    name: 'CareTrace',
    oneLiner: 'Trace-oriented system work — details to confirm.',
    stack: ['Systems'],
    href: 'https://github.com/moyaqoob',
    detail: [
      'Placeholder: replace this blurb, stack chips, and GitHub URL with the real write-up.',
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
