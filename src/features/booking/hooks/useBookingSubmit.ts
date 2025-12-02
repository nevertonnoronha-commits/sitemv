import { useState } from "react"
import { BookingFormData } from "../types/booking.types"
import { formatWhatsAppMessage } from "../utils/whatsapp-formatter"

export const useBookingSubmit = () => {
    const [loading, setLoading] = useState(false)

    const submitBooking = (formData: BookingFormData) => {
        const mensagem = formatWhatsAppMessage(formData)
        const numeroMarcus = "5571991593931"
        const url = `https://wa.me/${numeroMarcus}?text=${encodeURIComponent(mensagem)}`

        setLoading(true)
        window.open(url, "_blank")
        setTimeout(() => setLoading(false), 2000)
    }

    return {
        loading,
        submitBooking
    }
}
