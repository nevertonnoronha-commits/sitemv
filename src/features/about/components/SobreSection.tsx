import { motion, useScroll, useTransform } from "motion/react";
import { Check, Clock, Shield, Sparkles, MapPin } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useRef } from "react";

export default function SobreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const features = [
    {
      titulo: "Pontualidade Absoluta",
      descricao: "Compromisso rigoroso com horários. Seu tempo é nossa prioridade máxima.",
      icon: Clock,
    },
    {
      titulo: "Segurança Garantida",
      descricao: "Direção defensiva e veículo moderno para sua total tranquilidade.",
      icon: Shield,
    },
    {
      titulo: "Conforto Premium",
      descricao: "T-Cross espaçoso, climatizado e impecavelmente cuidado.",
      icon: Sparkles,
    },
    {
      titulo: "Conhecimento Local",
      descricao: "Domínio completo de Salvador e região para rotas eficientes.",
      icon: MapPin,
    },
  ];

  // Função para calcular a escala no mobile baseado no scroll
  const getCardScale = (index: number) => {
    const start = 0.15 + index * 0.2;
    const peak = start + 0.1;
    const end = start + 0.2;
    return useTransform(scrollYProgress, [start, peak, end], [1, 1.15, 1]);
  };

  return (
    <section ref={sectionRef} id="sobre" className="py-16 sm:py-20 lg:py-24 px-4 relative overflow-hidden bg-black">
      {/* Background sólido preto - sem partículas visíveis */}
      <div className="absolute inset-0 bg-black z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
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
              Sobre
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tighter"
          >
            Por que escolher <br className="sm:hidden" />
            <span className="text-white/40">Marcos Campos</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 max-w-3xl mx-auto mb-4 text-sm sm:text-base leading-relaxed"
          >
            Com mais de <span className="text-white font-medium">uma década</span> de experiência,
            aprimorei a arte de oferecer um serviço de transporte executivo que vai além do convencional.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/20 mx-auto"
          />
        </motion.div>

        {/* Features - LAYOUT COM CÍRCULOS E DEGRADÊ LUA MINGUANTE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto relative">
          {features.map((feature, index) => {
            const scale = getCardScale(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.15,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{ scale: scale }}
                className="relative group flex flex-col items-center"
              >
                {/* Círculo Principal com Degradê Lua Minguante - 80% arredondamento */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 mb-5"
                  style={{
                    borderRadius: '80%',
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12), transparent 60%),
                      radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.04), transparent 50%),
                      linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))
                    `,
                    backgroundBlendMode: 'screen',
                    border: '2px solid transparent',
                    backgroundClip: 'padding-box',
                  }}
                >
                  {/* Degradê da Borda - Efeito Lua Minguante */}
                  <div
                    className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      borderRadius: '80%',
                      background: `
                        radial-gradient(circle at 25% 25%, 
                          rgba(255, 255, 255, 0.7) 0%, 
                          rgba(255, 255, 255, 0.35) 30%, 
                          rgba(255, 255, 255, 0.08) 60%, 
                          transparent 100%
                        )
                      `,
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* Brilho Interno Animado */}
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute inset-0"
                    style={{
                      borderRadius: '80%',
                      background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent 70%)`,
                    }}
                  />

                  {/* Conteúdo do Círculo */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500"
                    >
                      <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-500" />
                    </motion.div>
                  </div>

                  {/* Efeito de Brilho ao Hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ borderRadius: '80%' }}
                  />
                </motion.div>

                {/* Texto Abaixo do Círculo */}
                <div className="text-center max-w-xs">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.15, duration: 0.8 }}
                    className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight"
                  >
                    {feature.titulo}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
                    className="text-white/50 text-xs leading-relaxed"
                  >
                    {feature.descricao}
                  </motion.p>
                </div>

                {/* Linha Ondulada de Conexão entre cards (Desktop) */}
                {index < features.length - 1 && (
                  <div className="hidden lg:block absolute top-20 -right-5 w-10 h-8 overflow-visible">
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 1 }}
                      width="40"
                      height="32"
                      viewBox="0 0 40 32"
                      className="w-full h-full"
                    >
                      <motion.path
                        d="M 0 16 Q 10 8, 20 16 T 40 16"
                        stroke="url(#gradient)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
                          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.12)" />
                          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>
                )}

                {/* Linha Ondulada Mobile - entre cards verticais */}
                {index < features.length - 1 && (
                  <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-8 overflow-visible">
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 1 }}
                      width="48"
                      height="32"
                      viewBox="0 0 48 32"
                      className="w-full h-full"
                    >
                      <motion.path
                        d="M 24 0 Q 16 10, 24 20 T 24 32"
                        stroke="url(#gradientMobile)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
                          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.12)" />
                          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/3 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}