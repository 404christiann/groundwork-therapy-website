import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
