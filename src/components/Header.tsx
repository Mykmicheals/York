import {FaPhoneAlt} from "react-icons/fa";
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
// import logos from '../../src/assets/images/logo.png'
import {AiOutlineMail,AiOutlineLogin} from 'react-icons/ai'
import {BiLogIn, BiMenuAltRight} from 'react-icons/bi'
import { Link } from 'react-router-dom';

//import { useDispatch, useSelector } from "react-redux";


interface authState {
  isLoggeedin:boolean,
  token : string
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const auth:any = useSelector((state:authState) => state);

 
  return (
    <div className='relative fixed'>

        {isOpen &&<div onClick={() => setIsOpen(false)} className='w-1/2 backdrop-brightness-50 h-screen fixed top-0 right-0 z-20'></div>}

      <div className=' z-50 bg-teal-500 w-full h-12 px-8 md:px-20 pt-3' >

        <div className='flex gap-4 md:gap-24' >
        <span className='flex gap-2 md:gap-4'>
          <FaPhoneAlt className='text-white mt-1' />
          <p className='text-white'>090-234-3923</p>
        </span>
             <span className='flex gap-2 md:gap-4'>
          <AiOutlineMail className='text-white mt-1' />
         <p className='text-white'>school@gmail.com</p>
        </span>        
        </div>
       
    

      </div>
          <header className=" w-full bg-white shadow-lg z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="items-center">
            {/* <Link to='/'>
               <img className="w-48 h-12 mr-2" src={logos} alt="School logo" />
            </Link> */}
            <p>Good boy</p>
           
          </div>
          <div className="hidden md:block">
            <nav className="flex space-x-16">
              <a href="#" className="text-gray-600 hover:text-teal-500">Home</a>
              <a href="#" className="text-gray-600 hover:text-teal-500">About</a>
              <a href="#" className="text-gray-600 hover:text-teal-500">Services</a>
              <a href="#" className="text-white hover:text-gray-900 bg-teal-500 px-4 py-1 rounded-20">Contacts</a>
            </nav>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
        {!isOpen ? <BiMenuAltRight className='w-8 h-8' />:

         <h2 className=' text-2xl'>X</h2>}
        </button>


<Transition
    show={isOpen}
    enter="transition ease-out duration-200 transform"
    enterFrom="-translate-x-full"
    enterTo="translate-x-0"
    leave="transition ease-in duration-200 transform"
    leaveFrom="translate-x-0"
    leaveTo="-translate-x-full"
    className="fixed h-screen absolute top-0 w-1/2 left-0 z-50 md:hidden"
  >
    <div>
      <nav className="bg-white px-2 py-3 h-screen shadow">
         {/* <img className="h-8 mx-auto mb-12 mt-4" src={logos} alt="School logo" /> */}
        <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">Home</a>
        <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">About</a>
        <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">Services</a>
        <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">Contacts</a>
      </nav>
    </div>
  </Transition>

          </div>
        </div>
      </div>
          </header>
    </div>
  
  );
};

export default Header;



