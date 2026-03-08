"use client";
import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix for Marker Icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- ROAD ROUTING COMPONENT ---
function RoutingEngine({ stops }: { stops: any[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || stops.length < 2) return;

    // Create waypoints from your stops
    const waypoints = stops.map(s => L.latLng(s.Latitude, s.Longitude));

    // Initialize the routing control
    const routingControl = (L as any).Routing.control({
      waypoints: waypoints,
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 6, opacity: 0.8 }], // Uber Blue
        extendToWaypoints: true,
        missingRouteTolerance: 10
      },
      show: false, // Hide the text instructions panel
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: () => null, // We use our own markers
    }).addTo(map);

    return () => {
      try {
        map.removeControl(routingControl);
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    };
  }, [map, stops]);

  return null;
}

export default function TripMap({ stops }: { stops: any[] }) {
  // --- DEBUGGING: PRINT TO CONSOLE ---
  useEffect(() => {
    console.log("📍 MAP UPDATE - Current Stops Data:", stops);
  }, [stops]);

  return (
    <MapContainer 
      center={[6.9271, 79.8612]} 
      zoom={10} 
      className="w-full h-full rounded-32px z-0"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      
      {stops.map((stop, idx) => (
        <Marker key={idx} position={[stop.Latitude, stop.Longitude]}>
            <Popup>
                <div className="p-2 font-sans">
                    <p className="font-black text-slate-800 leading-tight">{stop.Name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{stop.City}</p>
                </div>
            </Popup>
        </Marker>
      ))}

      {/* This component handles the actual "Road" routing */}
      <RoutingEngine stops={stops} />
    </MapContainer>
  );
}