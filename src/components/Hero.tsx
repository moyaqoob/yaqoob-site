import { useState, type FC } from 'react';
import PolyhedronCanvas from './PolyhedronCanvas';
import PdfViewerModal from './PdfViewerModal';

const Hero: FC = () => {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
  <section
    id="hero"
    style={{
      paddingTop: 120,
      maxWidth: '100%',
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    }}
  >
    <div className="hero-inner">
      <div>
        <div className="hero-label">// Mathematics · Philosophy · Technology</div>
        <h1 className="hero-title">
          Building things<br />
          at the edge of<br />
          <em>what's possible.</em>
        </h1>
        <p className="hero-body">
          I'm <strong className="name-highlight">Yaqoob</strong> — a software engineer who thinks problems deserve to be
          understood before they're solved. I work at the intersection of
          rigorous systems thinking, mathematical intuition, and real
          engineering. I write about what I'm learning. I build things that
          matter.
        </p>
        <div className="hero-tags">
          <span className="hero-tag">Retrieval systems</span>
          <span className="hero-tag">RAG architecture</span>
          <span className="hero-tag">Distributed systems</span>
          <span className="hero-tag">Philosophy of mind</span>
          <span className="hero-tag">Applied mathematics</span>
        </div>
      <div className="hero-ctas">
        <a href="#writing" className="btn btn-primary">
          Read my writing
        </a>
        <a href="#projects" className="btn btn-ghost">
          See my work
        </a>
        <button className="btn btn-ghost" onClick={() => setPdfOpen(true)}>
          View Resume
        </button>
      </div>
    </div>
      <PolyhedronCanvas />
    </div>
      <PdfViewerModal open={pdfOpen} onClose={() => setPdfOpen(false)} />
  </section>
  );
};

export default Hero;
