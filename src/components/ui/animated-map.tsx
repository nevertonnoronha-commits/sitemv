"use client"

import { motion } from "motion/react"

export function AnimatedMap() {
    return (
        <div className="relative w-full h-full min-h-[400px] bg-neutral-900/50 flex items-center justify-center overflow-hidden">
            {/* Abstract Map Background */}
            <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100,100 Q200,50 300,100 T500,100 T700,100" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
                    <path d="M100,200 Q200,150 300,200 T500,200 T700,200" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
                    <path d="M100,300 Q200,250 300,300 T500,300 T700,300" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
                    <path d="M100,400 Q200,350 300,400 T500,400 T700,400" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
                    <path d="M100,500 Q200,450 300,500 T500,500 T700,500" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />

                    <path d="M200,50 Q250,150 200,250 T200,450" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
                    <path d="M400,50 Q450,150 400,250 T400,450" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
                    <path d="M600,50 Q650,150 600,250 T600,450" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
                </svg>
            </div>

            {/* Animated Pins/Routes */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div className="relative">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
                </div>
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                    d="M400,300 L500,200"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </svg>
        </div>
    )
}
