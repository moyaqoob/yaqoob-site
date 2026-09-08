import type { FC } from 'react';

interface SkillChipProps {
  label: string;
  href?: string;
}

const SkillChip: FC<SkillChipProps> = ({ label, href }) => {
  const inner = (
    <>
      <span className="skill-mark" aria-hidden="true">
        {label.slice(0, 1)}
      </span>
      {label}
    </>
  );

  if (href) {
    return (
      <a
        className="skill-chip"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {inner}
      </a>
    );
  }

  return <span className="skill-chip">{inner}</span>;
};

export default SkillChip;
