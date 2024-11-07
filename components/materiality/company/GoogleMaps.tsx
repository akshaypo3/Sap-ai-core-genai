"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface LocationProps {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  apiKey: any;
}

export default function GoogleMaps({ location, apiKey }: LocationProps) {

  const coordinates = location.latitude !== null && location.longitude !== null
  ? {
      lat: parseFloat(location.latitude.toString()),
      lng: parseFloat(location.longitude.toString()),
    }
  : null;

  return (
    <>
      <h2 className="font-semibold text-xl mb-3 pt-3">Location Map</h2>
      {coordinates ? (
      <LoadScript googleMapsApiKey={apiKey[0].key}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "423px" }}
          center={coordinates}
          zoom={15}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      </LoadScript>
       ) : (
        <p>Coordinates are not available for this location.</p>
      )}
    </>
  );
}
