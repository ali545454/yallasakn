import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

interface MapPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}

const MarkerUpdater = ({ lat, lng, onChange }: MapPickerProps) => {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <Marker
      position={[lat, lng]}
      icon={L.icon({
        iconUrl: "/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })}
    />
  );
};

const MapPicker = ({ lat, lng, onChange }: MapPickerProps) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerUpdater lat={lat} lng={lng} onChange={onChange} />
    </MapContainer>
  );
};

export default MapPicker;
