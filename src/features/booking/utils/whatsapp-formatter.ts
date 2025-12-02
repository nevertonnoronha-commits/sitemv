import { BookingFormData } from "../types/booking.types"

export const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length >= 10) {
        return `+55 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }
    return phone
}

export const generateNavigationLinks = (address: string) => {
    const encoded = encodeURIComponent(address)
    return {
        googleMaps: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
        waze: `https://waze.com/ul?q=${encoded}`
    }
}

export const formatDateFull = (dateString: string) => {
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

export const generateBookingId = (date: string, time: string) => {
    const dateStr = date.replace(/-/g, '')
    const timeStr = time.replace(':', '')
    return `#WEB-${dateStr}-${timeStr}`
}

export const formatWhatsAppMessage = (formData: BookingFormData) => {
    const { nome, telefone, enderecoBusca, destino, data, hora } = formData

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
