import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const RESUME_FILE_URL = "/yaqoob_resume.pdf";
const RESUME_VIEW_URL =
  `${RESUME_FILE_URL}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-width&view=FitH`;

export function ResumePage() {
  return (
    <main className="relative min-h-screen bg-[#f8f8f6] font-heading text-neutral-900">
      <div className="fixed inset-0 -z-10 bg-grid-white opacity-60" />

      <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-16">
        <nav className="mb-12 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <span className="text-neutral-400">[</span>
            <ArrowLeft size={14} />
            Back to home
            <span className="text-neutral-400">]</span>
          </Link>

          <a
            href={RESUME_FILE_URL}
            download="yaqoob_resume.pdf"
            className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <span className="text-neutral-400">[</span>
            <Download size={14} />
            Download
            <span className="text-neutral-400">]</span>
          </a>
        </nav>

        <div className="h-[calc(100vh-10rem)] w-full">
          <iframe
            src={RESUME_VIEW_URL}
            className="h-full w-full rounded-xl border border-neutral-300 bg-white shadow-sm"
            title="Resume"
          />
        </div>
      </div>
    </main>
  );
}
