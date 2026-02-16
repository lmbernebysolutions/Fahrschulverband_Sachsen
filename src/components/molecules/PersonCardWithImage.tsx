"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PersonCardWithImageProps {
  name: string;
  role?: string;
  fahrschule?: string;
  address?: string;
  phone?: string;
  email?: string;
  children?: React.ReactNode;
  className?: string;
  /** Bild im Hochformat links – vollständig sichtbar, keine Überdeckung */
  imagePath?: string;
}

export function PersonCardWithImage({
  name,
  role,
  fahrschule,
  address,
  phone,
  email,
  children,
  className,
  imagePath,
}: PersonCardWithImageProps) {
  return (
    <div
      className={cn(
        "group flex min-h-[180px] overflow-hidden rounded-xl border-l-4 border-l-transparent bg-white shadow-card transition-all duration-200",
        "hover:shadow-hover hover:border-l-primary-500",
        className
      )}
    >
      {/* Links: Bild volle Kartenhöhe, Hochformat – vollständig sichtbar */}
      {imagePath && (
        <div className="relative w-28 shrink-0 sm:w-32 md:w-36 self-stretch">
          <div className="relative h-full w-full">
            <Image
              src={imagePath}
              alt={name}
              fill
              className="object-contain object-left"
              sizes="(max-width: 640px) 112px, 144px"
            />
          </div>
        </div>
      )}

      {/* Rechts: Infos – Design-System-Größen, Bullet-artige Ausrichtung bei Adresse */}
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-between",
          imagePath ? "p-4 sm:p-5" : "p-5"
        )}
      >
        <div>
          {role && (
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {role}
            </p>
          )}
          <h3
            className={cn(
              "font-bold text-neutral-800 text-base",
              role ? "mt-0.5" : ""
            )}
          >
            {name}
          </h3>
          {fahrschule && (
            <p className="mt-1.5 text-sm text-neutral-700">{fahrschule}</p>
          )}
          {address && (
            <div className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0 text-sm text-neutral-600">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary-600" aria-hidden />
              <span className="break-words">{address}</span>
            </div>
          )}
        </div>
        <div className="mt-3 space-y-1.5 text-sm">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 font-medium text-primary-500 transition-colors hover:text-primary-600 hover:underline"
            >
              <Phone className="size-4 shrink-0 text-primary-600" />
              <span>{phone}</span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 font-medium text-primary-500 transition-colors hover:text-primary-600 hover:underline"
            >
              <Mail className="size-4 shrink-0 text-primary-600" />
              <span className="truncate">{email}</span>
            </a>
          )}
          {children && (
            <div className="border-t border-neutral-200 pt-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
