import { useState, type FC } from 'react';
import SkillChip from './SkillChip';
import { EXPERIENCE, type ExperienceItem } from '../content/site';

interface ExperienceProps {
  items?: ExperienceItem[];
  featured?: boolean;
  heading?: boolean;
}

const PREVIEW = 2;

const Experience: FC<ExperienceProps> = ({
  items = EXPERIENCE,
  featured = true,
  heading = true,
}) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <section id="work" className="block-section">
      {heading ? (
        <div>
          {featured ? <p className="kicker">Featured</p> : null}
          <h2 className="block-title">Experience</h2>
        </div>
      ) : null}
      <div className="exp-list">
        {items.map((job) => {
          const expanded = Boolean(open[job.id]);
          const preview = job.bullets.slice(0, PREVIEW);
          const rest = job.bullets.slice(PREVIEW);

          return (
            <article key={job.id} className="exp-card">
              <div className="exp-top">
                <div className="exp-identity">
                  <div className="exp-mark" aria-hidden="true">
                    {job.company.slice(0, 1)}
                  </div>
                  <div>
                    <div className="exp-name-row">
                      <h3>{job.company}</h3>
                      {job.website ? (
                        <a
                          href={job.website}
                          target="_blank"
                          rel="noreferrer"
                          className="exp-ext"
                          aria-label={`${job.company} website`}
                        >
                          ↗
                        </a>
                      ) : null}
                      {job.working ? (
                        <span className="working-badge">
                          <span className="working-dot" />
                          Working
                        </span>
                      ) : null}
                      <button
                        type="button"
                        className="exp-toggle"
                        aria-expanded={expanded}
                        aria-controls={`exp-${job.id}`}
                        title={expanded ? 'Hide details' : 'Show details'}
                        onClick={() =>
                          setOpen((s) => ({ ...s, [job.id]: !s[job.id] }))
                        }
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={expanded ? 'is-open' : undefined}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    <p className="exp-role">{job.role}</p>
                  </div>
                </div>
                <div className="exp-meta">
                  <p>
                    {job.start} - {job.end}
                  </p>
                  <p>{job.location}</p>
                </div>
              </div>
              <div className="exp-preview">
                {preview.map((b) => (
                  <p key={b}>• {b}</p>
                ))}
              </div>
              <div
                id={`exp-${job.id}`}
                className={`exp-body${expanded ? ' is-open' : ''}`}
                aria-hidden={!expanded}
                inert={!expanded ? true : undefined}
              >
                <div>
                  {rest.length > 0 ? (
                    <div className="exp-bullets">
                      {rest.map((b) => (
                        <p key={b}>• {b}</p>
                      ))}
                    </div>
                  ) : null}
                  <h4>Technologies</h4>
                  <div className="chip-row">
                    {job.tech.map((t) => (
                      <SkillChip key={t} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {featured ? (
        <a href="#/work" className="text-link">
          Show all work experiences
        </a>
      ) : null}
    </section>
  );
};

export default Experience;
