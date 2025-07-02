import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Custom icon for markers
const icon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});
 

const DistrictMap = ({serviceCenters}) => {
  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow">
      <MapContainer
        center={[23.6850, 90.3563]} // Bangladesh center
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceCenters.map((district, idx) => (
          <Marker key={idx} position={[district.latitude, district.longitude]} icon={icon}>
            <Popup>
              <strong>{district.name}</strong><br />
              Coverage Available ✅
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DistrictMap;
