'use client';
import { useState, useEffect } from 'react';
import { Polyline, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';
import type L from 'leaflet';

interface RoutingControllerProps {
  destination: [number, number];
  maxDistance: number;
  darkMode: boolean;
}

type LeafletIconOptions = {
  iconUrl: string;
  iconRetinaUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
  shadowUrl: string;
  shadowSize: [number, number];
};

export function RoutingController({ 
  destination,
  maxDistance,
  darkMode
}: RoutingControllerProps) {
  const [route, setRoute] = useState<[number, number][] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leaflet, setLeaflet] = useState<typeof L | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        setLeaflet(L);
      });
    }
  }, []);

  const createIcon = (iconUrl: string): L.Icon | undefined => {
    if (!leaflet) return undefined;
    
    const iconOptions: LeafletIconOptions = {
      iconUrl,
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      shadowSize: [41, 41]
    };
    
    return new leaflet.Icon(iconOptions);
  };

  const calculateRoute = (userPos: [number, number]) => {
    if (!leaflet) return;
    
    const distance = leaflet.latLng(userPos).distanceTo(leaflet.latLng(destination)) / 1000;
    
    if (distance > maxDistance) {
      setError(`Localização fora do raio de ${maxDistance}km`);
      return;
    }

    setRoute([userPos, destination]);
  };

  const handleLocate = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setError('Geolocalização não disponível');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(userPos);
        calculateRoute(userPos);
        setLoading(false);
      },
      (err) => {
        setError(err.message || 'Não foi possível obter a localização');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control">
        <Button 
          variant="default" 
          size="sm" 
          className="m-2 shadow-md"
          onClick={handleLocate}
          disabled={loading || !leaflet}
        >
          <LocateFixed className="mr-2 h-4 w-4" />
          {loading ? 'Buscando...' : 'Ir'}
        </Button>
      </div>
      {error && (
        <div className="leaflet-control leaflet-bar bg-white/90 p-2 text-red-500 text-sm rounded shadow">
          {error}
        </div>
      )}
      {route && leaflet && (
        <Polyline 
          positions={route} 
          color={darkMode ? '#3b82f6' : '#2563eb'} 
          weight={3}
        />
      )}
      {userLocation && (
        <Marker 
          position={userLocation}
          icon={createIcon('https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-blue.png')}
        >
          <Popup className="font-sans text-sm">
            <b>Sua Localização Atual</b>
          </Popup>
        </Marker>
      )}
    </div>
  );
}