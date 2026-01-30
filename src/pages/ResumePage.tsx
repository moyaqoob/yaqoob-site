import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

// Google Drive embed for resume
const RESUME_EMBED_URL =
  "https://drive.google.com/file/d/1KIwGlaKlw0b-JfKK-XCI0VIN3Zy5uP23/preview";
const RESUME_DOWNLOAD_URL =
  "https://drive.google.com/file/d/1KIwGlaKlw0b-JfKK-XCI0VIN3Zy5uP23/preview";

export function ResumePage() {
  return (
    <div className="min-h-screen-100 flex flex-col bg-[hsl(var(--background))]">
      {/* Top bar: back left, download right */}
      <header className="flex items-center justify-between px-4 py-3 shrink-0 pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))] pl-[max(1rem,env(safe-area-inset-left))]">
        <Link
          to="/"
          className="flex items-center gap-2 text-[13px] font-medium link text-foreground hover:opacity-70 transition-opacity"
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={20} aria-hidden />
          <span className="hidden sm:inline">Portfolio</span>
        </Link>
        <a
          href={RESUME_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-[hsl(var(--border))] transition-opacity link text-foreground"
          aria-label="Download resume"
        >
          <Download size={18} aria-hidden />
        </a>
      </header>

      {/* Resume: Google Drive embed — same element as your reference */}
      <main className="flex-1 flex justify-center relative sm:mt-0 mt-10 min-h-0">
        <iframe
          src={RESUME_EMBED_URL}
          className="md:h-[90vh] md:w-[70vh]  h-[70vh] w-full border-0 opacity-100 transition-opacity duration-300 object-center object-contain"
          title="Resume"
        />
      </main>
    </div>
  );
}
