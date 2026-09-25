import Hero from "@/components/home-components/hero";
import Features from "@/components/home-components/Features";
import Gallery from "@/components/home-components/Gallery";
import Journal from "@/components/home-components/Journal";
import FAQ from "@/components/home-components/FAQ";
import Contact from "@/components/home-components/Contact";
import About from "@/components/home-components/About";
import Escape from "@/components/home-components/Escape";


export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Features />
      <Escape />
      <Gallery />
      <Journal />
      <FAQ />
      <Contact />
    </main>
  );
}