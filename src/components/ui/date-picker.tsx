"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "../../lib/utils"

interface DatePickerProps {
    value: string
    onChange: (date: string) => void
    className?: string
}

export function DatePicker({ value, onChange, className }: DatePickerProps) {
    const [showCalendar, setShowCalendar] = useState(false)
    const [viewDate, setViewDate] = useState(new Date())
    const containerRef = useRef<HTMLDivElement>(null)

    // Initialize viewDate from value if present
    useEffect(() => {
        if (value) {
            const [year, month, day] = value.split("-").map(Number)
            setViewDate(new Date(year, month - 1, day))
        }
    }, [])

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowCalendar(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
    }

    const handleDateSelect = (day: number) => {
        const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
        const year = selectedDate.getFullYear()
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
        const dayStr = String(selectedDate.getDate()).padStart(2, "0")
        const formatted = `${year}-${month}-${dayStr}`
        onChange(formatted)
        setShowCalendar(false)
    }

    const isToday = (day: number) => {
        const today = new Date()
        return day === today.getDate() &&
            viewDate.getMonth() === today.getMonth() &&
            viewDate.getFullYear() === today.getFullYear()
    }

    const isSelected = (day: number) => {
        if (!value) return false
        const [y, m, d] = value.split("-").map(Number)
        return day === d &&
            viewDate.getMonth() === m - 1 &&
            viewDate.getFullYear() === y
    }

    const isPast = (day: number) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const checkDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
        return checkDate < today
    }

    const renderCalendarDays = () => {
        const days = []
        const totalDays = daysInMonth(viewDate)
        const startDay = firstDayOfMonth(viewDate)

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8" />)
        }

        // Days
        for (let i = 1; i <= totalDays; i++) {
            const disabled = isPast(i)
            const selected = isSelected(i)
            const today = isToday(i)

            days.push(
                <button
                    key={i}
                    onClick={(e) => {
                        e.preventDefault()
                        if (!disabled) handleDateSelect(i)
                    }}
                    disabled={disabled}
                    className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 relative",
                        selected ? "bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-white hover:bg-white/10",
                        disabled && "text-neutral-700 cursor-not-allowed hover:bg-transparent",
                        today && !selected && "border border-white/30"
                    )}
                >
                    {i}
                    {today && !selected && (
                        <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
                    )}
                </button>
            )
        }

        return days
    }

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <div
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-neutral-950/30 border border-neutral-800 rounded-xl px-5 py-4 text-white flex items-center cursor-pointer hover:border-white/30 transition-colors group"
            >
                <CalendarIcon className="w-5 h-5 text-neutral-500 mr-3 group-hover:text-white transition-colors" />
                <span className={cn("flex-1", !value && "text-neutral-700")}>
                    {value ? value.split("-").reverse().join("/") : "Selecione a data"}
                </span>
            </div>

            <AnimatePresence>
                {showCalendar && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-[9999] mt-2 p-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-[300px] left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <button
                                onClick={(e) => { e.preventDefault(); handlePrevMonth() }}
                                className="p-1 hover:bg-white/10 rounded-full text-white transition-colors"
                                aria-label="Mês anterior"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-white font-medium text-sm">
                                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                            </span>
                            <button
                                onClick={(e) => { e.preventDefault(); handleNextMonth() }}
                                className="p-1 hover:bg-white/10 rounded-full text-white transition-colors"
                                aria-label="Próximo mês"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
                                <span key={i} className="text-xs text-neutral-500 font-medium">{d}</span>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 place-items-center">
                            {renderCalendarDays()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}