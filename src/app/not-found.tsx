import Link from "next/link";
import { PublicLayout } from "@/components/templates/PublicLayout";

export default function NotFound() {
  return (
    <PublicLayout>
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-white py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-4xl font-bold text-primary-500">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-neutral-800">
            Seite nicht gefunden
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Die angeforderte Seite existiert nicht oder wurde verschoben.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-md bg-primary-500 px-8 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-primary-600"
          >
            Zur Startseite
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
