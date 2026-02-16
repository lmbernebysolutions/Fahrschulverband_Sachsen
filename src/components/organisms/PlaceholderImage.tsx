"use client";

import Image from "next/image";
import {
  Building2,
  Accessibility,
  FileCheck,
  Heart,
  AlertTriangle,
  Truck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/context/SiteDataContext";
import type { ImageSlotId, PlaceholderIconName } from "@/lib/imageUsage";

const ICON_MAP: Record<PlaceholderIconName, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Building2,
  Accessibility,
  FileCheck,
  Heart,
  AlertTriangle,
  Truck,
  Users,
};

export interface PlaceholderImageProps {
  slotId?: ImageSlotId;
  width?: number;
  height?: number;
  label: string;
  iconName: PlaceholderIconName;
  className?: string;
}

export function PlaceholderImage({
  slotId,
  width,
  height,
  label,
  iconName,
  className,
}: PlaceholderImageProps) {
  const { settings } = useSiteData();
  const assignment = slotId && settings.imageAssignments?.[slotId];
  const IconComponent = ICON_MAP[iconName];

  if (assignment?.imagePath) {
    return (
      <div
        className={cn("relative overflow-hidden rounded-2xl min-w-0 aspect-[4/3]", className)}
        style={
          width != null && height != null
            ? { width: `${width}px`, height: `${height}px` }
            : undefined
        }
      >
        <Image
          src={assignment.imagePath}
          alt={label}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl bg-primary-50 min-w-0",
        className
      )}
      style={
        width != null && height != null
          ? { width: `${width}px`, height: `${height}px` }
          : undefined
      }
    >
      {IconComponent && (
        <IconComponent
          className="size-8 shrink-0 text-primary-400"
          aria-hidden
        />
      )}
      <span className="mt-2 text-sm font-medium text-primary-600">{label}</span>
    </div>
  );
}
