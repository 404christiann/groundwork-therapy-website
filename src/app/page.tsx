"use client";

import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Approach from "@/components/sections/Approach";
import Services from "@/components/sections/Services";
import Consultation from "@/components/sections/Consultation";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <NavBar />
      <Hero />
      <Consultation />
      <About />
      <Approach />
      <Services />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
