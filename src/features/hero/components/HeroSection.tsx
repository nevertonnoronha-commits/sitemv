import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { BackgroundPaths } from "../../../components/ui/background-paths";
import { ShimmerButton } from "../../../components/ui/shimmer-button";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <BackgroundPaths>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center mt-20 sm:mt-0">
          {/* Main Headline - COM BACKGROUND PATHS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-10"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-white dark:text-white tracking-tighter leading-[0.9] px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {"Seu Destino,".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/40 dark:text-white/40 tracking-tighter leading-[0.9] px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              {"Nossa Prioridade.".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg lg:text-xl text-white/50 dark:text-white/50 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Transporte executivo com pontualidade, segurança e conforto absolutos.
          </motion.p>

          {/* CTA Buttons - COM SHIMMER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 justify-center items-center"
          >
            <ShimmerButton
              onClick={() => scrollToSection("agendamento")}
              shimmerColor="#000000"
              background="rgba(255, 255, 255, 1)"
              className="px-5 py-2.5 text-xs sm:text-sm !text-black border-white/20 dark:border-white/20 font-medium"
            >
              Agendar Viagem
            </ShimmerButton>

            <ShimmerButton
              onClick={() => scrollToSection("como-funciona")}
              shimmerColor="#666666"
              background="rgba(100, 100, 100, 0.3)"
              className="px-4 py-2 text-[11px] sm:text-xs !text-white/80 border-white/10 hover:border-white/20 dark:border-white/10"
            >
              Como Funciona
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("sobre")}
          >
            <span className="text-white/30 dark:text-white/30 text-[10px] uppercase tracking-widest">Explore</span>
            <ChevronDown className="w-4 h-4 text-white/30 dark:text-white/30" />
          </motion.div>
        </motion.div>
      </section>
    </BackgroundPaths>
  );
}