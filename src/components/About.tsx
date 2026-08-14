import type { FC } from 'react';

const DOMAINS = [
  {
    title: 'Backend & Distributed Systems',
    body: 'I care about what happens after the happy path — where state lives, how work is retried, and what breaks when a dependency is slow or wrong. Depth for me means being able to sketch a system’s failure modes before writing the first handler, not memorizing a framework’s API surface.',
  },
  {
    title: 'Agentic AI / LLM Systems',
    body: 'The interesting problem isn’t “call a model.” It’s deciding what the model is allowed to see, what it is allowed to do, and how a human can audit both. I build around retrieval and control: ground answers in real context, stream the steps so the path is visible, and leave an override when the agent is wrong — because opaque generation doesn’t ship.',
  },
  {
    title: 'Search & Retrieval',
    body: 'Search is ranking under constraints. Lexical signals catch exactness; semantic signals catch intent; something has to explain why result A beat result B. I want retrieval systems I can debug — score breakdowns and clear tradeoffs — not a single opaque “relevance” number.',
  },
  {
    title: 'Core subjects',
    body: 'I can work comfortably with SQL, operating systems, and computer networks — not as buzzwords, but as tools I use to reason. Queries, indexes, and joins. Processes, scheduling, and memory. Packets, latency, and failure at the wire. That’s the floor I want under every abstraction I build on.',
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
