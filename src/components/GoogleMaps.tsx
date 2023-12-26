import React from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    width: '100%',
    height: '80vh',
}
const center = {
    lat: 31.968599,
    lng: -99.901810,
}

export default function GoogleMaps() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    });
    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={center}
        >
            <Marker position={center} />

        </GoogleMap>
    )
}