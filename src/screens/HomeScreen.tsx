import {useState,ChangeEvent, useEffect,useRef} from 'react'
import { FaSearch } from 'react-icons/fa';
import Map, { GeolocateControl, Marker } from "react-map-gl";
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  lng: number;
  lat: number;
  zoom: number;
}
const cities =[
    'Lagos',
    'Abijan',
    'Luhansk',
    'Mauriopol',
    'Anthens'
]

function HomeScreen() {

  console.log()
;
const [filter, setFilter] = useState('');
const [showFilter,setShowFilter] = useState(false)

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(filter.toLowerCase())
  );

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setShowFilter(true)
  };
  const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);

const mapContainer = useRef<HTMLDivElement | null>(null);
const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current!,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
    });
     
    useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)));
      setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)));
      setZoom(parseFloat(map.current!.getZoom().toFixed(2)));

    });
    });

  

  return (
     <div className='flex w-full gap-20'>
        <div className='w-1/4 h-screen bg-teal-700'>
            <h3 className='text-white text-center text-3xl font-mono mt-8'>Cities</h3>
            <div className='mt-12 mx-10'>
                {cities.map((each)=>{
                    return(
                    <p className='text-gray-300 text-xl pointer mb-8 hover:border hover:px-4 hover:py-1 hover:bg-teal-900'>{each}</p>
                    )
                })}          
                </div>
        </div>

        
        <div className='mt-10 flex-grow w-3/4  text-center'>
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
      className="px-4 bg-teal-500 text-white rounded-r-full focus:outline-none"
    >
      Search
    </button>
  </div>
</div>

{showFilter && (
    <div className="w-full flex justify-center">
      <ul className="mt-2 w-1/2 rounded-md bg-white shadow-lg max-h-32 overflow-auto mx-auto">
        {filteredCities.map((country) => (
          <li
            onClick={() => {
              setFilter(country);
              setShowFilter(false);
            }}
            key={country}
            className="py-2 px-3 hover:bg-gray-100"
          >
            {country}
          </li>
        ))}
      </ul>
    </div>
)}



        </div>

        <div>
<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
<div ref={mapContainer} className="map-container" />
</div>

        {/* <div id="map" className="w-full h-full"></div> */}



    </div>
  )
}

export default HomeScreen