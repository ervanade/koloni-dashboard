import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import DropdownUser from "./DropdownUser";

const Header = (props) => {
  return (
    <header className="rounded-md sticky top-0 z-9 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-3 shadow-2 md:px-6 2xl:px-11">
        <div className={`flex items-center gap-2 sm:gap-4 ${props.sidebarOpen ? "hidden" : ""}`}>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block border border-stroke bg-sky-500 text-white  rounded-md p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark "
          >
         <BsChevronLeft size={24} className="font-bold" />
            
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
            
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
