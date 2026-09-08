import type { FC, ReactNode } from 'react';
import type { Post } from '../types/post';
import Experience from './Experience';
import Blogs from './Blogs';
import Projects from './Projects';
import { EXPERIENCE, PROJECTS } from '../content/site';

interface PageShellProps {
  kicker: string;
  title: string;
  children: ReactNode;
}

export const PageShell: FC<PageShellProps> = ({ kicker, title, children }) => (
  <div className="page-shell">
    <p className="kicker">{kicker}</p>
    <h1 className="page-title">{title}</h1>
    {children}
  </div>
);

export const WorkPage: FC = () => (
  <PageShell kicker="Career" title="Work experience">
    <Experience items={EXPERIENCE} featured={false} heading={false} />
  </PageShell>
);

export const ProjectsPage: FC = () => (
  <PageShell kicker="Build" title="Projects">
    <Projects items={PROJECTS} featured={false} heading={false} />
  </PageShell>
);

interface WritingPageProps {
  posts: Post[];
  onViewArticle: (post: Post) => void;
  onWriteFirst: () => void;
}

export const WritingPage: FC<WritingPageProps> = ({
  posts,
  onViewArticle,
  onWriteFirst,
}) => (
  <PageShell kicker="Writing" title="Notes & articles">
    <p className="page-intro">
      Short notes on things I&apos;ve actually worked through.
    </p>
    <button type="button" className="btn btn-ghost" onClick={onWriteFirst}>
      Open editor
    </button>
    <Blogs
      posts={posts}
      onViewArticle={onViewArticle}
      featured={false}
      heading={false}
    />
  </PageShell>
);
