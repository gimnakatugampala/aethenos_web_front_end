import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";

function App() {
  const center = [51.505, -0.09]; // Initial map center coordinates

  return (
    <div className="App">
      <h1>Simple React Map</h1>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>A simple marker with a popup.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
