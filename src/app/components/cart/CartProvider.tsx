"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  readCartLines,
  writeCartLines,
  type CartLine,
} from "../../lib/cartStorage";

interface CartContextValue {
  lines: CartLine[];
  loaded: boolean;
  itemCount: number;
  add: (productId: number, quantity?: number) => void;
  remove: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLines(readCartLines());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeCartLines(lines);
  }, [lines, loaded]);

  const add = useCallback((productId: number, quantity = 1) => {
    const qty = Math.max(1, quantity);
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: l.quantity + qty }
            : l
        );
      }
      return [...prev, { productId, quantity: qty }];
    });
  }, []);

  const remove = useCallback((productId: number) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.productId !== productId));
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId ? { ...l, quantity } : l
      )
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({ lines, loaded, itemCount, add, remove, setQuantity, clear }),
    [lines, loaded, itemCount, add, remove, setQuantity, clear]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
