import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for markers
const icon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});

// Component to programmatically move the map
const FlyToDistrict = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 10, { duration: 1.5 }); // zoom to 10
    }
  }, [coordinates, map]);
  return null;
};

const DistrictMap = ({ serviceCenters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  // Handle search logic
  const handleSearch = () => {
    const found = serviceCenters.find((district) =>
      district.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (found) {
      setSelectedCoordinates([found.latitude, found.longitude]);
    } else {
      alert('District not found!');
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Box */}
      <div className="flex justify-center mb-2">
        <input
          type="text"
          placeholder="Search district (e.g., Dhaka)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Map */}
      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[23.6850, 90.3563]} // Center of Bangladesh
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Fly to selected district */}
          <FlyToDistrict coordinates={selectedCoordinates} />

          {/* Markers */}
          {serviceCenters.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
              icon={icon}
            >
              <Popup>
                <strong>{district.district}</strong><br />
                {district.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DistrictMap;
