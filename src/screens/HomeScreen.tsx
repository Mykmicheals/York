import React from 'react'
import { FaSearch } from 'react-icons/fa';

function HomeScreen() {
  return (
     <div className='flex w-full gap-20'>
        <div className='w-1/4 h-screen bg-teal-700'>
            <h3 className='text-white text-center text-3xl font-mono mt-8'>Profile</h3>
            <div className='mt-12 mx-10'>
                          <p className='text-gray-300 text-xl pointer mb-8 hover:border hover:px-4 hover:py-1 hover:bg-teal-900'>Change Password</p>
                <p className='text-gray-300 text-xl pointer mb-8 hover:border hover:px-4 hover:py-1 hover:bg-teal-900'>Upload Results</p>
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
  />
  <button
    className="absolute top-0 right-0 h-full px-4 bg-teal-500 text-white rounded-r-full focus:outline-none"
  >
    Search
  </button>
</div>


        </div>

    </div>
  )
}

export default HomeScreen