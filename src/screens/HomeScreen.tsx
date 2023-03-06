import { useState, ChangeEvent, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";

import Map, { Popup, Marker } from "react-map-gl";
import { MdCancel } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import cities from "../components/cities.json";
import SideBar from "../components/SideBar";
import mapboxgl from "mapbox-gl";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function HomeScreen() {
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [lng, setLng] = useState(3.3792);
  const [lat, setLat] = useState(6.5244);
  const [zoom, setZoom] = useState(9);
  const [city, setCity] = useState("Lagos");
  const [forecast, setForecast] = useState<any>();

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setShowFilter(true);
  };

  const handleSearch = () => {
    setLat(lat);
    setLng(lng);
  };

  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=0.1278&exclude=minutely,hourly&units=metric&appid=${weatherApiKey}`
    );
    const data = await response.json();
    setForecast(data?.daily.slice(0, 2));
  };

  const togglePopup = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    console.log(showPopup);
    handleSearch();
    fetchWeather();
  }, [showPopup, lat, lng, city]);

  return (
    <div>
      <div className="flex w-full gap-20">
        <div className="hidden md:block md:w-1/3 lg:w-1/4 h-screen overflow-scroll bg-teal-700">
          <SideBar setLat={setLat} setLng={setLng} setCity={setCity} />
        </div>

        <div className="w-full mt-10 flex-grow md:w-2/3  lg:w-3/4  text-center">
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
              <div className="w-full flex justify-center left-20 absolute z-50 ">
                <ul className="mt-2 w-1/2 rounded-md bg-white shadow-lg max-h-32 overflow-auto mx-auto">
                  {filteredCities?.map((city) => (
                    <li
                      onClick={() => {
                        setFilter(city.name);
                        setCity(city.name);
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

            <div className=" md:mx-10 lg:mx-20 mt-10">
              <Map
                style={{ height: "54vh", width: "100%" }}
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
                  <HiLocationMarker size={32} color="blue" />
                </Marker>

                {showPopup ? (
                  <Popup
                    className="z-1000 bg-red"
                    longitude={lng}
                    latitude={lat}
                    anchor="bottom"
                    // onOpen={() => setShowPopup(true)}
                    //onClose={() => setShowPopup(false)}
                  >
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">
                        Weather Forecast
                      </h2>
                      {forecast?.map((day: any, index: number) => (
                        <div key={index} className="mb-4">
                          <h3 className="text-lg font-semibold">
                            {index === 0 ? "Today" : "Tomorrow"}
                          </h3>
                          <div className="flex items-center">
                            <img
                              src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                              alt={day.weather[0].description}
                              className="w-12 h-12 mr-4"
                            />
                            <div>
                              <p className="text-gray-600">
                                {day.weather[0].description}
                              </p>
                              <p className="text-gray-600">
                                High: {day.temp.max}°C
                              </p>
                              <p className="text-gray-600">
                                Low: {day.temp.min}°C
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Popup>
                ) : null}
              </Map>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <MdCancel
                onClick={() => setShowPopup(false)}
                className="h-8 w-8"
              />

              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{city}</h2>
                {console.log(city)}
                {forecast?.map((day: any, index: number) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold">
                      {index === 0 ? "Today" : "Tomorrow"}
                    </h3>
                    <div className="flex items-center">
                      <img
                        src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                        alt={day.weather[0].description}
                        className="w-12 h-12 mr-4"
                      />
                      <div>
                        <p className="text-gray-600">
                          {day.weather[0].description}
                        </p>
                        <p className="text-gray-600">High: {day.temp.max}°C</p>
                        <p className="text-gray-600">Low: {day.temp.min}°C</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
