import { motion } from "motion/react"
import { Phone } from "lucide-react"
import { cn } from "../../../lib/utils"

interface BookingStepPhoneProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    variants: any
    direction: number
}

export function BookingStepPhone({ value, onChange, variants, direction }: BookingStepPhoneProps) {
    return (
        <motion.div
            key="step1"
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
                    <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-light text-white">Qual seu WhatsApp?</h4>
                <p className="text-sm text-neutral-500 uppercase tracking-wider">Enviaremos a confirmação por lá</p>
            </div>
            <input
                name="telefone"
                value={value}
                onChange={onChange}
                placeholder="(71) 99999-9999"
                type="tel"
                className={cn(
                    "w-full bg-neutral-950/30 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-300"
                )}
            />
        </motion.div>
    )
}
