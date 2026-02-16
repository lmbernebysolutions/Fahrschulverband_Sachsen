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
        "bg-primary-500 py-12 text-white sm:py-16 lg:py-20",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold sm:text-2xl">{headline}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base opacity-90 sm:mt-4 sm:text-lg">{text}</p>
        <Link
          href="/der-verband/mitgliedschaft"
          className="mt-6 inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 transition-colors hover:bg-neutral-100 sm:mt-8 sm:px-8 sm:py-3.5 sm:text-lg"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
