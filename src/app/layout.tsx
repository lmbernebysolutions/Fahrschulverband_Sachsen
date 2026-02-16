import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { SiteDataProvider } from "@/context/SiteDataContext";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Landesverband Sächsischer Fahrlehrer e.V.",
    template: "%s | LSF e.V.",
  },
  description:
    "Ihr Interessenverband für Fahrschulen und Fahrlehrer in Sachsen. Fortbildungen, Fahrschulsuche und aktuelle Brancheninformationen.",
  metadataBase: new URL("https://www.fahrlehrerverband-sachsen.de"),
  openGraph: {
    title: "Landesverband Sächsischer Fahrlehrer e.V.",
    description:
      "Ihr Interessenverband für Fahrschulen und Fahrlehrer in Sachsen.",
    locale: "de_DE",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${openSans.variable} font-sans antialiased`}>
        <SiteDataProvider>{children}</SiteDataProvider>
      </body>
    </html>
  );
}
