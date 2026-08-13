import type { FC } from 'react';
import type { Post } from '../types/post';
import { formatDate, escHtml } from '../lib/utils';

interface WritingProps {
  posts: Post[];
  onViewArticle: (post: Post) => void;
  onWriteFirst: () => void;
}

const SECTIONS = [
  {
    id: 'backend',
    label: 'Backend',
    title: 'Backend fundamentals',
    blurb: 'DBMS internals, APIs, durability, and what the planner actually does.',
    match: (c: string) => /backend|dbms|database|api|sql/i.test(c),
  },
  {
    id: 'systems',
    label: 'Systems',
    title: 'Distributed systems',
    blurb: 'Consensus, replication, queues, and failure modes you can reason about.',
    match: (c: string) => /system|distributed|network|os|infra/i.test(c),
  },
  {
    id: 'retrieval',
    label: 'Retrieval',
    title: 'Search & LLM systems',
    blurb: 'Hybrid retrieval, ranking transparency, RAG control vs knowledge.',
    match: (c: string) => /retriev|search|rag|llm|ai|agent/i.test(c),
  },
  {
    id: 'notes',
    label: 'Notes',
    title: 'Other notes',
    blurb: 'Uncategorized or cross-cutting write-ups.',
    match: () => true,
  },
] as const;

function groupPosts(posts: Post[]) {
  const used = new Set<string>();
  return SECTIONS.map((section) => {
    const items =
      section.id === 'notes'
        ? posts.filter((p) => !used.has(p.id))
        : posts.filter((p) => {
            const hit = section.match(p.category || 'note');
            if (hit) used.add(p.id);
            return hit;
          });
    return { section, items };
  }).filter(({ section, items }) => section.id !== 'notes' || items.length > 0 || posts.length === 0);
}

const Writing: FC<WritingProps> = ({ posts, onViewArticle, onWriteFirst }) => {
  const groups = groupPosts(posts);

  return (
    <div className="writing-page">
      <header className="writing-page-header">
        <div className="section-label">Writing</div>
        <h1 className="section-title" style={{ fontSize: 28, marginTop: 8 }}>
          Notes &amp; articles
        </h1>
        <p className="writing-intro" style={{ marginTop: 14 }}>
          Short notes on things I&apos;ve actually worked through. Each topic lives
          in its own section — no tutorial rewrites.
        </p>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '8px 14px', marginTop: 8 }}
          onClick={onWriteFirst}
        >
          Open editor
        </button>
      </header>

      {groups.map(({ section, items }) => (
        <section key={section.id} id={`writing-${section.id}`} className="writing-section">
          <div className="section-header">
            <div>
              <div className="section-label">{section.label}</div>
              <h2 className="section-title">{section.title}</h2>
            </div>
            <span className="section-meta">
              {items.length} post{items.length !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="writing-intro">{section.blurb}</p>
          <div className="articles-grid">
            {items.length === 0 ? (
              <div className="writing-scaffold">
                <div className="writing-scaffold-row">
                  <div className="article-date">YYYY-MM</div>
                  <div>
                    <div className="article-title writing-scaffold-title">
                      Title — drop in when written
                    </div>
                    <div className="article-excerpt">
                      Two-line summary. Publish via the editor with category
                      “{section.label.toLowerCase()}”.
                    </div>
                  </div>
                  <div className="article-tag">draft</div>
                </div>
                <p className="writing-section-empty">Nothing published in this section yet.</p>
              </div>
            ) : (
              items.map((p) => (
                <a
                  key={p.id}
                  className="article-row"
                  href={`#post-${p.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onViewArticle(p);
                  }}
                >
                  <div className="article-date">{formatDate(p.created_at)}</div>
                  <div>
                    <div className="article-title">{escHtml(p.title || 'Untitled')}</div>
                    {p.excerpt ? (
                      <div className="article-excerpt">{escHtml(p.excerpt)}</div>
                    ) : null}
                  </div>
                  <div className="article-tag">{escHtml(p.category || 'note')}</div>
                </a>
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Writing;
