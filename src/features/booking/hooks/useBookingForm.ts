import { useState } from "react"
import { BookingFormData } from "../types/booking.types"

export const useBookingForm = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [direction, setDirection] = useState(0)
    const [formData, setFormData] = useState<BookingFormData>({
        nome: "",
        telefone: "",
        enderecoBusca: "",
        destino: "",
        data: "",
        hora: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const updateField = (field: keyof BookingFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = (totalSteps: number) => {
        if (currentStep < totalSteps - 1) {
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

    return {
        currentStep,
        direction,
        formData,
        handleChange,
        updateField,
        nextStep,
        prevStep
    }
}
