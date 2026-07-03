import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://www.totallyfakeplumbing.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Totally Fake Plumbing — Demo Landing Page (Not a Real Business)",
    template: "%s | Totally Fake Plumbing",
  },
  description:
    "A demonstration landing page for a fictional Sydney plumber. Emergency plumbing, hot water, blocked drains — none of it real. Call 1300 NOT REAL, any time you like; nobody will answer.",
  keywords: [
    "demo landing page",
    "fictional plumber",
    "plumber Sydney demo",
    "scroll video landing page",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: "Totally Fake Plumbing (demo)",
    title: "Totally Fake Plumbing — Demo Landing Page",
    description:
      "A fictional plumbing business invented for a website demo. Upfront fixed pricing on services we will never perform.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Totally Fake Plumbing (demo) — precision copper pipework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Totally Fake Plumbing — Demo Landing Page",
    description:
      "A fictional Sydney plumber invented for a website demo. Call 1300 NOT REAL.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#181f22",
  width: "device-width",
  initialScale: 1,
};

// Demo schema for a business that does not exist — .example domain, null
// phone, and a disclaimer so nothing here can be mistaken for a real listing.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": `${SITE_URL}/#business`,
  name: "Totally Fake Plumbing (fictional demo business)",
  disambiguatingDescription:
    "This business does not exist. The page is a web design demonstration.",
  url: SITE_URL,
  telephone: "+611300000000",
  email: "hello@totallyfakeplumbing.example",
  image: `${SITE_URL}/og.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
  areaServed: { "@type": "City", name: "Sydney (hypothetically)" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Plumbing services (never actually performed)",
    itemListElement: [
      "24/7 emergency plumbing",
      "Hot water system repair and installation",
      "Blocked drain clearing and pipe relining",
      "Gas fitting",
      "Bathroom renovations",
      "Leak detection",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <script
          // Gate scroll-reveal styles on JS being available so content is
          // never hidden for no-JS visitors or crawlers.
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
