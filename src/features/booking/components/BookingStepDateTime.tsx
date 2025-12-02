import { motion } from "motion/react"
import { Calendar } from "lucide-react"
import { DatePicker } from "../../../components/ui/date-picker"
import { TimePicker } from "../../../components/ui/time-picker"

interface BookingStepDateTimeProps {
    date: string
    time: string
    onDateChange: (date: string) => void
    onTimeChange: (time: string) => void
    variants: any
    direction: number
}

export function BookingStepDateTime({ date, time, onDateChange, onTimeChange, variants, direction }: BookingStepDateTimeProps) {
    return (
        <motion.div
            key="step3"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "circOut" }}
            className="space-y-8"
        >
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-neutral-900 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <Calendar className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-light text-white">Quando será a viagem?</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="text-xs text-neutral-500 ml-1 mb-2 block uppercase tracking-widest">Data</label>
                    <DatePicker
                        value={date}
                        onChange={onDateChange}
                    />
                </div>
                <div>
                    <label className="text-xs text-neutral-500 ml-1 mb-2 block uppercase tracking-widest">Horário</label>
                    <TimePicker
                        value={time}
                        onChange={onTimeChange}
                    />
                </div>
            </div>
        </motion.div>
    )
}
