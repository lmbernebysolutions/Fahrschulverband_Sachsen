"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PersonCardProps {
  name: string;
  role?: string;
  fahrschule?: string;
  address?: string;
  phone?: string;
  email?: string;
  variant?: "compact" | "full";
  children?: React.ReactNode;
  className?: string;
  /** Optional background image – rendered with dark overlay for contrast */
  imagePath?: string;
}

export function PersonCard({
  name,
  role,
  fahrschule,
  address,
  phone,
  email,
  variant = "full",
  children,
  className,
  imagePath,
}: PersonCardProps) {
  const hasImage = Boolean(imagePath);

  return (
    <div
      className={cn(
        "group relative min-h-[200px] overflow-hidden rounded-xl shadow-card transition-all duration-200",
        "hover:shadow-hover hover:border-l-4 hover:border-l-primary-500 border-l-4 border-l-transparent",
        !hasImage && "bg-gradient-to-br from-white to-neutral-50",
        variant === "compact" ? "p-4" : "p-6",
        className
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
          {/* Kontrast-Overlay: dunkel für gute Lesbarkeit */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/75"
            aria-hidden
          />
        </>
      )}
      <div className={cn("relative z-10", hasImage && "text-white")}>
        {role && (
          <p
            className={cn(
              "text-sm font-semibold uppercase tracking-wider",
              hasImage ? "text-white/90" : "text-primary-600"
            )}
          >
            {role}
          </p>
        )}
        <h3
          className={cn(
            "font-bold",
            hasImage ? "text-white" : "text-neutral-800",
            role ? "mt-1 text-xl" : "text-lg"
          )}
        >
          {name}
        </h3>
        {fahrschule && (
          <p className={cn("mt-2", hasImage ? "text-white/90" : "text-neutral-700")}>
            {fahrschule}
          </p>
        )}
        {address && (
          <p className={cn("mt-1 flex items-start gap-2", hasImage ? "text-white/90" : "text-neutral-600")}>
            <MapPin className={cn("mt-0.5 size-4 shrink-0", hasImage ? "text-white" : "text-primary-600")} />
            <span>{address}</span>
          </p>
        )}
        <div className="mt-4 space-y-2">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={cn(
                "flex items-center gap-2 font-medium transition-colors hover:underline",
                hasImage ? "text-white hover:text-white/90" : "text-primary-500 hover:text-primary-600"
              )}
            >
              <Phone className={cn("size-5 shrink-0", hasImage ? "text-white" : "text-primary-600")} />
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className={cn(
                "flex items-center gap-2 font-medium transition-colors hover:underline",
                hasImage ? "text-white hover:text-white/90" : "text-primary-500 hover:text-primary-600"
              )}
            >
              <Mail className={cn("size-5 shrink-0", hasImage ? "text-white" : "text-primary-600")} />
              {email}
            </a>
          )}
        </div>
        {children && (
          <div
            className={cn(
              "mt-4 border-t pt-4",
              hasImage
                ? "border-white/30 [&_p]:text-white/90 [&_li]:text-white/90"
                : "border-neutral-200"
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
