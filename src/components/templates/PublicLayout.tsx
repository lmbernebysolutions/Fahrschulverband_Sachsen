import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { BackToTop } from "@/components/organisms/BackToTop";

export interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-visible">
      <a href="#main-content" className="skip-link">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main-content" className="min-h-0 min-w-0 flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
