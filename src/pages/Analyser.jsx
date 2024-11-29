import React, { useState } from "react";
import Card from "../components/Card/Card";
import { FaCheckCircle, FaEye, FaSearch } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";
import { BiCheckCircle, BiLike, BiSolidComment, BiSolidLike } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { PieChart } from "@mui/x-charts/PieChart";
import { desktopOS, desktopOS2, valueFormatter } from "../data/data";
import { BarChart, LineChart } from "@mui/x-charts";
import ResultAnalyser from "../components/Analyser/ResultAnalyser";
import Drawer from "../components/Modal/Drawer";

const Analyser = () => {
  const [showResult, setShowResult] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [formData, setFormData] = useState({
    platform: "INSTAGRAM",
    username: ""
  })

  return (
    <div>
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">Analyser</h1>
          <p className="font-normal text-textThin">
            Analyse creators across Instagram, TikTok, and YouTube
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <div className="bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm">
            <p className="font-medium">Remaining Analyser Credits: 2</p>
          </div>
          <button
            className=" bg-sky-500 flex gap-2 items-center text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => setIsDrawerOpen(true)}
          >
            History
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => setFormData(prev => ({...prev, platform: "INSTAGRAM"}))} className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${formData.platform == "INSTAGRAM" ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold " : ""}  rounded-full px-6 py-2 shadow-sm flex items-center`}>
              <img
                src="logo-instagram.png"
                alt="Logo Instagram"
                className="w-6"
              />
              <p className="">Instagram</p>
            </button>

            <button onClick={() => setFormData(prev => ({...prev, platform: "TIKTOK"}))} className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${formData.platform == "TIKTOK" ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold " : ""}  rounded-full px-6 py-2 shadow-sm flex items-center`}>
              <img src="logo-tiktok.png" alt="Logo Tiktok" className="w-6" />{" "}
              <p className="">Tiktok</p>
            </button>

            <button onClick={() => setFormData(prev => ({...prev, platform: "YOUTUBE"}))} className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${formData.platform == "YOUTUBE" ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold " : ""}  rounded-full px-6 py-2 shadow-sm flex items-center`}>
              <img src="logo-youtube.png" alt="Logo Youtube" className="w-6" />{" "}
              <p className="">Youtube</p>
            </button>
          </div>
      <Card className="mt-6">
        <h1 className="font-medium text-lg mb-1">Instagram Profile Analyser</h1>
        <p className="font-normal text-sm text-textThin">
          Analyser Instagram account for better performance.
        </p>
        <div className="mt-6 font-normal text-textThin text-[15px] flex items-center gap-2">
          <div className="relative w-full">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <FaAt className="text-[#bebaba]" />
            </button>

            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData( prev => ({...prev, username:e.target.value}))}
              placeholder="Enter Instagram Username..."
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
            />
          </div>
          <button
            className=" bg-sky-500 flex gap-2 items-center text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => setShowResult(!showResult)}
          >
            {" "}
            Analyse
          </button>
        </div>
        <p className="text-textThin font-normal mt-2">Example: @cristiano</p>
      </Card>
    <ResultAnalyser title="tes" data={showResult}/> 
    <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>

    </div>
  );
};

export default Analyser;
