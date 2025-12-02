"use client"
import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "../../lib/utils"

interface TimePickerProps {
    value: string
    onChange: (time: string) => void
    className?: string
}

const PRESETS = ["08:00", "09:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]

export function TimePicker({ value, onChange, className }: TimePickerProps) {
    const [isCustom, setIsCustom] = useState(false)

    useEffect(() => {
        if (value && !PRESETS.includes(value)) {
            setIsCustom(true)
        }
    }, [value])

    const handlePresetClick = (time: string) => {
        onChange(time)
        setIsCustom(false)
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div className="grid grid-cols-4 gap-2">
                {PRESETS.map((time) => (
                    <button
                        key={time}
                        onClick={(e) => { e.preventDefault(); handlePresetClick(time) }}
                        className={cn(
                            "px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                            value === time
                                ? "bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] scale-105"
                                : "bg-neutral-950/30 border-neutral-800 text-neutral-400 hover:bg-white/10 hover:text-white hover:border-white/30"
                        )}
                        aria-label={`Selecionar horário ${time}`}
                        aria-pressed={value === time}
                    >
                        {time}
                    </button>
                ))}
            </div>

            <div className="relative">
                <button
                    onClick={(e) => { e.preventDefault(); setIsCustom(!isCustom) }}
                    className={cn(
                        "w-full flex items-center justify-center px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-medium",
                        isCustom
                            ? "bg-white/5 border-white/30 text-white"
                            : "bg-neutral-950/30 border-neutral-800 text-neutral-500 hover:text-white hover:bg-white/5"
                    )}
                >
                    <Clock className="w-4 h-4 mr-2" />
                    {isCustom ? "Definir horário personalizado" : "Outro horário"}
                </button>

                <AnimatePresence>
                    {isCustom && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="overflow-hidden"
                        >
                            <div className="relative">
                                <input
                                    type="time"
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                    className="w-full bg-neutral-950/50 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-300 [color-scheme:dark]"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}