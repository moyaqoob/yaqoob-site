import { useState, type FC } from 'react';
import SkillChip from './SkillChip';
import { PROJECTS, type ProjectItem } from '../content/site';

interface ProjectsProps {
  items?: ProjectItem[];
  featured?: boolean;
  heading?: boolean;
}

const Projects: FC<ProjectsProps> = ({
  items,
  featured = true,
  heading = true,
}) => {
  const list = items ?? (featured ? PROJECTS.filter((p) => p.featured) : PROJECTS);
  const [openId, setOpenId] = useState<string | null>(list[0]?.id ?? null);

  return (
    <section id="projects" className="block-section">
      {heading ? (
        <div>
          {featured ? <p className="kicker">Featured</p> : null}
          <h2 className="block-title">Projects</h2>
        </div>
      ) : null}
      <div className="project-list">
        {list.map((p) => {
          const expanded = openId === p.id;
          return (
            <article key={p.id} className="project-card">
              {p.cover === 'zebra' ? (
                <div className="project-cover project-cover-zebra" aria-hidden="true">
                  <div className="zebra-stripes" />
                  <div className="zebra-panel">
                    <div className="zebra-search">
                      <span className="zebra-search-icon" />
                      <span className="zebra-query">search the index</span>
                      <span className="zebra-kbd">↵</span>
                    </div>
                    <div className="zebra-hits">
                      <div className="zebra-hit is-top">
                        <span className="zebra-rank">1</span>
                        <span className="zebra-hit-line" />
                      </div>
                      <div className="zebra-hit">
                        <span className="zebra-rank">2</span>
                        <span className="zebra-hit-line short" />
                      </div>
                      <div className="zebra-hit">
                        <span className="zebra-rank">3</span>
                        <span className="zebra-hit-line mid" />
                      </div>
                    </div>
                  </div>
                  <span className="zebra-wordmark">Zebra</span>
                </div>
              ) : (
                <div className="project-cover" data-name={p.name}>
                  <span>{p.name}</span>
                </div>
              )}
              <div className="project-body">
                <div className="project-head">
                  <h3>{p.name}</h3>
                  {p.status ? (
                    <span className="working-badge">
                      <span className="working-dot" />
                      {p.status}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="exp-toggle"
                      aria-expanded={expanded}
                      title={expanded ? 'Hide details' : 'Show details'}
                      onClick={() => setOpenId(expanded ? null : p.id)}
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
                  )}
                </div>
                <p className="project-line">{p.oneLiner}</p>
                <div className={`exp-body${expanded || p.status ? ' is-open' : ''}`}>
                  <div>
                    <h4>Technologies</h4>
                    <div className="chip-row">
                      {p.stack.map((t) => (
                        <SkillChip key={t} label={t} />
                      ))}
                    </div>
                    <div className="exp-bullets">
                      {p.detail.map((d) => (
                        <p key={d}>• {d}</p>
                      ))}
                    </div>
                    <a
                      className="text-link"
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open project ↗
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {featured ? (
        <a href="#/projects" className="text-link">
          Show all projects
        </a>
      ) : null}
    </section>
  );
};

export default Projects;
