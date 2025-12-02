import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Loader2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

interface MapLocationPickerProps {
  onLocationSelect: (address: string, lat: number, lng: number) => void;
  label: string;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function MapLocationPicker({ onLocationSelect, label }: MapLocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        // Aguardar até 10 segundos para o Google Maps carregar
        const googleMapsLoaded = await waitForGoogleMaps(10000);
        
        if (!googleMapsLoaded) {
          if (isMounted) {
            setError("Erro ao carregar Google Maps. Recarregue a página.");
            setLoading(false);
          }
          return;
        }

        // Pegar localização do usuário
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (isMounted) {
                const coords = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                setCurrentCoords(coords);
                initMap(coords);
                toast.success("Localização obtida com sucesso!");
              }
            },
            (error) => {
              console.warn("Geolocation error:", error);
              if (isMounted) {
                // Fallback para Salvador
                const defaultCoords = { lat: -12.9714, lng: -38.5014 };
                setCurrentCoords(defaultCoords);
                initMap(defaultCoords);
                toast.info("Usando localização padrão: Salvador, BA");
              }
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        } else {
          if (isMounted) {
            const defaultCoords = { lat: -12.9714, lng: -38.5014 };
            setCurrentCoords(defaultCoords);
            initMap(defaultCoords);
          }
        }
      } catch (err) {
        console.error("Map initialization error:", err);
        if (isMounted) {
          setError("Erro ao inicializar mapa");
          setLoading(false);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
    };
  }, []);

  const waitForGoogleMaps = (timeout: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const checkGoogle = () => {
        if (window.google && window.google.maps) {
          resolve(true);
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          resolve(false);
          return;
        }
        
        setTimeout(checkGoogle, 100);
      };
      
      checkGoogle();
    });
  };

  const initMap = (center: { lat: number; lng: number }) => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      setError("Google Maps não está disponível");
      setLoading(false);
      return;
    }

    try {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 16,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
          { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#000000" }] },
          { featureType: "landscape", stylers: [{ color: "#0a0a0a" }] },
          { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
          { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
          { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
          { featureType: "water", stylers: [{ color: "#0a0a0a" }] },
        ],
      });

      const newMarker = new window.google.maps.Marker({
        position: center,
        map: googleMap,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#ffffff",
          fillOpacity: 1,
          strokeColor: "#000000",
          strokeWeight: 2,
        },
      });

      setMap(googleMap);
      setMarker(newMarker);
      setLoading(false);
      setError(null);

      // Obter endereço inicial
      getAddressFromLatLng(center.lat, center.lng);

      // Listener para arrastar marcador
      newMarker.addListener("dragend", () => {
        const position = newMarker.getPosition();
        if (position) {
          const lat = position.lat();
          const lng = position.lng();
          setCurrentCoords({ lat, lng });
          getAddressFromLatLng(lat, lng);
        }
      });

      // Listener para clique no mapa
      googleMap.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          newMarker.setPosition(e.latLng);
          setCurrentCoords({ lat, lng });
          getAddressFromLatLng(lat, lng);
        }
      });
    } catch (err) {
      console.error("Error creating map:", err);
      setError("Erro ao criar mapa");
      setLoading(false);
    }
  };

  const getAddressFromLatLng = (lat: number, lng: number) => {
    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const address = results[0].formatted_address;
        setSelectedAddress(address);
        onLocationSelect(address, lat, lng);
      }
    });
  };

  const recenterToCurrentLocation = () => {
    if (!navigator.geolocation || !map || !marker) return;

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(coords);
        marker.setPosition(coords);
        setCurrentCoords(coords);
        getAddressFromLatLng(coords.lat, coords.lng);
        setLoading(false);
        toast.success("Localização atualizada!");
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLoading(false);
        toast.error("Não foi possível obter sua localização");
      }
    );
  };

  if (error) {
    return (
      <div className="space-y-3">
        <label className="text-white text-sm font-medium">{label}</label>
        <div className="w-full h-64 sm:h-80 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center justify-center">
          <div className="text-center p-6">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-red-400 text-sm mb-2">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Recarregar Página
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-white text-sm font-medium">{label}</label>
        <Button
          type="button"
          onClick={recenterToCurrentLocation}
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs text-white/60 hover:text-white hover:bg-white/5"
          disabled={loading || !map}
        >
          <Navigation className="w-3 h-3 mr-1.5" />
          Minha Localização
        </Button>
      </div>

      {/* Mapa */}
      <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 bg-black/20">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
              <p className="text-white/60 text-sm">Carregando mapa...</p>
              <p className="text-white/40 text-xs">Aguarde alguns segundos</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* Coordenadas (Debug) */}
      {currentCoords && (
        <div className="text-xs text-white/20 text-center">
          {currentCoords.lat.toFixed(6)}, {currentCoords.lng.toFixed(6)}
        </div>
      )}

      {/* Endereço Selecionado */}
      {selectedAddress && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
          <MapPin className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-white/40 mb-1">Endereço selecionado:</p>
            <p className="text-sm text-white leading-relaxed">{selectedAddress}</p>
          </div>
        </div>
      )}

      <p className="text-xs text-white/30 text-center">
        Arraste o marcador ou clique no mapa para ajustar a localização
      </p>
    </div>
  );
}
