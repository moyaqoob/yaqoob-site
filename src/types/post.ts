export interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  status: 'draft' | 'published';
  content: string;
  created_at: string;
  updated_at: string;
}
