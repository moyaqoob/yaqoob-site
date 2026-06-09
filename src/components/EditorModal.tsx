import { useState, useEffect, useRef, useCallback, type FC } from 'react';
import type { Post } from '../types/post';
import { formatDate, escHtml } from '../lib/utils';
import { isSupabaseConfigured } from '../lib/supabase';
import EditorToolbar from './EditorToolbar';

interface EditorModalProps {
  open: boolean;
  posts: Post[];
  onClose: () => void;
  onSave: (post: Partial<Post> & { id?: string }) => Promise<string | null>;
  onDelete: (id: string) => Promise<void>;
  onRefresh: () => void;
}

type View = 'dashboard' | 'write';

const EditorModal: FC<EditorModalProps> = ({
  open,
  posts,
  onClose,
  onSave,
  onDelete,
  onRefresh,
}) => {
  const [view, setView] = useState<View>('dashboard');
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('tech');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saveStatus, setSaveStatus] = useState('saved');
  const contentRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (open) {
      setView('dashboard');
      setCurrentId(null);
      setTitle('');
      setExcerpt('');
      setCategory('tech');
      setStatus('draft');
      setSaveStatus('saved');
      if (contentRef.current) contentRef.current.innerHTML = '';
      onRefresh();
    }
  }, [open, onRefresh]);

  const triggerSave = useCallback(async () => {
    const content = contentRef.current?.innerHTML || '';
    if (!title.trim() && !content) return;

    setSaveStatus('saving…');
    try {
      const id = await onSave({
        id: currentId ?? undefined,
        title: title.trim(),
        excerpt: excerpt.trim(),
        category,
        status,
        content,
      });
      if (id) setCurrentId(id);
      setSaveStatus('saved');
    } catch {
      setSaveStatus('save failed');
    }
  }, [currentId, title, excerpt, category, status, onSave]);

  const debouncedSave = useCallback(() => {
    setSaveStatus('unsaved');
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(triggerSave, 2000);
  }, [triggerSave]);

  const openWriteView = (post?: Post) => {
    if (post) {
      setCurrentId(post.id);
      setTitle(post.title || '');
      setExcerpt(post.excerpt || '');
      setCategory(post.category || 'tech');
      setStatus(post.status || 'draft');
      setSaveStatus('saved');
      setView('write');
      // need to set content after render
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.innerHTML = post.content || '';
        }
      }, 0);
    } else {
      setCurrentId(null);
      setTitle('');
      setExcerpt('');
      setCategory('tech');
      setStatus('draft');
      setSaveStatus('saved');
      if (contentRef.current) contentRef.current.innerHTML = '';
      setView('write');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await onDelete(id);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div
        className="editor-modal"
        style={{ position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* ── DASHBOARD VIEW ── */}
        {view === 'dashboard' && (
          <>
            <div className="editor-topbar">
              <div className="editor-topbar-left">
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: '-0.02em',
                  }}
                >
                  My Writing
                </span>
                <span
                  className={`editor-status${isSupabaseConfigured ? ' saved' : ''}`}
                >
                  {isSupabaseConfigured ? 'connected' : 'no db configured'}
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ fontSize: 13, padding: '8px 18px' }}
                onClick={() => openWriteView()}
              >
                + New post
              </button>
            </div>
            <div className="editor-posts-list" id="posts-list">
              {posts.length === 0 ? (
                <div
                  style={{
                    padding: 40,
                    textAlign: 'center',
                    color: 'var(--ink3)',
                    fontSize: 14,
                  }}
                >
                  No posts yet. Hit "New post" to start writing.
                </div>
              ) : (
                posts.map((p) => (
                  <div key={p.id} className="editor-post-row">
                    <div>
                      <div className="editor-post-title">
                        {escHtml(p.title || 'Untitled')}
                      </div>
                      <div className="editor-post-meta">
                        {escHtml(p.category || '—')} ·{' '}
                        {p.status === 'published' ? '✓ published' : 'draft'} ·{' '}
                        {formatDate(p.created_at)}
                      </div>
                    </div>
                    <div
                      className="editor-post-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="post-action-btn"
                        onClick={() => openWriteView(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="post-action-btn danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ── WRITE VIEW ── */}
        {view === 'write' && (
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div className="editor-topbar">
              <div className="editor-topbar-left">
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: 13, padding: '7px 14px' }}
                  onClick={() => {
                    triggerSave().then(() => setView('dashboard'));
                  }}
                >
                  ← Back
                </button>
                <span className={`editor-status${saveStatus === 'saved' ? ' saved' : ''}`}>
                  {saveStatus}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    debouncedSave();
                  }}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '6px 10px',
                    background: 'var(--bg)',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="math">Mathematics</option>
                  <option value="philosophy">Philosophy</option>
                  <option value="tech">Technology</option>
                  <option value="systems">Systems</option>
                  <option value="reading">Reading</option>
                </select>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as 'draft' | 'published');
                    debouncedSave();
                  }}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '6px 10px',
                    background: 'var(--bg)',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <button
                  className="btn btn-primary"
                  style={{ fontSize: 13, padding: '8px 18px' }}
                  onClick={triggerSave}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="editor-meta">
              <input
                type="text"
                id="editor-title-input"
                placeholder="Title your thinking…"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  debouncedSave();
                }}
              />
              <div className="editor-meta-row">
                <span className="meta-field">
                  <span>excerpt:</span>
                  <input
                    type="text"
                    id="editor-excerpt"
                    placeholder="One sentence summary…"
                    style={{ width: 380, fontSize: 12 }}
                    value={excerpt}
                    onChange={(e) => {
                      setExcerpt(e.target.value);
                      debouncedSave();
                    }}
                  />
                </span>
              </div>
            </div>

            <EditorToolbar />

            <div className="editor-scroll">
              <div
                id="editor-content"
                ref={contentRef}
                contentEditable
                data-placeholder="Start writing. Ideas, proofs, observations, questions — whatever the thinking demands…"
                onInput={debouncedSave}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    document.execCommand(
                      'insertHTML',
                      false,
                      '&nbsp;&nbsp;&nbsp;&nbsp;'
                    );
                  }
                  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                    e.preventDefault();
                    triggerSave();
                  }
                }}
                suppressContentEditableWarning
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorModal;
