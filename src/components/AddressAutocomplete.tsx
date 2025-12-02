import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Input } from "./ui/input";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder,
  autoFocus,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const autocompleteService = useRef<any>(null);

  useEffect(() => {
    // Inicializar Google Maps Autocomplete Service
    const initAutocomplete = () => {
      if (window.google && window.google.maps) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
      }
    };

    if (window.google) {
      initAutocomplete();
    } else {
      window.addEventListener('load', initAutocomplete);
    }

    return () => {
      window.removeEventListener('load', initAutocomplete);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const searchAddresses = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    // Se Google Maps estiver disponível
    if (autocompleteService.current) {
      try {
        autocompleteService.current.getPlacePredictions(
          {
            input: query,
            componentRestrictions: { country: 'br' },
            types: ['address'],
            // Priorizar Salvador e região
            location: new window.google.maps.LatLng(-12.9714, -38.5014),
            radius: 50000, // 50km
          },
          (predictions: any, status: any) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              setSuggestions(predictions);
            } else {
              setSuggestions([]);
            }
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error('Erro ao buscar endereços:', error);
        // Fallback para endereços mockados
        useMockAddresses(query);
      }
    } else {
      // Fallback para endereços mockados se Google Maps não estiver carregado
      useMockAddresses(query);
    }
  };

  const useMockAddresses = (query: string) => {
    // Mock addresses para desenvolvimento/fallback
    const mockAddresses = [
      { description: `Av. Sete de Setembro - ${query}, Salvador - BA`, place_id: '1' },
      { description: `R. da Paciência - ${query}, Rio Vermelho, Salvador - BA`, place_id: '2' },
      { description: `Av. Tancredo Neves - ${query}, Pituba, Salvador - BA`, place_id: '3' },
      { description: `R. Professor Magalhães Neto - ${query}, Itaigara, Salvador - BA`, place_id: '4' },
      { description: `Av. Octávio Mangabeira - ${query}, Barra, Salvador - BA`, place_id: '5' },
    ].filter((addr) => addr.description.toLowerCase().includes(query.toLowerCase()));

    setTimeout(() => {
      setSuggestions(mockAddresses);
      setIsLoading(false);
    }, 300);
  };

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setShowSuggestions(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      searchAddresses(newValue);
    }, 300);
  };

  const handleSelectSuggestion = (suggestion: any) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="relative group">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30 z-10" />
        <Input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => value.length >= 3 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="bg-white/5 border-white/10 text-white pl-10 pr-10 h-12 focus:border-white/30 focus:ring-0 placeholder:text-white/30 rounded-xl transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          autoFocus={autoFocus}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30 animate-spin" />
        )}
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.place_id || index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-all duration-300 text-sm border-b border-white/5 last:border-b-0 group relative overflow-hidden"
            >
              <div className="flex items-start gap-3 relative z-10">
                <MapPin className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{suggestion.description}</span>
              </div>
              
              {/* Hover Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          ))}
        </div>
      )}

      {/* Hint Text */}
      <p className="text-white/30 text-xs mt-2 text-center">
        {autocompleteService.current ? '📍 Busca integrada com Google Maps' : 'Digite endereço completo'}
      </p>
    </div>
  );
}
