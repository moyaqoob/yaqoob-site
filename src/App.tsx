import { useEffect, useMemo, useState } from 'react';
import type { Post } from './types/post';
import { usePosts } from './hooks/usePosts';
import { STATIC_POSTS } from './content/articles';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Now from './components/Now';
import About from './components/About';
import Projects from './components/Projects';
import Writing from './components/Writing';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import EditorModal from './components/EditorModal';
import ArticleViewModal from './components/ArticleViewModal';
import './App.css';

function routeFromHash(): 'home' | 'writing' {
  const raw = window.location.hash.replace(/^#/, '');
  const path = raw.split('?')[0];
  if (
    path === '/writing' ||
    path === 'writing' ||
    path.startsWith('/writing') ||
    path.startsWith('writing-')
  ) {
    return 'writing';
  }
  return 'home';
}

export default function App() {
  const { posts, published, savePost, deletePost, fetchPosts } = usePosts();
  const allPublished = useMemo(() => {
    const ids = new Set(published.map((p) => p.id));
    const extras = STATIC_POSTS.filter((p) => !ids.has(p.id));
    return [...extras, ...published].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [published]);
  const [view, setView] = useState<'home' | 'writing'>(routeFromHash);
  const [authOpen, setAuthOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [articleViewPost, setArticleViewPost] = useState<Post | null>(null);
  const [editorUnlocked, setEditorUnlocked] = useState(false);

  useEffect(() => {
    const onHash = () => setView(routeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (view === 'writing') {
      window.scrollTo(0, 0);
    }
  }, [view]);

  const handleOpenEditor = () => {
    if (editorUnlocked) {
      setEditorOpen(true);
    } else {
      setAuthOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setEditorUnlocked(true);
    setAuthOpen(false);
    setEditorOpen(true);
  };

  return (
    <>
      <Nav onOpenEditor={handleOpenEditor} view={view} />
      <main>
        {view === 'home' ? (
          <>
            <Hero />
            <Now />
            <About />
            <Projects />
          </>
        ) : (
          <Writing
            posts={allPublished}
            onViewArticle={setArticleViewPost}
            onWriteFirst={handleOpenEditor}
          />
        )}
        <Footer />
      </main>
      <AuthModal
        open={authOpen}
        onSuccess={handleAuthSuccess}
        onClose={() => setAuthOpen(false)}
      />
      <EditorModal
        open={editorOpen}
        posts={posts}
        onClose={() => setEditorOpen(false)}
        onSave={savePost}
        onDelete={deletePost}
        onRefresh={fetchPosts}
      />
      <ArticleViewModal
        post={articleViewPost}
        onClose={() => setArticleViewPost(null)}
      />
    </>
  );
}
