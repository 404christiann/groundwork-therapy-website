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
  title: "Ground Work Therapy",
  description:
    "A collaborative, down-to-earth therapeutic space where insight turns into real, grounded change. Specializing in ACT, CBT, and DBT for anxiety, trauma, and life transitions.",
  keywords: ["therapy", "therapist", "mental health", "anxiety", "trauma", "CBT", "ACT", "DBT", "Los Angeles"],
  openGraph: {
    title: "Ground Work Therapy",
    description: "Where insight turns into real, grounded change.",
    type: "website",
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
