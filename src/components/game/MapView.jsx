import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ guessedPosition, setGuessedPosition, actualPosition, disabled }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const guessMarkerRef = useRef(null);
  const actualMarkerRef = useRef(null);
  const lineRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create map centered on world view
    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      minZoom: 2,
      maxZoom: 18,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle map clicks for placing guess marker
  useEffect(() => {
    if (!mapRef.current || disabled) return;

    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;
      setGuessedPosition({ lat, lng });

      // Remove previous guess marker if exists
      if (guessMarkerRef.current) {
        mapRef.current.removeLayer(guessMarkerRef.current);
      }

      // Create custom green marker for guess
      const guessIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Add new guess marker
      const marker = L.marker([lat, lng], { icon: guessIcon }).addTo(mapRef.current);
      guessMarkerRef.current = marker;
    };

    mapRef.current.on('click', handleMapClick);

    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick);
      }
    };
  }, [disabled, setGuessedPosition]);

  // Show actual position and draw line after guess
  useEffect(() => {
    if (!mapRef.current || !actualPosition) return;

    // Remove previous actual marker and line if exists
    if (actualMarkerRef.current) {
      mapRef.current.removeLayer(actualMarkerRef.current);
    }
    if (lineRef.current) {
      mapRef.current.removeLayer(lineRef.current);
    }

    // Create custom red marker for actual position
    const actualIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: #ef4444; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add actual position marker
    const actualMarker = L.marker([actualPosition.lat, actualPosition.lng], { icon: actualIcon })
      .addTo(mapRef.current);
    actualMarkerRef.current = actualMarker;

    // Draw line between guess and actual position if guess exists
    if (guessedPosition) {
      const line = L.polyline(
        [
          [guessedPosition.lat, guessedPosition.lng],
          [actualPosition.lat, actualPosition.lng],
        ],
        {
          color: '#fbbf24',
          weight: 3,
          opacity: 0.8,
          dashArray: '10, 10',
        }
      ).addTo(mapRef.current);
      lineRef.current = line;

      // Fit map bounds to show both markers
      const bounds = L.latLngBounds([
        [guessedPosition.lat, guessedPosition.lng],
        [actualPosition.lat, actualPosition.lng],
      ]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [actualPosition, guessedPosition]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <div ref={mapContainerRef} className="w-full h-full"></div>
      
      {/* Map instructions overlay */}
      {!guessedPosition && !disabled && (
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700 z-[1000]">
          <p className="text-slate-300 text-sm">🗺️ Click on the map to place your guess</p>
        </div>
      )}

      {/* Legend when answer is revealed */}
      {actualPosition && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm p-4 rounded-lg border border-slate-700 z-[1000]"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
              <span className="text-sm text-slate-300">Your Guess</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
              <span className="text-sm text-slate-300">Actual Location</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MapView;