import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      pergunta: "Qual a diferença entre este serviço e os aplicativos tradicionais?",
      resposta:
        "A principal diferença é a consistência. Você sempre sabe quem é o motorista, qual é o carro e o padrão de qualidade que irá receber. É um serviço pessoal e previsível.",
    },
    {
      pergunta: "Como funciona o pagamento?",
      resposta:
        "O pagamento pode ser feito via Pix, cartão de crédito ou em dinheiro, combinado diretamente no momento da confirmação da sua viagem.",
    },
    {
      pergunta: "Você atende fora de Salvador?",
      resposta:
        "Sim. Atendo toda a Região Metropolitana (Lauro de Freitas, Camaçari, etc.), desde que o agendamento seja feito com mínimo de 2 horas de antecedência.",
    },
    {
      pergunta: "Posso solicitar uma viagem de madrugada?",
      resposta:
        "Sim, o serviço está disponível 24 horas, sempre sujeito à disponibilidade. Recomendo agendar com antecedência, principalmente para horários de alta demanda.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 px-4 relative">
      {/* Partículas visíveis aqui */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header - CENTRALIZADO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
              FAQ
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tighter">
            Dúvidas Frequentes
          </h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 sm:p-8 text-left flex items-start justify-between gap-4"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-white font-medium text-base sm:text-lg pr-4 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {faq.pergunta}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Plus className="w-5 h-5 text-white/50" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="overflow-hidden"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                      <div className="h-px bg-white/5 mb-6" />
                      <p className="text-white/60 text-sm leading-relaxed">
                        {faq.resposta}
                      </p>
                    </div>
                  </motion.div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA - CENTRALIZADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-white/50 text-sm mb-6">Ainda tem dúvidas?</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              const element = document.getElementById("agendamento");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Entre em Contato
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}