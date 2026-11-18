"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type CartItem = {
  productId: string;
  name: string;
  choices: string[];
  unitPrice: number;
  quantity: number;
};

export function itemKey(item: CartItem) {
  return JSON.stringify([item.productId, item.choices, item.unitPrice]);
}

function useCartState() {
  const [items, setItems] = useState<CartItem[]>([]);

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

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return { items, count, total, addItem, changeQuantity, clearCart };
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
