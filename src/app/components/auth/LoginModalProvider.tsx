"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import LoginModal from "./LoginModal";

interface User {
  name: string;
  email: string;
  initial: string;
  profilePhoto?: string | null;
}

interface LoginModalContextValue {
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const LoginModalContext = createContext<LoginModalContextValue | null>(null);

export function useLoginModal() {
  const ctx = useContext(LoginModalContext);
  if (!ctx) {
    throw new Error("useLoginModal must be used within LoginModalProvider");
  }
  return ctx;
}

export function LoginModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const openLoginModal = useCallback(() => setOpen(true), []);
  const closeLoginModal = useCallback(() => setOpen(false), []);
  
  const login = useCallback((userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    setOpen(false);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => prev ? { ...prev, ...data } : null);
  }, []);

  return (
    <LoginModalContext.Provider value={{ openLoginModal, closeLoginModal, isLoggedIn, user, login, logout, updateUser }}>
      {children}
      <LoginModal isOpen={open} onClose={closeLoginModal} />
    </LoginModalContext.Provider>
  );
}
