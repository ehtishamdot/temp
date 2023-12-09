import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, useMap } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '68vh',
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE',
    libraries,
  });

  const [currentPosition, setCurrentPosition] = useState(null);

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setCurrentPosition({ lat: latitude, lng: longitude });
  };

  const errorCallback = (error) => {
    console.error('Error getting user location:', error);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={currentPosition ? 18 : 6}
      center={currentPosition || { lat: 55.3781, lng: -3.4360 }}
    >
      {currentPosition && <Marker position={currentPosition} />}
    </GoogleMap>
  );
};

export default Map;
