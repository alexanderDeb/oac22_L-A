import L from "leaflet";
import EmcaliLogo from "../../../logo.svg"

export const IconLocation = L.icon({
  iconUrl: EmcaliLogo,
  iconRetinaUrl: EmcaliLogo,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
