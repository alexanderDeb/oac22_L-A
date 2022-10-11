import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { Link } from "react-router-dom";
import { IconLocation } from "./marker_icon";

export default function MapMarker(props) {
  const project_route = `/dashboard/node/${props.deviceId}`;
  return (
    <Marker
      position={{ lat: props.latitude, lng: props.longitude }}
      icon={IconLocation}
    >
      <Tooltip>
        <h3 className="font-bold">{props.node_name}</h3>
      </Tooltip>
      <Popup>
        <Link to={project_route}>
          <h3>Ir a {props.node_name}</h3>
        </Link>
      </Popup>
    </Marker>
  );
}
