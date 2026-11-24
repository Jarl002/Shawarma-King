"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type CartItem = {
  productId: string;
  name: string;
  choices: string[];
  unitPrice: number;
  quantity: number;
};

export type Order = {
  number: number;
  readyAt: number;
  method: "Afhentning" | "Levering";
  items: CartItem[];
  totalInOre: number;
  cutlery: boolean;
  note: string;
};

export function itemKey(item: CartItem) {
  return JSON.stringify([item.productId, item.choices, item.unitPrice]);
}

function useCartState() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [cutlery, setCutlery] = useState(false);
  const [note, setNote] = useState("");

  function addItem(item: CartItem) {
    setItems((current) => {
      const existing = current.find((line) => itemKey(line) === itemKey(item));
      if (!existing) return [...current, item];

      return current.map((line) => line === existing
        ? { ...line, quantity: line.quantity + item.quantity }
        : line);
    });
  }

  function changeQuantity(key: string, delta: number) {
    setItems((current) => current
      .map((line) => itemKey(line) === key
        ? { ...line, quantity: line.quantity + delta }
        : line)
      .filter((line) => line.quantity > 0));
  }

  function placeOrder(method: Order["method"], minutes: number, totalInOre: number) {
    // Gem et øjebliksbillede, så senere kurvændringer ikke ændrer bestillingen.
    setOrder({
      number: Math.floor(Math.random() * 900) + 100,
      readyAt: Date.now() + minutes * 60_000,
      method,
      totalInOre,
      items: items.map((item) => ({ ...item, choices: [...item.choices] })),
      cutlery,
      note,
    });
    clearCart();
  }

  function clearCart() {
    setItems([]);
    setCutlery(false);
    setNote("");
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return { items, count, total, addItem, changeQuantity, clearCart, order, placeOrder, cutlery, setCutlery, note, setNote };
}

const CartContext = createContext<ReturnType<typeof useCartState> | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCartState();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart kræver CartProvider.");
  return cart;
}
