import { useLocation } from "react-router-dom";
import MapComponent from "./MapComponent";

const Map = () => {
  const location = useLocation();
  const { lat, long } = location.state || {};
  return <MapComponent lat={lat} long={long} />;
};

export default Map;
