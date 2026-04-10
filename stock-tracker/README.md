# iPhone Store — Stock Tracker

Real-time iPhone stock tracker built with Next.js 14, Supabase, TanStack Table, and Tailwind CSS.

## Supabase Setup

### 1. Create the `stock` table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create the stock table
CREATE TABLE stock (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model text NOT NULL,
  storage text NOT NULL,
  color text NOT NULL,
  condition text NOT NULL CHECK (condition IN ('Nuevo', 'Reacondicionado')),
  price numeric NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stock_updated_at
  BEFORE UPDATE ON stock
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access"
  ON stock FOR SELECT
  USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated insert"
  ON stock FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update
CREATE POLICY "Authenticated update"
  ON stock FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Authenticated users can delete
CREATE POLICY "Authenticated delete"
  ON stock FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 2. Enable Realtime

In your Supabase Dashboard:
1. Go to **Database → Replication**
2. Under "Supabase Realtime", click the toggle for the `stock` table
3. Or run:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE stock;
```

### 3. Create an admin user

Go to **Authentication → Users** in the Supabase Dashboard and click "Add User" to create a user with email + password. This user will be able to log in at `/admin/login`.

### 4. Seed data (optional)

```sql
INSERT INTO stock (model, storage, color, condition, price, quantity) VALUES
  ('iPhone 15 Pro Max', '256GB', 'Natural Titanium', 'Nuevo', 1899000, 5),
  ('iPhone 15 Pro Max', '512GB', 'Blue Titanium', 'Nuevo', 2199000, 3),
  ('iPhone 15 Pro', '128GB', 'Black Titanium', 'Nuevo', 1599000, 8),
  ('iPhone 15 Pro', '256GB', 'White Titanium', 'Reacondicionado', 1399000, 2),
  ('iPhone 15', '128GB', 'Blue', 'Nuevo', 1199000, 0),
  ('iPhone 14', '128GB', 'Midnight', 'Reacondicionado', 899000, 1);
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Get these from your Supabase project: **Settings → API**.

## Getting Started

```bash
npm install
npm run dev
```

- Public stock view: [http://localhost:3000](http://localhost:3000)
- Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin) (requires authentication)

## Features

- **Real-time sync** — stock updates instantly via Supabase Realtime
- **Sortable columns** — click any column header to sort
- **Low stock alerts** — amber highlight for quantity ≤ 2
- **Out of stock** — red highlight + "Sin stock" label for quantity = 0
- **Admin CRUD** — inline editing, add/delete rows (authenticated only)
- **Mobile responsive** — works on all screen sizes
