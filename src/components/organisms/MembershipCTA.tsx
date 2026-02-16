"use client";

import Link from "next/link";
import { siteContent } from "@/lib/siteContent";
import { useSiteData } from "@/context/SiteDataContext";
import { cn } from "@/lib/utils";

export interface MembershipCTAProps {
  className?: string;
}

export function MembershipCTA({ className }: MembershipCTAProps) {
  const { footerContent } = useSiteData();
  const { headline, text, buttonText } = footerContent?.membershipCta ?? siteContent.footer.membershipCta;

  return (
    <section
      className={cn(
        "bg-primary-500 py-20 text-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">{headline}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">{text}</p>
        <Link
          href="/der-verband/mitgliedschaft"
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-md bg-white px-8 py-3.5 text-lg font-semibold text-primary-600 transition-colors hover:bg-neutral-100"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
