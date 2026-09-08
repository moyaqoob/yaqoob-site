import type { FC } from 'react';
import type { Post } from '../types/post';
import { formatDate, escHtml } from '../lib/utils';

interface BlogsProps {
  posts: Post[];
  onViewArticle: (post: Post) => void;
  featured?: boolean;
  heading?: boolean;
}

const Blogs: FC<BlogsProps> = ({
  posts,
  onViewArticle,
  featured = true,
  heading = true,
}) => {
  const list = featured ? posts.slice(0, 2) : posts;

  return (
    <section id="blogs" className="block-section">
      {heading ? (
        <div>
          {featured ? <p className="kicker">Featured</p> : null}
          <h2 className="block-title">Blogs</h2>
        </div>
      ) : null}
      <div className="blog-list">
        {list.length === 0 ? (
          <p className="muted">Nothing published yet.</p>
        ) : (
          list.map((p) => (
            <button
              type="button"
              key={p.id}
              className="blog-card"
              onClick={() => onViewArticle(p)}
            >
              <h3>{escHtml(p.title || 'Untitled')}</h3>
              {p.excerpt ? <p>{escHtml(p.excerpt)}</p> : null}
              <div className="blog-meta">
                <span className="skill-chip">{escHtml(p.category || 'note')}</span>
                <span>{formatDate(p.created_at)}</span>
                <span className="text-link">Read more</span>
              </div>
            </button>
          ))
        )}
      </div>
      {featured ? (
        <a href="#/writing" className="text-link">
          Show all blogs
        </a>
      ) : null}
    </section>
  );
};

export default Blogs;
