import { motion } from "motion/react";
import { Instagram, MessageCircle, Mail, MapPin, Clock, Phone } from "lucide-react";
import Logo from "../../../components/Logo";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="relative py-16 sm:py-24 px-4 border-t border-white/5 bg-black">
      {/* Background sólido preto - sem partículas visíveis */}
      <div className="absolute inset-0 bg-black -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <Logo className="h-10 w-auto" />
            <p className="text-white/50 leading-relaxed max-w-sm">
              Motorista Executivo. Transporte premium com pontualidade, segurança e conforto absolutos.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h4 className="text-white font-medium uppercase tracking-widest text-xs">
              Links
            </h4>
            <nav className="flex flex-col gap-4">
              {["sobre", "como-funciona", "depoimentos", "agendamento", "faq"].map((link) => (
                <motion.button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/50 hover:text-white transition-colors duration-300 text-left capitalize"
                  aria-label={`Ir para seção ${link.replace("-", " ")}`}
                >
                  {link.replace("-", " ")}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h4 className="text-white font-medium uppercase tracking-widest text-xs">
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                <p className="text-white/50 leading-relaxed">
                  Salvador e Região Metropolitana, Bahia
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                <p className="text-white/50 leading-relaxed">
                  24 horas (sujeito à disponibilidade)
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/5571915939311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors duration-300 leading-relaxed"
                >
                  (71) 91593-9311
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/30 text-sm text-center sm:text-left"
          >
            © {new Date().getFullYear()} Seu Destino, Nossa Prioridade. Todos os direitos reservados.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection("agendamento")}
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-500"
          >
            Agendar Viagem
          </motion.button>
        </div>
      </div>
    </footer>
  );
}