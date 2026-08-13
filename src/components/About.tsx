import type { FC } from 'react';

const DOMAINS = [
  {
    title: 'Backend & Distributed Systems',
    body: 'Production APIs with Zod-validated boundaries, retry queues, and webhook signature checks. Studying consensus / replication patterns (MIT 6.824-adjacent) and DBMS internals — join semantics, buffering, what the planner actually decides.',
  },
  {
    title: 'Agentic AI / LLM Systems',
    body: 'RAG pipelines where retrieval is the product and the LLM is a reasoning layer — tree-sitter chunking, pgvector, staged workers, Redis Streams for live progress. Trace-log-and-override: expose what the agent did so a human can correct the control path, not just the final text.',
  },
  {
    title: 'Search & Retrieval',
    body: 'Shipped hybrid BM25 + embedding search to the edge (Cloudflare D1), with freshness and authority signals in the ranker. Care about ranking transparency — score breakdowns you can inspect, not a black-box “relevance” number.',
  },
  {
    title: 'Fundamentals',
    body: 'OS, DBMS, networks as load-bearing knowledge. GFS: separation of control vs data paths changed how I think about scale. Attention Is All You Need: sequence modeling as content-addressable routing — informs how I design retrieval and context windows, not just “transformers are cool.”',
  },
] as const;

const About: FC = () => (
  <section id="domains">
    <div className="section-header">
      <div>
        <div className="section-label">Depth</div>
        <h2 className="section-title">Domains</h2>
      </div>
    </div>
    <div className="domains-grid">
      {DOMAINS.map((d) => (
        <article key={d.title} className="domain-block">
          <h3 className="domain-title">{d.title}</h3>
          <p className="domain-body">{d.body}</p>
        </article>
      ))}
    </div>
  </section>
);

export default About;
