import { BookingFormData } from "../types/booking.types"

export const isStepValid = (step: number, formData: BookingFormData): boolean => {
    switch (step) {
        case 0: return formData.nome.length > 2
        case 1: return formData.telefone.length > 8
        case 2: return formData.enderecoBusca.length > 3 && formData.destino.length > 3
        case 3: return !!(formData.data && formData.hora)
        default: return true
    }
}
