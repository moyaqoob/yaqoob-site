import { useEffect, useState, type FC } from 'react';

interface Project {
  id: string;
  name: string;
  oneLiner: string;
  stack: string[];
  href: string;
  detail: string[];
  /** Flagged in UI when details are thinner than resume-backed projects */
  needsConfirm?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 'meridian',
    name: 'Meridian',
    oneLiner:
      'Agentic PR reviewer: tree-sitter → pgvector retrieval → staged workers with Redis Streams progress and citation mapping.',
    stack: ['Python', 'FastAPI', 'pgvector', 'Redis', 'Next.js'],
    href: 'https://github.com/moyaqoob/meridian',
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
    needsConfirm: true,
  },
  {
    id: 'caretrace',
    name: 'CareTrace',
    oneLiner:
      'Trace-oriented system work — details to confirm (link + one-liner from you).',
    stack: ['TBD'],
    href: 'https://github.com/moyaqoob',
    detail: [
      'Placeholder: you asked to list CareTrace. Replace this blurb, stack chips, and GitHub URL with the real write-up.',
    ],
    needsConfirm: true,
  },
];

const Projects: FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = PROJECTS.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <section id="projects">
      <div className="section-header">
        <div>
          <div className="section-label">Builds</div>
          <h2 className="section-title">Selected work</h2>
        </div>
      </div>
      <div className="builds-list">
        {PROJECTS.map((p) => (
          <article key={p.id} className="build-card">
            <div className="build-main">
              <div className="build-head">
                <h3 className="build-name">{p.name}</h3>
                {p.needsConfirm ? (
                  <span className="build-flag">confirm details</span>
                ) : null}
              </div>
              <p className="build-line">{p.oneLiner}</p>
              <div className="project-stack">
                {p.stack.map((t) => (
                  <span key={t} className="stack-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="build-actions">
              <button
                type="button"
                className="build-more"
                onClick={() => setOpenId(p.id)}
              >
                Details
              </button>
              <a href={p.href} target="_blank" rel="noreferrer" className="build-link">
                Link ↗
              </a>
            </div>
          </article>
        ))}
      </div>

      {open ? (
        <div
          className="modal-overlay open"
          onClick={() => setOpenId(null)}
          role="presentation"
        >
          <div
            className="build-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="build-drawer-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-btn"
              onClick={() => setOpenId(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="section-label">Project</div>
            <h3 id="build-drawer-title" className="build-drawer-title">
              {open.name}
            </h3>
            <ul className="build-drawer-list">
              {open.detail.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="project-stack" style={{ marginTop: 24 }}>
              {open.stack.map((t) => (
                <span key={t} className="stack-tag">
                  {t}
                </span>
              ))}
            </div>
            <a
              href={open.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ marginTop: 28 }}
            >
              Open link
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Projects;
