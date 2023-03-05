import { useState, ChangeEvent, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
// import Map, { GeolocateControl, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Popup, Marker } from "react-map-gl";
import { HiLocationMarker } from "react-icons/hi";
import Rodal from "rodal";
// include styles
import "rodal/lib/rodal.css";

function HomeScreen() {
  interface cities {
    name: string;
    lat: number;
    lng: number;
  }
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const [cities, setCities] = useState<cities[]>([
    { name: "New York City", lat: 40.7128, lng: -74.006 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { name: "Chicago", lat: 41.8781, lng: -87.6298 },
    { name: "Houston", lat: 29.7604, lng: -95.3698 },
    { name: "Philadelphia", lat: 39.9526, lng: -75.1652 },
    // ...add more cities here
  ]);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setShowFilter(true);
  };

  const [lng, setLng] = useState(3.3792);
  const [lat, setLat] = useState(6.5244);
  const [zoom, setZoom] = useState(9);

  const map = useRef<mapboxgl.Map | null>(null);

  const handleSearch = () => {
    if (!map.current) return; // wait for map to initialize
    map.current.setCenter([lng, lat]);
    setLat(lat);
    setLng(lng);
  };

  useEffect(() => {
    console.log(lat);
    handleSearch();
  }, [showPopup, lat, lng]);

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=random&countrycode=&limit=20&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`);
  //     const data = await response.json();
  //     setRegions(data.results);
  //   }
  //   fetchCities();
  // }, []);

  // const [city,setCity] = useState<any>()

  // useEffect(() => {
  //   const getCitiesCoordinates = async () => {
  //     const citiesList = ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington DC'];

  //     const citiesWithCoordinates = await Promise.all(
  //       citiesList.map(async city => {
  //         const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${process.env.REACT_APP_OPENCAGE_API_KEY}`);
  //         const data = await response.json();
  //         const [lng, lat] = data.features[0].center;
  //         return { name: city, lat, lng };
  //       })
  //     );

  //     setCity(citiesWithCoordinates);
  //   }

  //   getCitiesCoordinates();
  // }, []);

  return (
    <div>
      <div className="flex w-full gap-20">
        <div className="w-1/4 h-screen bg-teal-700">
          Cities
          <h3 className="text-white text-center text-3xl font-mono mt-8"></h3>
          <div className="mt-12 mx-10">
            {cities.map((each: any) => {
              return (
                <p className="text-gray-300 text-xl pointer mb-8 hover:border hover:px-4 hover:py-1 hover:bg-teal-900">
                  {each.name}
                </p>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex-grow w-3/4  text-center">
          <div>
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                className="block w-full rounded-full bg-gray-100 border-transparent focus:border-gray-500  focus:ring-0 pl-10 pr-10 py-2 text-sm placeholder-gray-500 focus:outline-none"
                type="text"
                placeholder="Search for Student"
                value={filter}
                onChange={handleFilterChange}
              />

              <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                <button
                  onClick={handleSearch}
                  className="px-4 bg-teal-500 text-white rounded-r-full focus:outline-none"
                >
                  Search
                </button>
              </div>
            </div>

            {showFilter && (
              <div className="w-full flex justify-center">
                <ul className="mt-2 w-1/2 rounded-md bg-white shadow-lg max-h-32 overflow-auto mx-auto">
                  {filteredCities?.map((city) => (
                    <li
                      onClick={() => {
                        setFilter(city.name);
                        setShowFilter(false);
                        setLat(city.lat);
                        setLng(city.lng);
                      }}
                      key={city.lat}
                      className="py-2 px-3 hover:bg-gray-100"
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Map
              style={{ height: "500px", width: "90%" }}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              longitude={lng}
              latitude={lat}
              zoom={zoom}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker
                onClick={() => setShowPopup(true)}
                longitude={lng}
                latitude={lat}
                anchor="bottom"
              >
                <HiLocationMarker
                  onClick={() => setShowPopup(true)}
                  size={32}
                  color="blue"
                />
              </Marker>

              {showPopup ? (
                <Popup
                  className="z-1000 bg-red"
                  longitude={lng}
                  latitude={lat}
                  anchor="bottom"
                  onClose={() => setShowPopup(false)}
                >
                  <p>this is a good popup</p>
                </Popup>
              ) : null}
            </Map>
          </div>
        </div>

        {/* <Rodal visible={showPopup} onClose={() => setShowPopup(false)}></Rodal> */}
      </div>
    </div>
  );
}

export default HomeScreen;
