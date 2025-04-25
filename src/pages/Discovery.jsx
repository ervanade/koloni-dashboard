import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { FaFileExport, FaFilter, FaInstagram, FaMinus, FaVideo } from "react-icons/fa6";
import {
  FaHistory,
  FaLine,
  FaPlay,
  FaTiktok,
  FaUserPlus,
  FaYoutube,
} from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from "../data/top100Films";
import Filter from "../components/Discovery/Filter";
import Similiar from "../components/Discovery/Similiar";
import History from "../components/Discovery/History";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';
import { useSearchParams } from "react-router-dom";


const Discovery = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [showSimiliar, setShowSimiliar] = useState(true);
  const [activeTab, setActiveTab] = useState("filter");
  const [dataResult, setDataResult] = useState(null);
  const user = useSelector((a) => a.auth.user);
  const [dataCredits, setDataCredits] = useState(user);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const exportAllToPDF = async () => {
    Swal.fire({
      title: "Exporting PDF...",
      text: "Please wait while the document is being generated.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    const element = document.getElementById("discovery");
    if (!element) {
      Swal.fire({
        icon: "error",
        title: "Export Failed!",
        text: "Element #discovery not found.",
      });
      return;
    }
  
    try {
      const dataUrl = await domtoimage.toPng(element);
      const img = new Image();
      img.src = dataUrl;
      const widthPaper = window.innerWidth < 1280 ? window.innerWidth / 3 : window.innerWidth / 4;
      const heightPaper = window.innerWidth < 768 ? 1500 : 1000;
      img.onload = () => {
        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: [heightPaper * 0.264583, widthPaper * 0.264583], // Konversi dari px ke mm
        });
  
        pdf.addImage(dataUrl, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save(`Results_Discovery.pdf`);
  
        Swal.close();
        Toast.fire({
          icon: "success",
          title: "Success Export PDF",
        });
      };
    } catch (error) {
      console.error("Error exporting PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Export Failed!",
        text: "An error occurred while generating the PDF. Please try again.",
      });
    }
  };
  const [searchParams] = useSearchParams();
  const similiar = searchParams.get("similiar"); // Ambil query parameter
  useEffect(() => {
    if (similiar) {
      setActiveTab("similiar")
    }
  }, [similiar]);
  

  const fetchUserData = async () => {
    try {
      // eslint-disable-next-line
      const responseUser = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/user`,
        headers: {
          "Content-Type": "application/json",
          //eslint-disable-next-line
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }).then(function (response) {
        // handle success
        // console.log(response)
        const data = response.data;
        setDataCredits({
          email: data?.email,
          username: data.first_name + data.last_name,
          profile: "",
          profileName: "",
          roles: data?.roles || "",
          credits: data?.credits || "",
        });
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="discovery" id="discovery">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">Discovery</h1>
          <p className="font-normal text-textThin">
            Discover the right creators for your campaigns
          </p>
          <a href="https://drive.google.com/file/d/1ko5jFUV-r_gfY_mrj9fuvTEnquiNFgby/view?usp=drive_link" className=" " 
        target="_blank"
        rel="noopener noreferrer"><div className="flex items-center gap-2 w-max bg-sky-500 text-white px-4 py-2 rounded-md text-xs font-normal "><span>Watch Tutorial</span> <FaPlay className="h-3 w-3" /></div></a>

        </div>
        <div className="bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm">
          <p className="font-medium text-sm">
            Remaining Credits : {dataCredits?.credits || 0}
          </p>
          {
          dataResult?.data.length > 0 &&  <button
          onClick={exportAllToPDF}
          className="mt-2 bg-sky-500 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
        >
          <FaFileExport /><span>PDF</span>
        </button>
        }
        </div>
      </div>
      {/* <Card>
        <div></div>
        <h1 className="font-medium text-lg mb-4">Discovery Analytics</h1>
        <div className="card font-normal text-textThin text-[15px]">
          <p>
            Revolutionize influencer marketing with our smart discovery and
            analytics. Effortlessly find, assess, and collaborate with
            influencers. Simplify campaigns and succeed with real-time insights.
          </p>
        </div>
      </Card> */}

      <div className="border border-[#edebeb] dark:border-gray-700 w-full bg-slate-150 mt-6 shadow-sm">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-textBold dark:text-gray-400 w-full">
          <li
            className={`me-2 flex-1 ${
              activeTab == "filter" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("filter")}
              className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${
                activeTab == "filter"
                  ? "text-blue-500 dark:text-blue-500 dark:border-blue-500"
                  : ""
              } group`}
              aria-current="page"
            >
              <FaFilter className="me-2" />
              Filter
            </button>
          </li>
          <li
            className={`me-2 flex-1 ${
              activeTab == "similiar" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("similiar")}
              className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${
                activeTab == "similiar"
                  ? "text-blue-500 dark:text-blue-500 dark:border-blue-500"
                  : ""
              } group`}
            >
              <FaUserPlus className="me-2" />
              By Similiar
            </button>
          </li>
          {/* <li className={`me-2 flex-1 ${activeTab == "history" ? "border-b-2 border-blue-500" : ""}`}>
            <button onClick={() => setActiveTab("history")} className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${activeTab == "history" ? "text-blue-500 dark:text-blue-500 dark:border-blue-500" : ""} group`}>
                <FaHistory className="me-2" />
                History Discovery
            </button>
        </li> */}
        </ul>
      </div>

      {activeTab === "filter" ? (
        <Filter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          dataResult={dataResult}
          setDataResult={setDataResult}
          fetchUserData={fetchUserData}
          dataCredits={dataCredits}
          setActiveTab={setActiveTab}
        />
      ) : activeTab === "similiar" ? (
        <Similiar
          showFilter={showSimiliar}
          setShowFilter={setShowSimiliar}
          fetchUserData={fetchUserData}
          dataCredits={dataCredits}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ) : activeTab === "history" ? (
        <History />
      ) : (
        ""
      )}
    </div>
  );
};

export default Discovery;
