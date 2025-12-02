import { motion } from "motion/react"
import { MapPin } from "lucide-react"
import { LocationInput } from "../../../components/ui/location-input"

interface BookingStepRouteProps {
    pickup: string
    dropoff: string
    onPickupChange: (value: string) => void
    onDropoffChange: (value: string) => void
    variants: any
    direction: number
}

export function BookingStepRoute({ pickup, dropoff, onPickupChange, onDropoffChange, variants, direction }: BookingStepRouteProps) {
    return (
        <motion.div
            key="step2"
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
                    <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-light text-white">Defina sua rota</h4>
            </div>
            <div className="space-y-6">
                <div>
                    <label className="text-xs text-neutral-500 ml-1 mb-2 block uppercase tracking-widest">Onde te buscamos?</label>
                    <LocationInput
                        value={pickup}
                        onChange={onPickupChange}
                        placeholder="Endereço de partida"
                    />
                </div>
                <div>
                    <label className="text-xs text-neutral-500 ml-1 mb-2 block uppercase tracking-widest">Para onde vamos?</label>
                    <LocationInput
                        value={dropoff}
                        onChange={onDropoffChange}
                        placeholder="Destino final"
                    />
                </div>
            </div>
        </motion.div>
    )
}
