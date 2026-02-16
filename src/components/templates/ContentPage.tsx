import { PublicLayout } from "./PublicLayout";
import { Breadcrumb } from "@/components/molecules";

export interface ContentPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  breadcrumbItems?: { label: string; href: string }[];
}

export function ContentPage({
  title,
  subtitle,
  children,
  breadcrumbItems,
}: ContentPageProps) {
  return (
    <PublicLayout>
      <div className="bg-primary-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="mt-4 text-3xl font-bold text-primary-500">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-lg text-neutral-600">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </PublicLayout>
  );
}
