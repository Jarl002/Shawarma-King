import { cacheLife } from "next/cache";

// Runs on the server only. The keys are not prefixed with NEXT_PUBLIC_,
// so they are never included in the JavaScript sent to the browser.
// Data comes from Supabase's REST API (PostgREST); Row Level Security only allows reading.

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image: string | null;
  banner: string | null; // wide photo for the product page; falls back to image
  featured: boolean;
  popular: boolean;
  customizable: boolean;
};

export async function getCatalog(): Promise<Product[]> {
  "use cache";
  // The menu rarely changes, so it is cached for a few minutes instead of fetched on every visit.
  cacheLife("minutes");

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured: set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in .env.local");
  }

  // select=* so optional columns (like banner) can be added in Supabase without breaking older deployments.
  const response = await fetch(`${url}/rest/v1/products?select=*&order=sort_order`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!response.ok) {
    throw new Error(`Could not load the menu from Supabase (HTTP ${response.status})`);
  }
  const rows: (Omit<Product, "banner"> & { banner?: string | null })[] = await response.json();
  return rows.map(({ id, name, description, price, category, image, banner, featured, popular, customizable }) => ({
    id, name, description, price, category, image, banner: banner ?? null, featured, popular, customizable,
  }));
}

export async function getProduct(id: string) {
  const catalog = await getCatalog();
  return catalog.find((product) => product.id === id);
}

// 09 Travlt / Pause: the restaurant can stop new orders by setting paused = true in Supabase.
// If the status cannot be read (e.g. the table does not exist yet), ordering stays open.
export async function isOrderingPaused(): Promise<boolean> {
  "use cache";
  cacheLife("seconds");

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return false;

  try {
    const response = await fetch(`${url}/rest/v1/restaurant_status?select=paused&id=eq.1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!response.ok) return false;
    const rows: { paused: boolean }[] = await response.json();
    return rows[0]?.paused ?? false;
  } catch {
    return false;
  }
}

