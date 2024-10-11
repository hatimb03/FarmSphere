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
``;
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
          `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=1000`
        );
        // console.log(
        //   res.data.events[0].geometry[0].magnitudeValue +
        //     res.data.events[0].geometry[0].magnitudeUnit
        // );

        // const magnitudeUnit = res.data.events.map((disaster) => {
        //   disaster.geometry.map((item) => {
        //     console.log(item?.magnitudeUnit);
        //   });
        // });

        // const magnitudeValue = res.data.events.map((disaster) => {
        //   disaster.geometry.map((item) => {
        //     console.log(item?.magnitudeValue);
        //   });
        // });

        // console.log("magnitude", magnitude);
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

  const calculateRadius = (magnitudeValue, magnitudeUnit) => {
    if (!magnitudeValue) return null;

    switch (magnitudeUnit) {
      case "kts":
        // Convert knots to meters (1 knot ≈ 0.514444 m/s)
        // Assuming 1 hour of effect, multiply by 3600 seconds
        return magnitudeValue * 0.514444 * 3600;
      case "acres": {
        // Convert acres to square meters, then calculate radius
        const squareMeters = magnitudeValue * 4046.86;
        return Math.sqrt(squareMeters / Math.PI);
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
            const magnitudeValue = event.geometry[0]?.magnitudeValue;
            const magnitudeUnit = event.geometry[0]?.magnitudeUnit;
            const radius = calculateRadius(magnitudeValue, magnitudeUnit);

            return (
              <React.Fragment key={event.id}>
                {radius ? (
                  <Circle
                    center={[coordinates[1], coordinates[0]]}
                    radius={radius}
                    pathOptions={{
                      color: "red",
                      fillColor: "red",
                      fillOpacity: 0.2,
                    }}
                  >
                    <Popup>
                      <strong>{event.title}</strong>
                      <br />
                      Magnitude: {magnitudeValue} {magnitudeUnit}
                      <br />
                      Radius: {(radius / 1000).toFixed(2)} km
                    </Popup>
                  </Circle>
                ) : (
                  <Circle
                    center={[coordinates[1], coordinates[0]]}
                    pathOptions={{
                      color: "orange",
                      fillColor: "orange",
                      fillOpacity: 0.2,
                    }}
                  >
                    <Popup>
                      <strong>{event.title}</strong>
                      <br />
                      {magnitudeValue
                        ? `Magnitude: ${magnitudeValue} ${magnitudeUnit}`
                        : "No magnitude data available"}
                    </Popup>
                  </Circle>
                )}
              </React.Fragment>
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
