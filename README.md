# Setia — website

A React + TypeScript storefront for Setia, a modest-fashion label. The site uses a monochrome editorial design system, React Router, WhatsApp ordering, and Supabase-powered product management.

## Pages

- `/` — Home with hero, featured Supabase products, and custom-order invitation.
- `/shop` — Full published collection with category filters, search, sorting, quick view, and WhatsApp actions.
- `/shop/:productId` — Individual published product pages.
- `/custom-order` — Single and bulk custom-order information.
- `/our-story` — Founder story with the owner portrait.
- `/admin/login` — Private owner login.
- `/admin/products` — Protected owner upload form.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add the project URL and publishable key to `.env.local`.
4. Create a public Storage bucket called `product-images`.
5. Run `supabase/schema.sql` in the Supabase SQL Editor.
6. Create the owner in Supabase Authentication → Users.
7. Copy the owner user UUID and run the final `insert into public.admins` statement in `supabase/schema.sql`.
8. Restart the Vite server after changing `.env.local`.

The owner can then visit `/admin/login`, sign in, upload an outfit, and publish it. Published products appear on `/shop` and have detail URLs based on their generated slug.

## Running locally

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Important files

- Supabase client: `src/lib/supabase.ts`
- Product query hook: `src/hooks/useProducts.ts`
- Owner login: `src/pages/AdminLoginPage.tsx`
- Owner upload dashboard: `src/pages/AdminProductsPage.tsx`
- Protected admin route: `src/components/ProtectedRoute.tsx`
- Database and Storage policies: `supabase/schema.sql`
- WhatsApp number and social links: `src/config.ts`
- Owner portrait: `public/owner-portrait.jpeg`
