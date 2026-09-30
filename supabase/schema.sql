-- Setia Supabase setup
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price text not null,
  description text not null,
  category text not null,
  sizes text not null,
  image_url text,
  in_stock boolean not null default true,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.products enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

drop policy if exists "Anyone can view published products" on public.products;
create policy "Anyone can view published products" on public.products for select to anon, authenticated using (published = true or public.is_admin());

drop policy if exists "Admins can create products" on public.products;
create policy "Admins can create products" on public.products for insert to authenticated with check (public.is_admin());

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products" on public.products for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products" on public.products for delete to authenticated using (public.is_admin());

-- Create a public bucket named product-images in Dashboard > Storage first.
drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_admin()) with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());

-- After creating the owner in Authentication > Users, run:
-- insert into public.admins (user_id) values ('OWNER_USER_UUID') on conflict do nothing;
