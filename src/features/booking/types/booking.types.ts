export interface BookingFormData {
    nome: string
    telefone: string
    enderecoBusca: string
    destino: string
    data: string
    hora: string
}

export type BookingStep = "name" | "contact" | "route" | "datetime" | "confirm"

export interface StepDefinition {
    id: BookingStep
    title: string
    icon: React.ElementType
}
