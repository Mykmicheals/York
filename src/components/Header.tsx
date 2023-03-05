import { FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import logos from "../../src/assets/images/logo.png";
import { AiOutlineMail } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import SideBar from "./SideBar";
import { useDispatch } from "react-redux";
import { setLat, setLng } from "../store/store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const setLatitude = () => {
    dispatch(setLat);
  };

  const setLongitude = () => {
    dispatch(setLng);
  };

  return (
    <div className="relative fixed">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="w-1/2 backdrop-brightness-50 h-screen fixed top-0 right-0 z-20"
        ></div>
      )}

      <div className=" z-50 bg-teal-500 w-full h-12 px-8 md:px-20 pt-3">
        <div className="flex gap-4 md:gap-24">
          <span className="flex gap-2 md:gap-4">
            <FaPhoneAlt className="text-white mt-1" />
            <p className="text-white">081-3515-9897</p>
          </span>
          <span className="flex gap-2 md:gap-4">
            <AiOutlineMail className="text-white mt-1" />
            <p className="text-white">myk@gmail.com</p>
          </span>
        </div>
      </div>
      <header className=" w-full bg-white shadow-lg z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="items-center">
              <img className="w-32 h-12 mr-2" src={logos} alt="School logo" />
            </div>
    
            <div className="md:hidden">
              <button
                type="button"
                className="block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                {!isOpen ? (
                  <BiMenuAltRight className="w-8 h-8" />
                ) : (
                  <h2 className=" text-2xl">X</h2>
                )}
              </button>

              <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-200 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                className="fixed h-screen overflow-scroll absolute top-0 w-2/3 left-0 z-50 md:hidden"
              >
                <div className="w-full h-screen overflow-scroll bg-teal-700">
                  <SideBar />
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
