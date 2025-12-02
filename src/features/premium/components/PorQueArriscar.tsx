"use client"

import { motion } from "motion/react"
import { X, Check, AlertCircle } from "lucide-react"

export default function PorQueArriscar() {
    return (
        <section className="min-h-screen w-full relative flex flex-col justify-center items-center bg-neutral-950 px-6 py-20">
            <div className="max-w-7xl w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2 block">
                        01 — O Problema
                    </span>
                    <h2 className="text-4xl lg:text-5xl text-white font-bold tracking-tight">
                        Por que arriscar seu tempo?
                    </h2>
                </motion.div>

                {/* Unified Split Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/50"
                >
                    {/* Left Side: Apps Comuns (Red) */}
                    <div className="relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 group overflow-hidden">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500/50" />

                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-red-900/5 group-hover:bg-red-900/10 transition-colors duration-500" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20">
                                    <X className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Apps Comuns</h3>
                            </div>

                            <ul className="space-y-8">
                                <li className="flex items-start gap-4">
                                    <AlertCircle className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                                    <div>
                                        <p className="text-base font-medium text-white mb-1">
                                            Cancelamentos surpresa
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            Motorista cancela a 2min de chegar.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <AlertCircle className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                                    <div>
                                        <p className="text-base font-medium text-white mb-1">
                                            Veículos incertos
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            Limpeza e conforto duvidosos.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Executivo MC (Green) */}
                    <div className="relative p-8 md:p-12 group overflow-hidden">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500" />

                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-emerald-900/5 group-hover:bg-emerald-900/10 transition-colors duration-500" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    Executivo MC
                                </h3>
                            </div>

                            <ul className="space-y-8">
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-white mb-1">
                                            Garantia de Embarque
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            Seu carro estará lá. Sem exceções.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-white mb-1">
                                            Segurança Total
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            Motoristas treinados e monitorados.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
