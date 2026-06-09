-- Run this in your Supabase SQL editor to set up the database.

create table posts (
  id uuid default gen_random_uuid() primary key,
  title text,
  excerpt text,
  category text,
  status text default 'draft',
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table posts enable row level security;

-- Allow anyone (anon) to read published posts
create policy "anon read published"
  on posts for select
  to anon
  using (status = 'published');

-- Allow anon full access for the editor (auth is client-side passphrase)
create policy "anon all"
  on posts for all
  to anon
  using (true)
  with check (true);
