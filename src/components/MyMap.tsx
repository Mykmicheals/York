import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Map, { Marker, Popup } from "react-map-gl";
//import ReactMapGL, { Marker } from "react-map-gl";
const MyMap = () => {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <Map
      style={{ height: "500px" }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        onClick={() => setShowPopup(true)}
        longitude={-100}
        latitude={40}
        anchor="bottom"
      >
        <img src="./pin.png" />
      </Marker>

      {showPopup && (
        <Popup
          longitude={-100}
          latitude={40}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          You are here
        </Popup>
      )}
    </Map>
  );
};

export default MyMap;
