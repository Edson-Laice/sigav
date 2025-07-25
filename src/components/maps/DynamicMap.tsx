'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';
import type L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Type for Leaflet Icon prototype
type DefaultIconProto = {
  _getIconUrl?: string;
  _iconUrls?: {
    iconRetina?: string;
    icon?: string;
    shadow?: string;
  };
};

// Move Leaflet icon fix to client-side only
const setupLeafletIcons = () => {
  if (typeof window === 'undefined') return;
  
  // Use dynamic import instead of require
  import('leaflet').then((L) => {
    const defaultIconProto = L.Icon.Default.prototype as DefaultIconProto;
    
    delete defaultIconProto._getIconUrl;
    delete defaultIconProto._iconUrls?.icon;
    delete defaultIconProto._iconUrls?.iconRetina;
    delete defaultIconProto._iconUrls?.shadow;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  });
};

// Dynamic imports with SSR disabled
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const RoutingController = dynamic(
  () => import('./RoutingController').then((mod) => mod.RoutingController),
  { 
    ssr: false,
    loading: () => (
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control">
          <Button variant="default" size="sm" className="m-2 shadow-md" disabled>
            <LocateFixed className="mr-2 h-4 w-4" />
            Carregando...
          </Button>
        </div>
      </div>
    )
  }
);

interface DynamicMapProps {
  darkMode?: boolean;
}

export function DynamicMap({ darkMode = false }: DynamicMapProps) {
  const [mounted, setMounted] = useState(false);
  const [leaflet, setLeaflet] = useState<typeof L | null>(null);
  const position: [number, number] = [-25.970685987397385, 32.579640268023375];
  const maxDistance = 40;

  useEffect(() => {
    setMounted(true);
    setupLeafletIcons();
    
    // Dynamically import Leaflet on client side
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        setLeaflet(L);
      });
    }
  }, []);

  if (!mounted) {
    return <div className="h-[250px] w-full bg-gray-100 rounded-lg animate-pulse" />;
  }

  const createIcon = () => {
    if (!leaflet) return undefined;
    return leaflet.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <div className="relative">
      <div style={{ height: '250px', width: '100%', position: 'relative' }}>
        <MapContainer
          center={position}
          zoom={17}
          style={{ height: '100%', width: '100%', borderRadius: '8px' }}
          attributionControl={false}
        >
          <TileLayer
            url={
              darkMode
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
          />
          <Marker position={position} icon={createIcon()}>
            <Popup className="font-sans text-sm">
              <b>Sua Localização</b> <br />
              {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </Popup>
          </Marker>
          <RoutingController 
            destination={position} 
            maxDistance={maxDistance}
            darkMode={darkMode}
          />
        </MapContainer>
      </div>
      <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-xs z-20">
        Distância máxima: {maxDistance}km
      </div>
    </div>
  );
}