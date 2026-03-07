import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Suspense } from "react";
import { GlobalLoader } from "@/components/common";
import { Body } from "@/containers";
import { Providers } from "./providers";
import "./globals.css";

const siteUrl = "https://impact-bridge-oumoudev.vercel.app";
const ogImageUrl = `${siteUrl}/assets/opengraph.png`;
const siteTitle = "ImpactBridge";
const siteDescription =
  "ImpactBridge est une organisation humanitaire engagee dans l education, l accompagnement social et les actions solidaires de terrain.";
const defaultPageTitle = "ImpactBridge | Organisation humanitaire et actions solidaires";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultPageTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  authors: [
    {
      name: "OumouDev",
      url: "https://oumou100.github.io/",
    },
  ],
  creator: "OumouDev",
  publisher: "OumouDev",
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "ImpactBridge",
    "organisation humanitaire",
    "ONG",
    "education",
    "solidarite",
    "benevolat",
    "actions solidaires",
    "accompagnement social",
    "partenariat associatif",
    "aide communautaire",
  ],
  category: "nonprofit",
  openGraph: {
    title: defaultPageTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "ImpactBridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultPageTitle,
    description: siteDescription,
    creator: "@OumouDev",
    images: [ogImageUrl],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
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
