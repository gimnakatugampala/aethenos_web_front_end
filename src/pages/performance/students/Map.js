import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  render() {
    const mapStyles = {
      width: "100%",
      height: "100%",
    };

    return (
      <div style={{ height: "400px", position: "relative" }}>
        <Map
          google={this.props.google}
          zoom={1}
          style={mapStyles}
          initialCenter={{ lat: 51.5072, lng: 0.1276 }}
        >
          <Marker position={{ lat: 51.5072, lng: 0.1276 }} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBJqJcyyjJdgCcfSc1BgyVh_ZKU1g-Pfhk",
})(MapContainer);
