"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      className={cn(
        "fixed z-30 flex size-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-all duration-200 hover:bg-primary-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 [bottom:max(1.5rem,env(safe-area-inset-bottom))] [right:max(1.5rem,env(safe-area-inset-right))]",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <ArrowUp className="size-6" aria-hidden />
    </button>
  );
}
