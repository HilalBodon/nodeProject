import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CustomMap = () => {
    return (
      <MapContainer
        center={[51.505, -0.09]} // Initial coordinates (latitude, longitude)
        zoom={13} // Initial zoom level
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A sample marker on the map.
          </Popup>
        </Marker>
      </MapContainer>
    );
  };

  export default CustomMap;
  