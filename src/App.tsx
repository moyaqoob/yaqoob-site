import { useState } from 'react';
import type { Post } from './types/post';
import { usePosts } from './hooks/usePosts';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Writing from './components/Writing';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import EditorModal from './components/EditorModal';
import ArticleViewModal from './components/ArticleViewModal';
import './App.css';

export default function App() {
  const { posts, published, savePost, deletePost, fetchPosts } = usePosts();
  const [authOpen, setAuthOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [articleViewPost, setArticleViewPost] = useState<Post | null>(null);
  const [editorUnlocked, setEditorUnlocked] = useState(false);

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
      <Nav onOpenEditor={handleOpenEditor} />
      <Hero />
      <Writing
        posts={published}
        onViewArticle={setArticleViewPost}
        onWriteFirst={handleOpenEditor}
      />
      <Projects />
      <About />
      <Footer />
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
