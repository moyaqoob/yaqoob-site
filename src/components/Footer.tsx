import { useState, type FC } from 'react';
import PdfViewerModal from './PdfViewerModal';
import { PROFILE } from '../content/site';

const Footer: FC = () => {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} {PROFILE.fullName}</p>
        <div className="footer-links">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <button type="button" className="text-link" onClick={() => setPdfOpen(true)}>
            Resume
          </button>
        </div>
      </footer>
      <PdfViewerModal open={pdfOpen} onClose={() => setPdfOpen(false)} />
    </>
  );
};

export default Footer;
