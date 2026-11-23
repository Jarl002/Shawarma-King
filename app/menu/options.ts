// Choices for customizable dishes. The menu itself (products, prices, drinks) comes from Supabase – see data.ts.

export const ingredients = ["Iceberg", "Løg", "Tomat", "Rødkål", "Jalapeños"] as const;
export const sauces = ["Cremefraiche", "Dressing", "Chili", "Hvidløg"] as const;
export const defaultIngredients: readonly (typeof ingredients)[number][] = ["Iceberg", "Løg", "Tomat", "Rødkål"];
export const defaultSauces: readonly (typeof sauces)[number][] = ["Cremefraiche"];
export const proteins = ["Oksekød", "Lam", "Kylling", "Falafel"] as const;
