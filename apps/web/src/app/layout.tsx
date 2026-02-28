import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Body } from "@/containers";
import { Suspense } from "react";
import { GlobalLoader } from "@/components/common";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ImpactBridge - ONG Éducation & Actions",
  description:
    "ImpactBridge est une ONG dédiée à l'éducation et aux initiatives sociales. Découvrez nos projets et soutenez nos actions.",
  keywords:
    "ONG, ImpactBridge, éducation, initiatives sociales, actions communautaires, bénévolat",
  openGraph: {
    title: "ImpactBridge - ONG Éducation & Actions",
    description:
      "ONG dédiée à l'éducation et aux initiatives sociales. Découvrez nos projets et soutenez nos actions.",
    url: "https://impactbridge.org", // mettre le vrai domaine si dispo
    siteName: "ImpactBridge",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Suspense>
          <Providers>
            <GlobalLoader />
            <Body>{children}</Body>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}