"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LEGAL_DOCUMENTS, type LegalVariant } from "./legalContent";

interface LegalModalProps {
  variant: LegalVariant;
  isOpen: boolean;
  onClose: () => void;
}

function DocumentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function CookieIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="13.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PrivacyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const VARIANT_ICONS = {
  terms: DocumentIcon,
  cookies: CookieIcon,
  privacy: PrivacyIcon,
} as const;

export default function LegalModal({ variant, isOpen, onClose }: LegalModalProps) {
  const [mounted, setMounted] = useState(false);
  const doc = LEGAL_DOCUMENTS[variant];
  const Icon = VARIANT_ICONS[variant];
  const titleId = `legal-modal-title-${variant}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="legal-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="legal-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="legal-modal-header">
          <div className="legal-modal-header-left">
            <div className="legal-modal-icon">
              <Icon />
            </div>
            <div>
              <h2 id={titleId} className="legal-modal-title">
                {doc.title}
              </h2>
              <p className="legal-modal-updated">Last Updated: {doc.lastUpdated}</p>
            </div>
          </div>
          <button type="button" className="legal-modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="legal-modal-body">
          {doc.sections.map((section, idx) => (
            <section key={section.title} className="legal-modal-section">
              <h3 className="legal-modal-section-title">
                {idx + 1}. {section.title}
              </h3>
              <p className="legal-modal-section-body">{section.body}</p>
            </section>
          ))}
        </div>

        <footer className="legal-modal-footer">
          <p className="legal-modal-footer-note">
            By using this website, you agree to our terms.
          </p>
          <button type="button" className="legal-modal-accept poi-btn" onClick={onClose}>
            I Understand
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
