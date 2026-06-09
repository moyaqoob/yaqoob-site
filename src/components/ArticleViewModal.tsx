import type { FC } from 'react';
import type { Post } from '../types/post';
import { formatDate } from '../lib/utils';

interface ArticleViewModalProps {
  post: Post | null;
  onClose: () => void;
}

const ArticleViewModal: FC<ArticleViewModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="article-view" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="article-view-label">{post.category || 'note'}</div>
        <h1>{post.title || 'Untitled'}</h1>
        <div className="article-view-meta">{formatDate(post.created_at)}</div>
        <div
          className="article-view-body"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </div>
    </div>
  );
};

export default ArticleViewModal;
