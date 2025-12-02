import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, MapPin, Car, Star, Clock, CheckCircle } from "lucide-react";
import { useRef } from "react";
import { cn } from "../../../lib/utils";

export default function ComoFunciona() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Controla o crescimento da linha de conexão vertical
  const lineHeight1 = useTransform(scrollYProgress, [0, 0.33], ["0%", "100%"]);
  const lineHeight2 = useTransform(scrollYProgress, [0.33, 0.66], ["0%", "100%"]);

  const passos = [
    {
      numero: "01",
      titulo: "Solicite",
      descricao:
        "Preencha o formulário com os detalhes da sua viagem. Leva menos de 2 minutos.",
      icon: Clock,
    },
    {
      numero: "02",
      titulo: "Confirme",
      descricao:
        "Receba confirmação via WhatsApp com o valor estimado da sua corrida.",
      icon: CheckCircle,
    },
    {
      numero: "03",
      titulo: "Viaje",
      descricao:
        "No horário marcado, experimente uma viagem segura, confortável e pontual.",
      icon: Car,
    },
  ];

  return (
    <section ref={sectionRef} id="como-funciona" className="py-16 sm:py-20 lg:py-24 px-4 relative overflow-hidden">
      {/* Partículas visíveis aqui */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - CENTRALIZADO */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-4"
          >
            <div className="border border-white/10 py-1.5 px-4 rounded-full text-white/60 text-[10px] uppercase tracking-widest">
              Como Funciona
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tighter"
          >
            Três Passos Simples
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/20 mx-auto"
          />
        </motion.div>

        {/* Steps - LAYOUT ORIGINAL COM CÍRCULOS E DEGRADÊ LUA MINGUANTE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto relative">
          {/* Linhas de Conexão Verticais Animadas (Mobile) */}
          <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none">
            {/* Linha 1: Entre círculo 1 e 2 */}
            <motion.div
              className="absolute bg-gradient-to-b from-white/20 via-white/15 to-transparent"
              style={{
                top: '180px',
                height: lineHeight1,
                width: '1px',
                maxHeight: 'calc(33.33% - 40px)',
              }}
            />
            {/* Linha 2: Entre círculo 2 e 3 */}
            <motion.div
              className="absolute bg-gradient-to-b from-white/20 via-white/15 to-transparent"
              style={{
                top: 'calc(33.33% + 180px)',
                height: lineHeight2,
                width: '1px',
                maxHeight: 'calc(33.33% - 40px)',
              }}
            />
          </div>

          {/* Linhas de Conexão Horizontais Animadas (Desktop) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-px pointer-events-none">
            {/* Linha 1: Entre círculo 1 e 2 */}
            <motion.div
              className="absolute bg-gradient-to-r from-white/20 via-white/15 to-transparent"
              style={{
                left: 'calc(16.66% + 100px)',
                width: useTransform(scrollYProgress, [0, 0.33], ["0%", "calc(33.33% - 200px)"]),
                height: '1px',
              }}
            />
            {/* Linha 2: Entre círculo 2 e 3 */}
            <motion.div
              className="absolute bg-gradient-to-r from-white/20 via-white/15 to-transparent"
              style={{
                left: 'calc(50% + 100px)',
                width: useTransform(scrollYProgress, [0.33, 0.66], ["0%", "calc(33.33% - 200px)"]),
                height: '1px',
              }}
            />
          </div>

          {passos.map((passo, index) => (
            <motion.div
              key={passo.numero}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.2,
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative group flex flex-col items-center"
            >
              {/* Círculo Principal com Degradê Lua Minguante */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full mb-6"
                style={{
                  background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent 60%),
  radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.05), transparent 50%),
  linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))`,
                  backgroundBlendMode: 'screen',
                  border: '2px solid transparent',
                  backgroundClip: 'padding-box',
                }}
              >
                {/* Degradê da Borda - Efeito Lua Minguante */}
                <div
                  className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 25% 25%,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.4) 30%,
    rgba(255, 255, 255, 0.1) 60%,
    transparent 100%)`,
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Brilho Interno Animado */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 70%)`,
                  }}
                />

                {/* Conteúdo do Círculo */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  {/* Número */}
                  <div className="text-7xl sm:text-8xl font-bold text-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 tracking-tighter">
                    {passo.numero}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500"
                  >
                    <passo.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-500" />
                  </motion.div>
                </div>

                {/* Efeito de Brilho ao Hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>

              {/* Texto Abaixo do Círculo */}
              <div className="text-center max-w-xs">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                  className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight"
                >
                  {passo.titulo}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
                  className="text-white/50 text-sm leading-relaxed"
                >
                  {passo.descricao}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}