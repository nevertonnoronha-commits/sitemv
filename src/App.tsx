import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import HeroSection from "./features/hero/components/HeroSection";
import SobreSection from "./features/about/components/SobreSection";
import ComoFunciona from "./features/how-it-works/components/ComoFunciona";
import Depoimentos from "./features/testimonials/components/Depoimentos";
import { BookingForm } from "./features/booking/components/BookingForm";
import FAQ from "./features/faq/components/FAQ";
import Footer from "./features/footer/components/Footer";
import FloatingParticles from "./features/hero/animations/FloatingParticles";
import Particles from "./components/ui/particles";

import Navbar from "./components/Navbar";

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-black dark:bg-black min-h-screen overflow-hidden transition-colors duration-500">
      {/* Clean Background */}
      <div className="fixed inset-0 bg-black dark:bg-black transition-colors duration-500" />

      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      {/* Partículas Sutis - Efeito Cinzas */}
      <Particles className="absolute inset-0 z-[1]" quantity={100} ease={40} />

      {/* Floating Particles */}
      <FloatingParticles />

      <Navbar />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <SobreSection />
        <ComoFunciona />
        <Depoimentos />
        <section id="agendamento" className="py-16 sm:py-20 lg:py-24 px-4 bg-black">
          {/* Background sólido preto - sem partículas visíveis */}
          <div className="absolute inset-0 bg-black -z-10" />
          <BookingForm />
        </section>
        <FAQ />
        <Footer />
      </div>

      <Toaster position="top-center" />
    </div>
  );
}