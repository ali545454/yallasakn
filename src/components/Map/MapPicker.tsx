import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

interface MapPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}

// Component that recenters the map when `lat`/`lng` props change and
// renders a draggable marker at that position.
const RecenterAndMarker = ({ lat, lng, onChange }: MapPickerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);

  return (
    <Marker
      draggable
      position={[lat, lng]}
      eventHandlers={{
        dragend(e: any) {
          const p = e.target.getLatLng();
          onChange(p.lat, p.lng);
        },
      }}
    />
  );
};

// Component to handle clicks on the map to update coordinates.
const ClickHandler = ({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapPicker = ({ lat, lng, onChange }: MapPickerProps) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <ClickHandler onChange={onChange} />
      <RecenterAndMarker lat={lat} lng={lng} onChange={onChange} />
    </MapContainer>
  );
};

export default MapPicker;
