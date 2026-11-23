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
  featured: boolean;
  popular: boolean;
  customizable: boolean;
};

const columns = "id,name,description,price,category,image,featured,popular,customizable";

export async function getCatalog(): Promise<Product[]> {
  "use cache";
  // The menu rarely changes, so it is cached for a few minutes instead of fetched on every visit.
  cacheLife("minutes");

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured: set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in .env.local");
  }

  const response = await fetch(`${url}/rest/v1/products?select=${columns}&order=sort_order`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!response.ok) {
    throw new Error(`Could not load the menu from Supabase (HTTP ${response.status})`);
  }
  return response.json();
}

export async function getProduct(id: string) {
  const catalog = await getCatalog();
  return catalog.find((product) => product.id === id);
}
