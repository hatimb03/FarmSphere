/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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
import { MdAssistant } from "react-icons/md";

function SetViewOnMount({ lat, long }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, long], 4);
  }, [lat, long, map]);
  return null;
}

const MapComponent = () => {
  const [openAI, setOpenAI] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLong(pos.coords.longitude);
      },
      (err) => {
        console.error("Error getting location:", err);
        setError("Unable to retrieve your location.");
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setEvents(res.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (lat !== null && long !== null) {
      fetchData();
    }
  }, [lat, long, url]); // Add lat and long as dependencies

  const calculateRadius = (magnitudeValue, magnitudeUnit) => {
    if (!magnitudeValue) return null;

    switch (magnitudeUnit) {
      case "kts":
        return magnitudeValue * 0.514444 * 3600; // Convert knots to meters
      case "acres": {
        const squareMeters = magnitudeValue * 4046.86; // Convert acres to square meters
        return Math.sqrt(squareMeters / Math.PI); // Calculate radius
      }
      default:
        console.warn(`Unknown magnitude unit: ${magnitudeUnit}`);
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (lat === null || long === null) {
    return <div>Please allow location access.</div>; // Handling case where location is not available
  }

  return (
    <div className='w-full h-[87vh] relative z-[2000]'>
      <MapContainer
        center={[lat, long]}
        zoom={4}
        minZoom={3}
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
            const magnitudeValue = event.geometry[0]?.magnitudeValue;
            const magnitudeUnit = event.geometry[0]?.magnitudeUnit;
            const radius = calculateRadius(magnitudeValue, magnitudeUnit);

            return (
              <React.Fragment key={event.id}>
                <Circle
                  center={[coordinates[1], coordinates[0]]}
                  radius={radius || 0} // Fallback to 0 if radius is null
                  pathOptions={{
                    color: radius ? "red" : "orange",
                    fillColor: radius ? "red" : "orange",
                    fillOpacity: 0.2,
                  }}
                >
                  <Popup>
                    <strong>{event.title}</strong>
                    <br />
                    {radius ? (
                      <>
                        Magnitude: {magnitudeValue} {magnitudeUnit}
                        <br />
                        Radius: {(radius / 1000).toFixed(2)} km
                      </>
                    ) : (
                      `Magnitude: ${
                        magnitudeValue || "No magnitude data available"
                      } ${magnitudeUnit}`
                    )}
                  </Popup>
                </Circle>
              </React.Fragment>
            );
          }
          return null;
        })}
      </MapContainer>
      <MdAssistant
        style={{ transition: "transform 0.3s ease" }}
        className={`text-green-800 text-4xl absolute right-0 top-[100px] z-[1000] ${
          openAI ? "rotate-90" : "-rotate-90"
        }`}
        onClick={() => setOpenAI(!openAI)}
      />
      {openAI && (
        <div className='absolute top-[100px] right-8 z-[1000] w-3/4 sm:w-1/2 rounded-sm p-2 overflow-auto h-[60vh]'>
          <AiAssistant isOpen={openAI} />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
