import { useState, type FC } from 'react';
import PdfViewerModal from './PdfViewerModal';

const Hero: FC = () => {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-name">Mohammed Yaqoob</p>
          <h1 className="hero-title">
            Full-stack engineer (backend-heavy)
          </h1>
          <p className="hero-body">
            Interested in backend systems and AI — working myself toward being a
            better engineer every day.
          </p>
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
            src="/me.png"
            alt="Mohammed Yaqoob"
            className="hero-photo"
            width={371}
            height={502}
          />
        </div>
      </div>
      <PdfViewerModal open={pdfOpen} onClose={() => setPdfOpen(false)} />
    </section>
  );
};

export default Hero;
