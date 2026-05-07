-- Contact form submissions table
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  created_at timestamptz default now(),
  read boolean default false
);

-- Row-level security
alter table contact_submissions enable row level security;

-- Only allow inserts from anonymous (public form)
create policy "Allow public inserts" on contact_submissions
  for insert with check (true);

-- Only the authenticated owner can read
create policy "Allow auth reads" on contact_submissions
  for select using (auth.role() = 'authenticated');
