"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "./ui/button"
import { LocationInput } from "./ui/location-input"
import { DatePicker } from "./ui/date-picker"
import { TimePicker } from "./ui/time-picker"
import { ChevronRight, ChevronLeft, Check, Calendar, Clock, MapPin, User, Phone, Map as MapIcon } from "lucide-react"
import { cn } from "../lib/utils"

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

// Helper Functions
const generateNavigationLinks = (address: string) => {
  const encoded = encodeURIComponent(address)
  return {
    googleMaps: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    waze: `https://waze.com/ul?q=${encoded}`
  }
}

const formatDateFull = (dateString: string) => {
  if (!dateString) return ""
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length >= 10) {
    return `+55 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

const generateBookingId = (date: string, time: string) => {
  const dateStr = date.replace(/-/g, '')
  const timeStr = time.replace(':', '')
  return `#WEB-${dateStr}-${timeStr}`
}

const formatWhatsAppMessage = (formData: any) => {
  const { nome, telefone, enderecoBusca, destino, data, hora } = formData

  // Formatar data em português completo
  const dataFormatada = data
    ? new Date(data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).replace(/^\w/, (c) => c.toUpperCase())
    : 'Não informada'

  const formattedPhone = formatPhone(telefone)
  const pickupLinks = generateNavigationLinks(enderecoBusca)
  const dropoffLinks = generateNavigationLinks(destino)

  // Helper to split address into lines (simple split by hyphen if available, or just return full address)
  const parseAddress = (fullAddress: string) => {
    const parts = fullAddress.split(' - ')
    if (parts.length >= 2) {
      return {
        line1: parts[0],
        line2: parts.slice(1).join(' - ')
      }
    }
    return { line1: fullAddress, line2: '' }
  }

  const origin = parseAddress(enderecoBusca)
  const destination = parseAddress(destino)

  return `NOVA SOLICITAÇÃO DE AGENDAMENTO PREMIUM

========================================

INFORMAÇÕES DO CLIENTE
Nome: ${nome}
WhatsApp: ${formattedPhone}

========================================

DETALHES DA VIAGEM SOLICITADA

ORIGEM (Ponto de Partida):
${origin.line1}
${origin.line2}
Google Maps: ${pickupLinks.googleMaps}
Waze: ${pickupLinks.waze}

DESTINO:
${destination.line1}
${destination.line2}
Google Maps: ${dropoffLinks.googleMaps}
Waze: ${dropoffLinks.waze}

========================================

HORÁRIO SOLICITADO
Data: ${dataFormatada}
Horário: ${hora}

========================================`
}

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    enderecoBusca: "",
    destino: "",
    data: "",
    hora: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleFinalSubmit = () => {
    const mensagem = formatWhatsAppMessage(formData)
    const numeroMarcus = "5571991593931"
    const url = `https://wa.me/${numeroMarcus}?text=${encodeURIComponent(mensagem)}`

    setLoading(true)
    window.open(url, "_blank")
    setTimeout(() => setLoading(false), 2000)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.nome.length > 2
      case 1: return formData.telefone.length > 8
      case 2: return formData.enderecoBusca.length > 3 && formData.destino.length > 3
      case 3: return formData.data && formData.hora
      default: return true
    }
  }

  const pickupLinks = generateNavigationLinks(formData.enderecoBusca)
  const dropoffLinks = generateNavigationLinks(formData.destino)

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
              <motion.div
                key="step0"
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
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-light text-white">Como podemos te chamar?</h4>
                </div>
                <Input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  autoFocus
                />
              </motion.div>
            )}

            {currentStep === 1 && (
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
                <Input
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(71) 99999-9999"
                  type="tel"
                  autoFocus
                />
              </motion.div>
            )}

            {currentStep === 2 && (
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
                      value={formData.enderecoBusca}
                      onChange={(value) => setFormData({ ...formData, enderecoBusca: value })}
                      placeholder="Endereço de partida"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 ml-1 mb-2 block uppercase tracking-widest">Para onde vamos?</label>
                    <LocationInput
                      value={formData.destino}
                      onChange={(value) => setFormData({ ...formData, destino: value })}
                      placeholder="Destino final"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
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
                      value={formData.data}
                      onChange={(date) => setFormData({ ...formData, data: date })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 ml-1 mb-2 block uppercase tracking-widest">Horário</label>
                    <TimePicker
                      value={formData.hora}
                      onChange={(time) => setFormData({ ...formData, hora: time })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
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
              onClick={nextStep}
              disabled={!isStepValid()}
              className="ml-auto w-full sm:w-auto px-8"
              aria-label="Continuar para próxima etapa"
            >
              CONTINUAR <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <button
              onClick={handleFinalSubmit}
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

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full bg-neutral-950/30 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-300",
        className
      )}
      {...props}
    />
  )
}