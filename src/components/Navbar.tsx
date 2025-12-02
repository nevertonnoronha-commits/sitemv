import { motion } from "motion/react";
import Logo from "./Logo";

export default function Navbar() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[9999] bg-black/40 dark:bg-black/40 backdrop-blur-lg transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="h-6 sm:h-7"
                    >
                        <Logo className="h-full w-auto" />
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {["sobre", "serviços", "depoimentos", "faq"].map((item, i) => (
                            <motion.button
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: i * 0.1 + 0.3,
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                onClick={() => scrollToSection(item === "serviços" ? "como-funciona" : item)}
                                className="text-white/60 dark:text-white/60 hover:text-white dark:hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-500 capitalize text-xs tracking-wide"
                                aria-label={`Ir para seção ${item}`}
                            >
                                {item}
                            </motion.button>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => scrollToSection("agendamento")}
                            className="relative px-4 sm:px-5 py-2 rounded-full bg-white dark:bg-white text-black dark:text-black text-xs sm:text-sm font-medium overflow-hidden group transition-all duration-500"
                            aria-label="Ir para formulário de agendamento"
                        >
                            <span className="relative z-10">Agendar</span>
                            <div className="absolute inset-0 bg-white/90 dark:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.button>
                    </div>
                </div>
            </div>
            {/* Gradient Bottom Border */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.nav>
    );
}
