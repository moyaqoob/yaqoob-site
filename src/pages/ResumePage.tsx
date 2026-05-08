import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const RESUME_FILE_URL = "/yaqoob_resume.pdf";
const RESUME_VIEW_URL =
  `${RESUME_FILE_URL}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-width&view=FitH`;



export function ResumePage() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-4 sm:px-6">
      <header className="mx-auto mb-3 flex w-full max-w-5xl items-center justify-between text-foreground">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[24px] font-semibold tracking-tight hover:opacity-80 transition-opacity"
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={18} aria-hidden />
          <span>Portfolio</span>
        </Link>

        <a
          href={RESUME_FILE_URL}
          download="yaqoob_resume.pdf"
          className="flex items-center gap-1.5 text-[24px] font-semibold tracking-tight hover:opacity-80 transition-opacity"
          aria-label="Download resume"
        >
          <Download size={18} aria-hidden />
          <span>Download</span>
        </a>
      </header>

      <div className="mx-auto mb-4 w-full max-w-5xl border-t border-[hsl(var(--border))]" />

      <div className="mx-auto h-[calc(100vh-6.75rem)] w-full max-w-5xl">
        <iframe
          src={RESUME_VIEW_URL}
          className="h-full w-full border border-black/80 bg-white"
          title="Resume"
        />
      </div>
    </main>
  );
}
