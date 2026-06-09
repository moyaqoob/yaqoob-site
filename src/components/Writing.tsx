import type { FC } from 'react';
import type { Post } from '../types/post';
import { formatDate, escHtml } from '../lib/utils';

interface WritingProps {
  posts: Post[];
  onViewArticle: (post: Post) => void;
  onWriteFirst: () => void;
}

const Writing: FC<WritingProps> = ({ posts, onViewArticle, onWriteFirst }) => {
  return (
    <section id="writing" style={{ paddingTop: 80 }}>
      <div className="section-header">
        <div>
          <div className="section-label">Writing</div>
          <h2 className="section-title">Articles & Notes</h2>
        </div>
        <span
          style={{
            fontSize: 13,
            color: 'var(--ink3)',
            fontFamily: 'var(--mono)',
          }}
        >
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="articles-grid" id="articles-grid">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No articles published yet. Open the editor to write your first one.</p>
            <a
              href="#"
              className="btn btn-ghost"
              style={{ fontSize: 13, padding: '9px 18px' }}
              onClick={(e) => {
                e.preventDefault();
                onWriteFirst();
              }}
            >
              Write something →
            </a>
          </div>
        ) : (
          posts.map((p) => (
            <a
              key={p.id}
              className="article-row"
              href="#"
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
  );
};

export default Writing;
