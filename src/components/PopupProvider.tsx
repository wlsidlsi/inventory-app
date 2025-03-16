"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { usePopup, PopupContent } from "@/hooks/PopupView";

interface PopupContextType {
  showPopup: (content: PopupContent) => void;
  closePopup: () => void;
  popupElement: ReactNode;
}

const PopupContext = createContext<PopupContextType | null>(null);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const { showPopup, closePopup, popupElement } = usePopup(); // Use the custom hook
  return (
    <PopupContext.Provider value={{ showPopup, closePopup, popupElement }}>
      {children}
      {popupElement}
    </PopupContext.Provider>
  );
};

// Custom Hook to Access Popup Anywhere
export function usePopupContext() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("useIndexedDB must be used within an IndexedDBProvider");
  }
  return context;
}
