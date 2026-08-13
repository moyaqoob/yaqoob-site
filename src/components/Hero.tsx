import { useState, type FC } from 'react';
import PdfViewerModal from './PdfViewerModal';

const PROOFS = [
  '350+ DSA problems (LeetCode / HackerRank)',
  'Meridian — agentic PR review grounded in repo retrieval',
  '~40% fewer failed transactions in production (Stalwart)',
] as const;

const Hero: FC = () => {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-name">Mohammed Yaqoob</p>
          <h1 className="hero-title">
            Backend &amp; distributed systems, working close to AI —
            not wrapping prompts.
          </h1>
          <p className="hero-body">
            I read primary sources, build systems that expose their own reasoning
            (trace logs, override layers), and go deep on fundamentals — DBMS
            internals, scheduling, retrieval — instead of stopping at framework
            tutorials.
          </p>
          <ul className="hero-proofs">
            {PROOFS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="hero-ctas">
            <button type="button" className="btn btn-primary" onClick={() => setPdfOpen(true)}>
              Resume
            </button>
            <a
              href="https://github.com/moyaqoob"
              className="btn btn-ghost"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="hero-photo-wrap">
          <img
            src="/me.jpg"
            alt="Mohammed Yaqoob"
            className="hero-photo"
            width={546}
            height={1024}
          />
        </div>
      </div>
      <PdfViewerModal open={pdfOpen} onClose={() => setPdfOpen(false)} />
    </section>
  );
};

export default Hero;
