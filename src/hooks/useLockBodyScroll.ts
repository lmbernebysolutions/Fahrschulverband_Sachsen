"use client";

import { useEffect } from "react";

/**
 * Sperrt den Hintergrund-Scroll (body), solange ein Modal/Drawer offen ist.
 * Nur der Modal-Inhalt soll scrollbar sein.
 */
export function useLockBodyScroll(lock: boolean): void {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lock]);
}
