import type { FC } from 'react';

const Projects: FC = () => (
  <section id="projects">
    <div className="section-header">
      <div>
        <div className="section-label">Work</div>
        <h2 className="section-title">Projects</h2>
      </div>
    </div>
    <div className="projects-grid">
      <a
        href="https://github.com/moyaqoob/meridian"
        target="_blank"
        className="project-card featured"
        rel="noreferrer"
      >
        <div>
          <div className="project-eyebrow">Featured · RAG System</div>
          <h3 className="project-name">Meridian</h3>
          <p className="project-desc">
            An AI code review system that has actually read your entire
            codebase. Opens a PR, Meridian retrieves semantically relevant
            context across the repo using hybrid BM25 + vector search, runs a
            cross-encoder reranker, and streams a structured, line-annotated
            review in under 20 seconds.
          </p>
          <p className="project-desc">
            Not a wrapper around an LLM — a retrieval system with an LLM at the
            end. The distinction is what makes it production-grade.
          </p>
          <div className="project-stack">
            <span className="stack-tag">Python / FastAPI</span>
            <span className="stack-tag">pgvector</span>
            <span className="stack-tag">BM25 + RRF</span>
            <span className="stack-tag">Claude Sonnet</span>
            <span className="stack-tag">SSE streaming</span>
            <span className="stack-tag">tree-sitter</span>
            <span className="stack-tag">TypeScript / Next.js</span>
          </div>
        </div>
        <div className="project-visual">
          <div className="project-visual-text">
            <div className="project-visual-title">Meridian</div>
            <div
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 11,
                letterSpacing: '0.08em',
              }}
            >
              RAG · Review · Stream
            </div>
          </div>
        </div>
      </a>

      <a
        href="https://zebrasearch.moyaqoob28.workers.dev/"
        target="_blank"
        className="project-card"
        rel="noreferrer"
      >
        <div className="project-eyebrow">Search Engine · Edge</div>
        <h3 className="project-name">Zebra Search</h3>
        <p className="project-desc">
          Built a complete search engine from first principles — strict-mode crawler, tokenized indexer, multi-factor ranking pipeline, and query UI — with zero off-the-shelf search frameworks.
        </p>
        <p className="project-desc">
          Crawler processed 50,000+ pages with enforced quality gates (minimum content length, keyword density thresholds, duplicate URL fingerprinting) to admit only high-signal documents into the index. Hybrid retrieval model: BM25-style lexical scoring combined with embedding-based semantic similarity, weighted by freshness decay and domain authority signals.
        </p>
        <p className="project-desc">
          Query engine backed by Cloudflare D1 (edge SQLite); globally distributed deployment achieves sub-1s end-to-end query latency with no cold-start penalty.
        </p>
        <div className="project-stack">
          <span className="stack-tag">Cloudflare D1</span>
          <span className="stack-tag">BM25</span>
          <span className="stack-tag">Embeddings</span>
          <span className="stack-tag">Edge SQLite</span>
          <span className="stack-tag">Crawler</span>
          <span className="stack-tag">TypeScript</span>
        </div>
      </a>

      <a
        href="https://perplx-web.vercel.app/"
        target="_blank"
        className="project-card"
        rel="noreferrer"
      >
        <div className="project-eyebrow">Search · Generation</div>
        <h3 className="project-name">Answer Engine</h3>
        <p className="project-desc">
          A Perplexity-style answer engine built from scratch to understand how
          retrieval-augmented generation actually works architecturally. Search
          → scrape → chunk → retrieve → LLM generates with citations. The LLM
          as a reasoning layer, not a knowledge store.
        </p>
        <div className="project-stack">
          <span className="stack-tag">TypeScript</span>
          <span className="stack-tag">Bing Search API</span>
          <span className="stack-tag">Web scraping</span>
          <span className="stack-tag">RAG pipeline</span>
          <span className="stack-tag">Streaming</span>
        </div>
      </a>
    </div>
  </section>
);

export default Projects;
