"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import LegalModal from "./LegalModal";
import type { LegalVariant } from "./legalContent";

interface LegalModalContextValue {
  openLegalModal: (variant: LegalVariant) => void;
}

const LegalModalContext = createContext<LegalModalContextValue | null>(null);

export function useLegalModal() {
  const context = useContext(LegalModalContext);
  if (!context) {
    throw new Error("useLegalModal must be used within LegalModalProvider");
  }
  return context;
}

export function LegalModalProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<LegalVariant | null>(null);
  const closeLegalModal = useCallback(() => setVariant(null), []);
  const openLegalModal = useCallback((next: LegalVariant) => setVariant(next), []);

  return (
    <LegalModalContext.Provider value={{ openLegalModal }}>
      {children}
      {variant && (
        <LegalModal variant={variant} isOpen onClose={closeLegalModal} />
      )}
    </LegalModalContext.Provider>
  );
}
