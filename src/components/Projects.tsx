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
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="projects" className="block-section">
      {heading ? (
        <div>
          {featured ? <p className="kicker">Featured</p> : null}
          <h2 className="block-title">Projects</h2>
        </div>
      ) : null}

      <div className="project-grid">
        {list.map((p) => {
          const expanded = openId === p.id;
          return (
            <article
              key={p.id}
              className={`project-tile${expanded ? ' is-open' : ''}`}
            >
              <button
                type="button"
                className="project-tile-main"
                onClick={() => setOpenId(expanded ? null : p.id)}
                aria-expanded={expanded}
              >
                <div className="project-cover">
                  <img src={p.cover} alt="" loading="lazy" />
                </div>
                <div className="project-body">
                  <div className="project-head">
                    <h3>{p.name}</h3>
                    {p.status ? (
                      <span className="working-badge">
                        <span className="working-dot" />
                        {p.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="project-line">{p.oneLiner}</p>
                  <div className="chip-row project-chips">
                    {p.stack.slice(0, 3).map((t) => (
                      <SkillChip key={t} label={t} />
                    ))}
                  </div>
                </div>
              </button>

              {expanded ? (
                <div className="project-tile-detail">
                  <div className="exp-bullets">
                    {p.detail.map((d) => (
                      <p key={d}>• {d}</p>
                    ))}
                  </div>
                  <div className="chip-row">
                    {p.stack.map((t) => (
                      <SkillChip key={t} label={t} />
                    ))}
                  </div>
                  <a
                    className="text-link"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open project ↗
                  </a>
                </div>
              ) : null}
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
