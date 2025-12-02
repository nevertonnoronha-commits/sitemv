import { motion } from "motion/react";
import { AnimatedMap } from "../../../components/ui/animated-map";
import { FeatureToggle } from "../../../components/ui/feature-toggle";

export default function InteligenciaRota() {
    return (
        <section className="min-h-screen w-full relative flex flex-col justify-center items-center bg-neutral-950 px-6 py-20 overflow-hidden">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* Left Panel: Text & Toggles */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-5 space-y-8"
                >
                    <div className="space-y-4">
                        <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-4 block">
                            02 — Logística
                        </span>
                        <h2 className="text-4xl lg:text-5xl text-white font-bold tracking-tight">
                            Inteligência de <br />
                            <span className="text-neutral-500">Rota.</span>
                        </h2>
                        <p className="text-lg text-white/70 leading-relaxed border-l-2 border-white/10 pl-6">
                            Não usamos apenas GPS. Monitoramos você em tempo real com análise preditiva de trânsito, condições climáticas e rotas otimizadas para garantir pontualidade absoluta.
                        </p>
                    </div>

                    {/* Feature Toggles */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-4">
                        <FeatureToggle label="Monitoramento de Voo" isActive={true} />
                        <FeatureToggle label="Wi-Fi a Bordo" isActive={true} />
                        <FeatureToggle label="Blindagem" isActive={false} />
                    </div>
                </motion.div>

                {/* Right Panel: Animated Map */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-7 relative border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden shadow-2xl"
                >
                    <AnimatedMap />
                </motion.div>
            </div>
        </section>
    )
}
