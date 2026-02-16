"use client";

import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface ServiceTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  /** Optional background image – rendered with dark overlay for contrast */
  imagePath?: string;
}

export function ServiceTile({
  icon,
  title,
  description,
  href,
  imagePath,
}: ServiceTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-100 p-8 text-center",
        "cursor-pointer transition-all duration-200",
        "border-l-4 border-l-transparent hover:-translate-y-0.5 hover:shadow-hover hover:border-l-primary-500",
        imagePath ? "shadow-card" : "bg-white shadow-card"
      )}
    >
      {imagePath && (
        <>
          <Image
            src={imagePath}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Kontrast-Overlay: dunkel für gute Lesbarkeit von weißem Text */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/75"
            aria-hidden
          />
        </>
      )}
      <div className={cn("relative z-10", imagePath && "text-white")}>
        <Icon
          icon={icon}
          size="lg"
          className={cn(
            "mb-4",
            imagePath ? "text-white" : "text-primary-500"
          )}
          aria-hidden
        />
        <h4
          className={cn(
            "text-lg font-semibold",
            imagePath ? "text-white" : "text-neutral-800"
          )}
        >
          {title}
        </h4>
        <p
          className={cn(
            "mt-2 text-base",
            imagePath ? "text-white/90" : "text-neutral-500"
          )}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
