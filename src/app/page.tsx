import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { Skills } from "@/components/Skills";
import { ProofStrip } from "@/components/ProofStrip";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ProofStrip />
        <Work />
        <Experience />
        <About />
        <Process />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
