import { useState, type FC } from 'react';
import PdfViewerModal from './PdfViewerModal';
import SkillChip from './SkillChip';
import { HERO_CHIPS, PROFILE } from '../content/site';

const Hero: FC = () => {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <section id="hero" aria-labelledby="hero-title">
      <div className="avatar-wrap">
        <img
          src={PROFILE.photo}
          alt={`${PROFILE.fullName} profile photo`}
          className="avatar"
          width={96}
          height={96}
        />
        <div className="status-dot-wrap">
          <span className="status-dot" />
          <div className="status-tip">
            <div className="status-tip-title">{PROFILE.statusTitle}</div>
            <div className="status-tip-body">{PROFILE.statusDetail}</div>
          </div>
        </div>
      </div>

      <h1 id="hero-title" className="hero-title">
        Hi, I&apos;m {PROFILE.firstName} —{' '}
        <span className="text-muted">{PROFILE.role}</span>
      </h1>

      <p className="hero-lead">
        I&apos;m a <strong>full-stack engineer</strong> who loves{' '}
        <strong>building things</strong> and figuring out what happens{' '}
        <strong>under the hood</strong>. I work mostly in{' '}
        {HERO_CHIPS.map((chip, i) => (
          <span key={chip.label} className="hero-chip-slot">
            {i > 0 ? (i === HERO_CHIPS.length - 1 ? ' and ' : ', ') : null}
            <SkillChip label={chip.label} href={chip.href} />
          </span>
        ))}
        . I like taking on <strong>technical challenges</strong> and{' '}
        <strong>contributing to open source</strong>.
      </p>

      <div className="hero-ctas">
        <button type="button" className="btn btn-ghost" onClick={() => setPdfOpen(true)}>
          <svg viewBox="0 0 256 256" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M210.78,39.25l-130.25-23A16,16,0,0,0,62,29.23l-29.75,169a16,16,0,0,0,13,18.53l130.25,23h0a16,16,0,0,0,18.54-13l29.75-169A16,16,0,0,0,210.78,39.25ZM178.26,224h0L48,201,77.75,32,208,55Z" />
          </svg>
          Resume / CV
        </button>
        <a href="#talk" className="btn btn-primary">
          <svg viewBox="0 0 256 256" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" />
          </svg>
          Get in touch
        </a>
      </div>

      <nav className="social-row" aria-label="Social media links">
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 256 256" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
          </svg>
        </a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 256 256" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z" />
          </svg>
        </a>
        <a href={`mailto:${PROFILE.email}`} aria-label="Email">
          <svg viewBox="0 0 256 256" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
          </svg>
        </a>
      </nav>
      <PdfViewerModal open={pdfOpen} onClose={() => setPdfOpen(false)} />
    </section>
  );
};

export default Hero;
