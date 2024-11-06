import React from "react";
import Card from "../components/Card/Card";
import { FaSearch } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";

const Analyser = () => {
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
                className=" bg-sky-500 flex gap-2 items-center text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                type="submit"
              >
                History
              </button>
      </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-[#dcdcdf] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] border-2 border-blue-500 rounded-full px-6 py-2 shadow-sm flex items-center">
              <img
                src="logo-instagram.png"
                alt="Logo Instagram"
                className="w-6"
              />
              <p className="font-bold text-blue-500">Instagram</p>
            </button>

            <button className="bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center">
              <img src="logo-tiktok.png" alt="Logo Tiktok" className="w-6" />{" "}
              <p className="font-medium">Tiktok</p>
            </button>

            <button className="bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center">
              <img src="logo-youtube.png" alt="Logo Youtube" className="w-6" />{" "}
              <p className="font-medium">Youtube</p>
            </button>
          </div>
      <Card className='mt-6'>
        <div></div>
        <h1 className="font-medium text-lg mb-1">Instagram Profile Analyser
        </h1>
        <p className="font-normal text-sm text-textThin">Analyser Instagram account for better performance.</p>
        <div className="mt-6 font-normal text-textThin text-[15px] flex items-center gap-2">
        <div className="relative w-full">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <FaAt className='text-[#bebaba]'/>
            </button>

            <input
              type="text"
              placeholder="Enter Instagram Username..."
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
            />
          </div>
          <button
                className=" bg-sky-500 flex gap-2 items-center text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
                type="submit"
              >            Analyse
</button>
        </div>
        <p className="text-textThin font-normal mt-2">Example:
        @cristiano</p>
      </Card>
    </div>
  );
};

export default Analyser;
