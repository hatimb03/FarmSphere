/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AiAssistant from "./AiAssistant";

function SetViewOnMount({ lat, long }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, long], 13);
  }, [lat, long, map]);
  return null;
}

const MapComponent = ({ lat, long }) => {
  return (
    <div className='w-full h-[87vh] relative'>
      <MapContainer
        center={[lat, long]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <SetViewOnMount lat={lat} long={long} />
        <Marker position={[lat, long]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <div className='absolute top-[100px] right-0 z-[1000] w-1/2 max-w-md shadow-lg rounded-sm p-2 min-h-2/3'>
        <AiAssistant />
      </div>
    </div>
  );
};

export default MapComponent;
