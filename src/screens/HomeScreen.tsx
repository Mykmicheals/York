import {useState,ChangeEvent} from 'react'
import { FaSearch } from 'react-icons/fa';


const cities =[
    'Lagos',
    'Abijan',
    'Luhansk',
    'Mauriopol',
    'Anthens'
]

function HomeScreen() {

      const [filter, setFilter] = useState('');

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(filter.toLowerCase())
  );

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

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
  {/* <button
    className="absolute top-0 right-0 h-full px-4 bg-teal-500 text-white rounded-r-full focus:outline-none"
  >
    Search
  </button> */}
        <ul className="mt-2 rounded-md bg-white shadow-lg max-h-32 overflow-auto">
        {filteredCities.map(country => (
          <li key={country} className="py-2 px-3 hover:bg-gray-100">
            {country}
          </li>
        ))}
      </ul>
</div>


        </div>

    </div>
  )
}

export default HomeScreen