import type { Metadata } from "next";
import { Jost, Newsreader, Nunito } from "next/font/google";
import "./globals.css";
import { structuredData } from "@/lib/structured-data";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "300",
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tiffanyvenegaslcsw.com"),
  title: "Tiffany Venegas, LCSW | Online Therapy for Teens & Adults in California",
  description:
    "Telehealth therapy for teens and adults anywhere in California with Tiffany Venegas, MSW, LCSW. Grounded in ACT, CBT and DBT for anxiety, ADHD, trauma and life transitions. Free 20-minute consultation.",
  keywords: [
    "therapist California",
    "online therapy California",
    "telehealth therapist",
    "therapy for teens",
    "therapy for adults",
    "LCSW",
    "ACT",
    "CBT",
    "DBT",
    "anxiety",
    "ADHD",
    "trauma",
    "life transitions",
  ],
  alternates: { canonical: "/" },
  // The share image is src/app/opengraph-image.png (the tree mark)
  openGraph: {
    title: "Tiffany Venegas, LCSW | Online Therapy in California",
    description: "Telehealth therapy for teens and adults anywhere in California. Free 20-minute consultation.",
    url: "/",
    siteName: "Tiffany Venegas, LCSW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiffany Venegas, LCSW | Online Therapy in California",
    description: "Telehealth therapy for teens and adults anywhere in California. Free 20-minute consultation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${jost.variable} ${newsreader.variable} ${nunito.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
