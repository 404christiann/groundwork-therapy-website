import type { Metadata } from "next";
import { Jost, Newsreader, Nunito } from "next/font/google";
import "./globals.css";

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
  title: "Tiffany Venegas, LCSW",
  description:
    "Collaborative, down-to-earth therapy where insight turns into real, grounded change. Specializing in ACT, CBT, and DBT for anxiety, trauma, and life transitions.",
  keywords: ["therapy", "therapist", "mental health", "anxiety", "trauma", "CBT", "ACT", "DBT", "Los Angeles"],
  alternates: { canonical: "/" },
  // The share image is src/app/opengraph-image.png (the tree mark)
  openGraph: {
    title: "Tiffany Venegas, LCSW",
    description: "Where insight turns into real, grounded change.",
    url: "/",
    siteName: "Tiffany Venegas, LCSW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiffany Venegas, LCSW",
    description: "Where insight turns into real, grounded change.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
