"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { readWishlistIds, writeWishlistIds } from "../../lib/wishlistStorage";

interface WishlistContextValue {
  ids: number[];
  loaded: boolean;
  add: (id: number) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  has: (id: number) => boolean;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setIds(readWishlistIds());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeWishlistIds(ids);
  }, [ids, loaded]);

  const add = useCallback((id: number) => {
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const remove = useCallback((id: number) => {
    setIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const toggle = useCallback((id: number) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const has = useCallback((id: number) => ids.includes(id), [ids]);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({ ids, loaded, add, remove, toggle, has, clear }),
    [ids, loaded, add, remove, toggle, has, clear]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return ctx;
}
