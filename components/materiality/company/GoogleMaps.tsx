"use client";

import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";

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
  const googleMapsApiKey = apiKey[0].key;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey
});

if (loadError) {
  return <div>Error loading maps</div>;
}

if (!isLoaded) {
  return <div>Loading maps</div>;
}
  return (
    <>
      <h2 className="font-semibold text-xl mb-3 pt-3">Location Map</h2>
      {coordinates ? (
      //<LoadScript googleMapsApiKey={apiKey[0].key}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "423px" }}
          center={coordinates}
          zoom={15}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      //</LoadScript>
       ) : (
        <p>Coordinates are not available for this location.</p>
      )}
    </>
  );
}
