import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Single font system — Nunito covers all weights for headings and body
const nunito = Nunito({
  variable: "--font-geist-sans",   // body/UI: Tailwind font-sans + all non-heading text
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
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
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
