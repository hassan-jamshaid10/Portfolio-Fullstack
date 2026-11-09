import type { Metadata } from "next";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { ProofStrip } from "@/components/ProofStrip";
import { Shell } from "@/components/portfolio/Shell";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <Shell>
      <Nav />
      <main id="content">
        <Hero />
        <Marquee />
        <ProofStrip />
        <About />
        <Work />
        <Process />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </Shell>
  );
}
