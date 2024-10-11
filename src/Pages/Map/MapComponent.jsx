/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AiAssistant from "./AiAssistant";
import axios from "axios";

function SetViewOnMount({ lat, long }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, long], 4);
  }, [lat, long, map]);
  return null;
}

const MapComponent = ({ lat, long }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=50`
        );
        setEvents(res.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full h-[87vh] relative'>
      <MapContainer
        center={[lat, long]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <SetViewOnMount lat={lat} long={long} />
        <Marker position={[lat, long]}>
          <Popup>Your Location</Popup>
        </Marker>
        {events.map((event) => {
          const coordinates = event.geometry[0]?.coordinates;
          if (coordinates && coordinates.length >= 2) {
            return (
              <Marker
                key={event.id}
                position={[coordinates[1], coordinates[0]]}
              >
                <Popup>
                  <strong>{event.title}</strong>
                  <br />
                  Type: {event.categories[0]?.title}
                  <br />
                  Date: {new Date(event.geometry[0]?.date).toLocaleDateString()}
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
      <div className='absolute top-[100px] right-0 z-[1000] w-1/2 max-w-md rounded-sm p-2 min-h-2/3'>
        <AiAssistant />
      </div>
    </div>
  );
};

export default MapComponent;
