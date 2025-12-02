"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"

interface FeatureToggleProps {
    label: string
    isActive: boolean
}

export function FeatureToggle({ label, isActive }: FeatureToggleProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <span className="text-white font-medium">{label}</span>
            <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isActive ? 'bg-emerald-500/20' : 'bg-white/10'}`}>
                <motion.div
                    className={`absolute top-1 w-4 h-4 rounded-full shadow-sm transition-all duration-300 flex items-center justify-center ${isActive ? 'bg-emerald-500 left-7' : 'bg-neutral-400 left-1'}`}
                    layout
                >
                    {isActive && <Check className="w-3 h-3 text-black" />}
                </motion.div>
            </div>
        </div>
    )
}
