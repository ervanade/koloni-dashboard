import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { FaWhatsapp } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set the initial state based on the current window size
    handleResize();

    // Add event listener to update state on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col md:py-2 md:px-6 2xl:px-8 overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto px-4 md:px-0  py-4 md:py-6 2xl:py-10">
              <Outlet />
            </div>
          
          </main>
          
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      <section className="footer bg-white text-[#495565] py-2 sm:py-4 border-t border-slate-200 ">

<p className="text-center text-sm">Copyright 2025 - <a href="https://media-lab.id/"  target="_blank" rel="noopener noreferrer" className="text-sky-500">Media-Lab</a></p>
</section>
<a
        href="https://wa.me/+6281288756302
      "
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-sky-500 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center gap-2 md:gap-2"
      >
        <FaWhatsapp className="h-6 w-6" />
        <span className="hidden md:inline font-medium">
         Contact Us
        </span>
      </a>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default Layout;
