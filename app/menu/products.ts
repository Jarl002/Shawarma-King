export const products = [
  {
    id: "durum-rulle",
    name: "Durum rulle",
    description: "Valgfrit protein, iceberg, løg, rødkål, tomat og cremefraiche",
    price: 110,
    category: "Durum",
    image: "/durum-rulle.webp",
    popular: true,
  },
  {
    id: "pitabroed",
    name: "Pitabrød (hjemmebagt)",
    description: "Valgfrit protein, iceberg, løg, rødkål, tomat og cremefraiche",
    price: 99,
    category: "Pita",
    image: "/shawarma-pita.webp",
  },
  {
    id: "kebabmix",
    name: "Kebabmix",
    description: "Valgfrit protein med salat og cremefraiche",
    price: 155,
    category: "Kebabmix",
    image: "/kebabmix.webp",
  },
] as const;

export const ingredients = ["Iceberg", "Løg", "Tomat", "Rødkål", "Jalapeños"] as const;
export const sauces = ["Cremefraiche", "Dressing", "Chili", "Hvidløg"] as const;
export const defaultIngredients: readonly (typeof ingredients)[number][] = ["Iceberg", "Løg", "Tomat", "Rødkål"];
export const defaultSauces: readonly (typeof sauces)[number][] = ["Cremefraiche"];
export const proteins = ["Oksekød", "Lam", "Kylling", "Falafel"] as const;

export const drinks = [
  { id: "cola", name: "Coca-Cola", price: 30 },
  { id: "cola-zero", name: "Coca-Cola Zero", price: 30 },
  { id: "pepsi-max", name: "Pepsi Max", price: 30 },
  { id: "faxe-kondi", name: "Faxe Kondi", price: 30 },
  { id: "fanta", name: "Fanta Orange", price: 30 },
  { id: "gazoz", name: "Gazoz", price: 30 },
  { id: "ayran", name: "Ayran", price: 25 },
] as const;

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  popular?: boolean;
  customizable?: boolean;
};

export const catalog: readonly Product[] = [
  ...products.map((product) => ({ ...product, customizable: true })),
  {
    id: "tyrkisk-broed",
    name: "Tyrkisk brød Flutes",
    price: 125,
    category: "Tyrkisk brød",
    customizable: true,
  },
  { id: "lille-pommes", name: "Lille pommes frites", price: 65, category: "Snacks" },
  { id: "stor-pommes", name: "Stor pommes frites", price: 85, category: "Snacks" },
  { id: "falafel-snack", name: "Falafel snack", price: 65, category: "Snacks" },
  { id: "ketchup", name: "Ketchup", price: 10, category: "Dyppelse" },
  { id: "remoulade", name: "Remoulade", price: 10, category: "Dyppelse" },
  { id: "pommes-sauce", name: "Pommes frites-sauce", price: 10, category: "Dyppelse" },
  ...drinks.map((drink) => ({ ...drink, category: "Drikkevarer" })),
  { id: "servietter", name: "Servietter", price: 0, category: "Engangsservice" },
];

export function getProduct(id: string) {
  return catalog.find((product) => product.id === id);
}
