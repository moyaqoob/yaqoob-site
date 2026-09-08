import { useEffect, useMemo, useState } from 'react';
import type { Post } from './types/post';
import { usePosts } from './hooks/usePosts';
import { STATIC_POSTS } from './content/articles';
import { routeFromHash, type View } from './lib/routes';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Experience from './components/Experience';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blogs from './components/Blogs';
import TalkCta from './components/TalkCta';
import Explore from './components/Explore';
import Footer from './components/Footer';
import { WorkPage, ProjectsPage, WritingPage } from './components/Pages';
import AuthModal from './components/AuthModal';
import EditorModal from './components/EditorModal';
import ArticleViewModal from './components/ArticleViewModal';
import './App.css';

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
  const [view, setView] = useState<View>(routeFromHash);
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
    if (view !== 'home') window.scrollTo(0, 0);
  }, [view]);

  const handleOpenEditor = () => {
    if (editorUnlocked) setEditorOpen(true);
    else setAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setEditorUnlocked(true);
    setAuthOpen(false);
    setEditorOpen(true);
  };

  return (
    <>
      <Nav onOpenEditor={handleOpenEditor} view={view} />
      <main id="main-content" className="site-main">
        {view === 'home' ? (
          <div className="page-enter">
            <Hero />
            <Experience />
            <Projects />
            <About />
            <Skills />
            <Blogs posts={allPublished} onViewArticle={setArticleViewPost} />
            <TalkCta />
            <Explore />
          </div>
        ) : null}
        {view === 'work' ? <WorkPage /> : null}
        {view === 'projects' ? <ProjectsPage /> : null}
        {view === 'writing' ? (
          <WritingPage
            posts={allPublished}
            onViewArticle={setArticleViewPost}
            onWriteFirst={handleOpenEditor}
          />
        ) : null}
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
