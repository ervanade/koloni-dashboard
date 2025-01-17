import React, { useState } from "react";
import Card from "../components/Card/Card";
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import { FaHistory, FaLine, FaTiktok, FaUserPlus, FaYoutube } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from "../data/top100Films";
import Filter from "../components/Discovery/Filter";
import Similiar from "../components/Discovery/Similiar";
import History from "../components/Discovery/History";

const Discovery = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [showSimiliar, setShowSimiliar] = useState(true);
  const [activeTab, setActiveTab] = useState("filter");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">Discovery</h1>
          <p className="font-normal text-textThin">
            Discover the right creators for your campaigns
          </p>
        </div>
        <div className="bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm">
          <p className="font-medium text-sm">
            Remaining Discovery Credits / Remaining Credits 2
          </p>
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
        
        <li className={`me-2 flex-1 ${activeTab == "filter" ? "border-b-2 border-blue-500" : ""}`}>
            <button onClick={() => setActiveTab("filter")} className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${activeTab == "filter" ? "text-blue-500 dark:text-blue-500 dark:border-blue-500" : ""} group`} aria-current="page">
               <FaFilter className="me-2"/>
                Filter
            </button>
        </li>
        <li className={`me-2 flex-1 ${activeTab == "similiar" ? "border-b-2 border-blue-500" : ""}`}>
            <button onClick={() => setActiveTab("similiar")} className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${activeTab == "similiar" ? "text-blue-500 dark:text-blue-500 dark:border-blue-500" : ""} group`}>
                <FaUserPlus className="me-2"/>
                By Similiar
            </button>
        </li>
        <li className={`me-2 flex-1 ${activeTab == "history" ? "border-b-2 border-blue-500" : ""}`}>
            <button onClick={() => setActiveTab("history")} className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${activeTab == "history" ? "text-blue-500 dark:text-blue-500 dark:border-blue-500" : ""} group`}>
                <FaHistory className="me-2" />
                History Discovery
            </button>
        </li>
    </ul>
</div>

{
  activeTab === "filter" ?  <Filter showFilter={showFilter} setShowFilter={setShowFilter} /> : activeTab === "similiar" ?  <Similiar showFilter={showSimiliar} setShowFilter={setShowSimiliar} /> : activeTab === "history" ? <History /> : ""
}
     

     


    </div>
  );
};

export default Discovery;
