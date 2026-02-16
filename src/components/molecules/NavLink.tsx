"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "min-h-[48px] min-w-[48px] py-3 px-4 text-lg font-medium transition-colors duration-200",
        "hover:bg-primary-50 hover:text-primary-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        isActive
          ? "text-primary-500 border-b-2 border-primary-500"
          : "text-neutral-700",
        className
      )}
    >
      {children}
    </Link>
  );
}
