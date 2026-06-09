import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types/post';
import { sb } from '../lib/supabase';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!sb) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await sb
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const published = posts.filter((p) => p.status === 'published');

  const savePost = async (post: Partial<Post> & { id?: string }) => {
    if (!sb) return null;
    const now = new Date().toISOString();
    const payload = { ...post, updated_at: now };

    if (post.id) {
      const { error } = await sb.from('posts').update(payload).eq('id', post.id);
      if (error) throw error;
      await fetchPosts();
      return post.id;
    } else {
      const { data, error } = await sb
        .from('posts')
        .insert({ ...payload, created_at: now })
        .select()
        .single();
      if (error) throw error;
      await fetchPosts();
      return data?.id ?? null;
    }
  };

  const deletePost = async (id: string) => {
    if (!sb) return;
    await sb.from('posts').delete().eq('id', id);
    await fetchPosts();
  };

  return { posts, published, loading, error, fetchPosts, savePost, deletePost };
}
