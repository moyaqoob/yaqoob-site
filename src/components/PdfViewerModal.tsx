import { useEffect, type FC, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

export const RESUME_URL = '/Founding-Engineer-Mohd-Yaqoob.pdf';
export const RESUME_FILENAME = 'Founding Engineer - Mohd Yaqoob.pdf';

// Phones and tablets can't show a PDF inside <embed>, so there we let the
// link open the PDF directly. Only desktop gets the in-page modal.
export const openResume = (e: MouseEvent<HTMLAnchorElement>, openModal: () => void) => {
  const canEmbedPdf =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    window.innerWidth >= 768;
  if (!canEmbedPdf || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  openModal();
};

interface PdfViewerModalProps {
  open: boolean;
  onClose: () => void;
}

const PdfViewerModal: FC<PdfViewerModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Rendered on <body> so the page's animated sections and fixed nav
  // can't push the modal off-centre or sit on top of it.
  return createPortal(
    <div
      className="modal-overlay open"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
      style={{ zIndex: 10000 }}
    >
      <div
        style={{
          background: '#0E0E0E',
          borderRadius: 16,
          width: '100%',
          maxWidth: 900,
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {RESUME_FILENAME}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="btn btn-primary"
              style={{
                fontSize: 12,
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              ↓ Download
            </a>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: 'none',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
              }}
            >
              ×
            </button>
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <embed
            src={RESUME_URL}
            type="application/pdf"
            style={{ width: '100%', height: 'calc(92vh - 57px)', display: 'block' }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PdfViewerModal;
