import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VISTARA STUDIOS | Premium Media Production Agency",
  description: "VISTARA STUDIOS is an award-winning creative agency crafting high-end cinematic showreels, global commercial campaigns, narratives, and digital visual experiences.",
  keywords: [
    "Vistara Studios",
    "media production agency",
    "cinematography",
    "creative studio",
    "commercial production",
    "video marketing",
    "direction",
    "post production",
    "showreel portfolio"
  ],
  authors: [{ name: "VISTARA STUDIOS", url: "https://vistarastudios.com" }],
  openGraph: {
    title: "VISTARA STUDIOS | Premium Media Production Agency",
    description: "Crafting cinematic stories and elevating global brands with high-fidelity visual production.",
    url: "https://vistarastudios.com",
    siteName: "Vistara Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VISTARA STUDIOS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VISTARA STUDIOS | Premium Media Production Agency",
    description: "Crafting cinematic stories and elevating global brands with high-fidelity visual production.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <body className="antialiased min-h-screen">
        <div className="noise-overlay" />
        <Providers>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
