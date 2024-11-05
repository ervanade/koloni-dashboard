import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineDatabase } from "react-icons/ai";
import {
  MdContentPasteSearch,
  MdOutlineDomainVerification,
  MdReport,
} from "react-icons/md";
import { FaBars, FaChevronLeft, FaTasks, FaUsers } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaChartBar, FaChartColumn } from "react-icons/fa6";
import { RiUserSearchLine } from "react-icons/ri";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      //   setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-99 flex h-screen w-70 flex-col overflow-y-hidden bg-white duration-100 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0 block" : "-translate-x-full hidden"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 lg:py-4 round">
        <NavLink to="/">
          <img src={`/logo-koloni.png`} alt="Logo" className="h-13 px-2" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block bg-sky-500 text-white rounded-md p-1.5"
        >
          <BsChevronRight size={24} className="font-bold" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-100 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" py-4 px-4 ">
          {/* <!-- Menu Group --> */}
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3> */}

            <ul className="mb-6 flex flex-col gap-1.5 text-[15px]">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 py-3 font-medium hover:text-white text-textBold duration-100 ease-in-out hover:bg-gradient-to-r from-blue-600 to-sky-500 dark:hover:bg-meta-4 ${
                    (pathname === "/" || pathname.includes("dashboard")) &&
                    "bg-gradient-to-r from-blue-600 to-sky-500 dark:bg-meta-4 !text-white"
                  }`}
                >
                  <HiOutlineHome size={22} />
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/discovery"
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 py-3 font-medium hover:text-white text-textBold duration-100 ease-in-out hover:bg-gradient-to-r from-blue-600 to-sky-500 dark:hover:bg-meta-4 ${
                    (pathname === "/discovery" ||
                      pathname.includes("discovery")) &&
                    "bg-gradient-to-r from-blue-600 to-sky-500 dark:bg-meta-4 !text-white"
                  }`}
                >
                  <MdContentPasteSearch size={22} />
                  Discovery
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/analyser"
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 py-3 font-medium hover:text-white text-textBold duration-100 ease-in-out hover:bg-gradient-to-r from-blue-600 to-sky-500 dark:hover:bg-meta-4 ${
                    (pathname === "/analyser" ||
                      pathname.includes("analyser")) &&
                    "bg-gradient-to-r from-blue-600 to-sky-500 dark:bg-meta-4 !text-white"
                  }`}
                >
                  <RiUserSearchLine size={22} />
                  Analyser
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/analytics"
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 py-3 font-medium hover:text-white text-textBold duration-100 ease-in-out hover:bg-gradient-to-r from-blue-600 to-sky-500 dark:hover:bg-meta-4 ${
                    (pathname === "/analytics" ||
                      pathname.includes("analytics")) &&
                    "bg-gradient-to-r from-blue-600 to-sky-500 dark:bg-meta-4 !text-white"
                  }`}
                >
                  <FaChartColumn size={22} />
                  Brand Analytics
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
