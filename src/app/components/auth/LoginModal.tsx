"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import styles from "./loginModal.module.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close login"
        >
          <X size={18} />
        </button>

        <header className={styles.header}>
          <ProfileAvatar initial="E" />
          <h2 id="login-modal-title" className={styles.title}>
            Welcome Back
          </h2>
          <p className={styles.subtitle}>Sign in to your account</p>
        </header>

        <button type="button" className={styles.googleBtn}>
          <GoogleIcon />
          Sign in with Google
        </button>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>or continue with email</span>
          <span className={styles.dividerLine} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="login-email">
              Email Address
            </label>
            <div className={styles.inputWrap}>
              <Mail className={styles.inputIcon} size={17} strokeWidth={1.75} />
              <input
                id="login-email"
                type="email"
                className={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="login-password">
              Password
            </label>
            <div className={styles.inputWrap}>
              <Lock className={styles.inputIcon} size={17} strokeWidth={1.75} />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={17} strokeWidth={1.75} />
                ) : (
                  <Eye size={17} strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>

          <label className={styles.remember}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me for 30 days
          </label>

          <button type="submit" className={`poi-btn ${styles.signInBtn}`}>
            Sign In
          </button>
        </form>

        <footer className={styles.footer}>
          <p className={styles.signUpText}>
            Don&apos;t have an account?{" "}
            <button type="button" className={styles.signUpLink}>
              Sign Up
            </button>
          </p>
          <button type="button" className={styles.forgotLink}>
            Forgot your password?
          </button>
          <p className={styles.secureNote}>
            Secure authentication powered by Google &amp; Facebook
          </p>
        </footer>
      </div>
    </div>,
    document.body
  );
}
