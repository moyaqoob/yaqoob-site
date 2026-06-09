-- Run this in your Supabase SQL editor AFTER the initial schema.
-- It adds the missing anon policy so the editor can actually write.

-- Drop the old service-role policy (not usable from frontend)
drop policy if exists "service write" on posts;

-- Allow anon role full access (auth is client-side passphrase)
create policy "anon all"
  on posts for all
  to anon
  using (true)
  with check (true);
