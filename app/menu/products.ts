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
