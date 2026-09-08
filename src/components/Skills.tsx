import type { FC } from 'react';
import SkillChip from './SkillChip';
import { SKILL_GROUPS } from '../content/site';

const Skills: FC = () => (
  <section id="skills" className="block-section">
    <h2 className="block-title">Skills</h2>
    <div className="skills-groups">
      {SKILL_GROUPS.map((g) => (
        <div key={g.title}>
          <h3 className="skills-label">{g.title}</h3>
          <div className="chip-row">
            {g.items.map((item) => (
              <SkillChip key={item} label={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
