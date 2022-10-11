import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MapMarker from "./map_marker";
import { Link } from "react-router-dom";

export default function NodeMapView(props) {
  const center = [3.3610444332587726, -76.52656594442351];

  const map_nodes = props.nodes.map((node_data) => {
    return (
      <MapMarker
        latitude={node_data.latitude}
        longitude={node_data.longitude}
        node_name={node_data.name}
        node_id={node_data.id}
        deviceId={node_data.deviceId}
      />
    );
  });

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* mapeo de los marcadores */}
      {map_nodes}

    </MapContainer>
  );
}
