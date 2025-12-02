"use client"
import { useState, useEffect, useRef } from "react"
import { MapPin, Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { useJsApiLoader } from "@react-google-maps/api"
import { motion, AnimatePresence } from "motion/react"

const libraries: ("places")[] = ["places"]

interface LocationInputProps {
    value: string
    onChange: (value: string) => void
    placeholder: string
    className?: string
}

export function LocationInput({ value, onChange, placeholder, className }: LocationInputProps) {
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries,
    })

    useEffect(() => {
        if (isLoaded && !autocompleteService.current) {
            autocompleteService.current = new google.maps.places.AutocompleteService()
        }
    }, [isLoaded])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)

        if (!newValue) {
            setSuggestions([])
            setShowSuggestions(false)
            return
        }

        if (autocompleteService.current) {
            setIsLoading(true)
            autocompleteService.current.getPlacePredictions(
                {
                    input: newValue,
                    componentRestrictions: { country: "br" },
                },
                (predictions, status) => {
                    setIsLoading(false)
                    if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                        setSuggestions(predictions)
                        setShowSuggestions(true)
                    } else {
                        setSuggestions([])
                    }
                }
            )
        }
    }

    const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
        onChange(prediction.description)
        setSuggestions([])
        setShowSuggestions(false)
    }

    return (
        <div className="relative" ref={inputRef as any}>
            <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
                <input
                    value={value}
                    onChange={handleInput}
                    onFocus={() => value && suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full bg-neutral-950/30 border border-neutral-800 rounded-xl pl-12 pr-10 py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-300",
                        className
                    )}
                />
                {isLoading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-4 h-4 text-neutral-500 animate-spin" />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                    >
                        {suggestions.map((prediction) => (
                            <li
                                key={prediction.place_id}
                                onClick={() => handleSelect(prediction)}
                                className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-0 flex items-center gap-3 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                                    <MapPin className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-white font-medium">
                                        {prediction.structured_formatting.main_text}
                                    </span>
                                    <span className="text-xs text-neutral-500 group-hover:text-neutral-400">
                                        {prediction.structured_formatting.secondary_text}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}
