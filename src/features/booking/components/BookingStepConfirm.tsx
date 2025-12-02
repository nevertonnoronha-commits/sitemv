import { motion } from "motion/react"
import { Check, Calendar, Clock, Map as MapIcon } from "lucide-react"
import { BookingFormData } from "../types/booking.types"
import { formatPhone, formatDateFull, generateBookingId, generateNavigationLinks } from "../utils/whatsapp-formatter"

interface BookingStepConfirmProps {
    formData: BookingFormData
}

export function BookingStepConfirm({ formData }: BookingStepConfirmProps) {
    const pickupLinks = generateNavigationLinks(formData.enderecoBusca)
    const dropoffLinks = generateNavigationLinks(formData.destino)

    return (
        <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="space-y-6 w-full max-w-full overflow-hidden"
        >
            <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <Check className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">Confirme seu Agendamento</h4>
            </div>

            <div className="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-white/5 p-4 border-b border-white/5 text-center">
                    <p className="text-neutral-400 text-xs uppercase tracking-widest">Motorista</p>
                    <p className="text-white font-bold text-lg">Marcos Campos</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Client Info */}
                    <div className="space-y-2">
                        <h5 className="text-white/60 text-xs uppercase tracking-wider font-semibold">Informações do Cliente</h5>
                        <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                            <span className="text-white font-medium">{formData.nome}</span>
                            <span className="text-neutral-400 text-sm">{formatPhone(formData.telefone)}</span>
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div className="space-y-4">
                        <h5 className="text-white/60 text-xs uppercase tracking-wider font-semibold">Detalhes da Viagem</h5>

                        {/* Pickup */}
                        <div className="relative pl-4 border-l-2 border-white/20 space-y-2">
                            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-white rounded-full" />
                            <p className="text-xs text-neutral-500 uppercase">Origem</p>
                            <p className="text-white text-sm font-medium leading-relaxed">{formData.enderecoBusca}</p>
                            <div className="flex gap-2 mt-2">
                                <a href={pickupLinks.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 bg-[#4285F4]/20 hover:bg-[#4285F4]/30 text-[#4285F4] text-xs rounded-md transition-colors">
                                    <MapIcon className="w-3 h-3" /> Google Maps
                                </a>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="relative pl-4 border-l-2 border-white/20 space-y-2">
                            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-white rounded-full" />
                            <p className="text-xs text-neutral-500 uppercase">Destino</p>
                            <p className="text-white text-sm font-medium leading-relaxed">{formData.destino}</p>
                            <div className="flex gap-2 mt-2">
                                <a href={dropoffLinks.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 bg-[#4285F4]/20 hover:bg-[#4285F4]/30 text-[#4285F4] text-xs rounded-md transition-colors">
                                    <MapIcon className="w-3 h-3" /> Google Maps
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex gap-4 pt-4 border-t border-white/5">
                        <div className="flex-1 bg-white/5 rounded-lg p-3 text-center">
                            <Calendar className="w-4 h-4 text-neutral-400 mx-auto mb-1" />
                            <p className="text-white font-medium text-sm">{formatDateFull(formData.data)}</p>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-lg p-3 text-center">
                            <Clock className="w-4 h-4 text-neutral-400 mx-auto mb-1" />
                            <p className="text-white font-medium text-sm">{formData.hora}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 p-3 text-center border-t border-white/5">
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wider">
                        ID: {generateBookingId(formData.data, formData.hora)}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
