"use client"

import { AnimatePresence, motion } from "motion/react"
import { ChevronRight, ChevronLeft, Check, Calendar, Clock, MapPin, User, Phone } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { useBookingForm } from "../hooks/useBookingForm"
import { useBookingSubmit } from "../hooks/useBookingSubmit"
import { isStepValid } from "../utils/booking-validator"
import { BookingStepName } from "./BookingStepName"
import { BookingStepPhone } from "./BookingStepPhone"
import { BookingStepRoute } from "./BookingStepRoute"
import { BookingStepDateTime } from "./BookingStepDateTime"
import { BookingStepConfirm } from "./BookingStepConfirm"

const steps = [
    { id: "name", title: "Quem viaja?", icon: User },
    { id: "contact", title: "Contato", icon: Phone },
    { id: "route", title: "Rota", icon: MapPin },
    { id: "datetime", title: "Data & Hora", icon: Calendar },
    { id: "confirm", title: "Confirmação", icon: Check },
]

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95
    })
}

export function BookingForm() {
    const {
        currentStep,
        direction,
        formData,
        handleChange,
        updateField,
        nextStep,
        prevStep
    } = useBookingForm()

    const { loading, submitBooking } = useBookingSubmit()

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_0_60px_rgba(255,255,255,0.05)]">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 mb-8 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase">Agende sua Experiência</h3>
                    <p className="text-neutral-500 text-sm tracking-widest uppercase">Passo {currentStep + 1} de {steps.length}</p>

                    {/* Progress Bar */}
                    <div className="mt-6 h-[2px] w-full bg-neutral-900 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                        />
                    </div>
                </div>

                {/* Form Content */}
                <div className="relative z-10 min-h-[350px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        {currentStep === 0 && (
                            <BookingStepName
                                value={formData.nome}
                                onChange={handleChange}
                                variants={variants}
                                direction={direction}
                            />
                        )}

                        {currentStep === 1 && (
                            <BookingStepPhone
                                value={formData.telefone}
                                onChange={handleChange}
                                variants={variants}
                                direction={direction}
                            />
                        )}

                        {currentStep === 2 && (
                            <BookingStepRoute
                                pickup={formData.enderecoBusca}
                                dropoff={formData.destino}
                                onPickupChange={(val) => updateField("enderecoBusca", val)}
                                onDropoffChange={(val) => updateField("destino", val)}
                                variants={variants}
                                direction={direction}
                            />
                        )}

                        {currentStep === 3 && (
                            <BookingStepDateTime
                                date={formData.data}
                                time={formData.hora}
                                onDateChange={(val) => updateField("data", val)}
                                onTimeChange={(val) => updateField("hora", val)}
                                variants={variants}
                                direction={direction}
                            />
                        )}

                        {currentStep === 4 && (
                            <BookingStepConfirm formData={formData} />
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="relative z-0 mt-10 flex justify-between gap-4">
                    {currentStep > 0 && (
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            className="text-neutral-400 hover:text-white hover:bg-white/5"
                            aria-label="Voltar para etapa anterior"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> VOLTAR
                        </Button>
                    )}

                    {currentStep < 4 ? (
                        <Button
                            variant="premium"
                            onClick={() => nextStep(steps.length)}
                            disabled={!isStepValid(currentStep, formData)}
                            className="ml-auto w-full sm:w-auto px-8"
                            aria-label="Continuar para próxima etapa"
                        >
                            CONTINUAR <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <button
                            onClick={() => submitBooking(formData)}
                            disabled={loading}
                            className="w-full max-w-full bg-white text-black font-bold py-4 px-4 rounded-lg hover:bg-gray-100 transition-all text-sm sm:text-base break-words"
                            aria-label="Enviar agendamento via WhatsApp"
                        >
                            {loading ? "ENVIANDO..." : "ENVIAR PARA WHATSAPP"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
