import { useState, type FC } from 'react';
import PdfViewerModal from './PdfViewerModal';

const Footer: FC = () => {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <>
      <footer id="proof">
        <div className="proof-grid">
          <div>
            <div className="section-label">Proof</div>
            <ul className="proof-list">
              <li>350+ DSA problems · LeetCode / HackerRank</li>
              <li>14+ contests · rating +65%</li>
              <li>Stalwart intern · ~40% fewer failed payment transactions</li>
            </ul>
          </div>
          <div>
            <div className="section-label">Contact</div>
            <ul className="proof-links">
              <li>
                <a href="mailto:moyaqoob28@gmail.com">moyaqoob28@gmail.com</a>
              </li>
              <li>
                <a href="https://github.com/moyaqoob" target="_blank" rel="noreferrer">
                  github.com/moyaqoob
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/moyaqoob" target="_blank" rel="noreferrer">
                  linkedin.com/in/moyaqoob
                </a>
              </li>
              <li>
                <button type="button" className="proof-resume" onClick={() => setPdfOpen(true)}>
                  Resume (PDF)
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bar">
          <span>© {new Date().getFullYear()} Mohammed Yaqoob</span>
          <a href="#/writing" style={{ marginLeft: 16, color: 'inherit' }}>
            Writing
          </a>
        </div>
      </footer>
      <PdfViewerModal open={pdfOpen} onClose={() => setPdfOpen(false)} />
    </>
  );
};

export default Footer;
