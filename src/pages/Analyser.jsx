import React from "react";
import Card from "../components/Card/Card";
import { FaEye, FaSearch } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";
import { BiLike, BiSolidComment, BiSolidLike } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { PieChart } from "@mui/x-charts/PieChart";
import { desktopOS, desktopOS2, valueFormatter } from "../data/data";
import { BarChart, LineChart } from "@mui/x-charts";

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
            className=" bg-sky-500 flex gap-2 items-center text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
          >
            History
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <button className="bg-[#dcdcdf] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] border-2 border-blue-500 rounded-full px-6 py-2 shadow-sm flex items-center">
          <img src="logo-instagram.png" alt="Logo Instagram" className="w-6" />
          <p className="font-medium text-blue-500">Instagram</p>
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
              placeholder="Enter Instagram Username..."
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
            />
          </div>
          <button
            className=" bg-sky-500 flex gap-2 items-center text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {" "}
            Analyse
          </button>
        </div>
        <p className="text-textThin font-normal mt-2">Example: @cristiano</p>
      </Card>

      <Card className="mt-6">
        <div className="flex items-center border border-[#C4C4C4] p-4 rounded-md justify-between ">
          <div className="flex items-center gap-4 ">
            <div className="rounded-full w-16 overflow-hidden">
              <img src="/cristiano.jpeg" alt="" className="w-full" />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-medium text-lg ">cristiano</h1>
              <p className="text-textThin font-normal">@cristiano</p>
              <div className="flex items-center gap-2">
                {" "}
                <img
                  src="logo-instagram.png"
                  alt="Logo Instagram"
                  className="w-6"
                />
                <img
                  src="logo-youtube.png"
                  alt="Logo youtube"
                  className="w-6"
                />
              </div>
              <button
                className=" bg-sky-500 text-sm flex gap-2 items-center text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Ask For Price
              </button>
            </div>
          </div>

          <div className="flex sm:items-center flex-col md:flex-row flex-1 justify-around ms-4">
            <div>
              <h2 className="font-medium text-textThin">ENGAGEMENT RATE</h2>{" "}
              <p className="font-bold text-sky-500 text-2xl">1,2%</p>
            </div>

            <div>
              <h2 className="font-medium text-textThin">FOLLOWERS</h2>{" "}
              <p className="font-bold text-sky-500 text-2xl">641.3M</p>
            </div>

            <div>
              <h2 className="font-medium text-textThin">FOLLOWING</h2>{" "}
              <p className="font-bold text-sky-500 text-2xl">584</p>
            </div>
          </div>
        </div>

        <div className=" border border-[#C4C4C4] p-4 rounded-md justify-between mt-6 ">
          <h1 className="font-medium text-textBold ">User Performance</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
              <div className="rounded-full bg-slate-200 flex items-center justify-center w-9 h-9 ">
                <BiSolidLike className="text-sky-500" size={20} />
              </div>
              <h2 className="font-medium text-textBold text-base">
                AVG. LIKES
              </h2>
              <p className="font-bold text-sky-500 text-2xl">7.786.266</p>
            </div>

            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
              <div className="rounded-full bg-slate-200 flex items-center justify-center w-9 h-9 ">
                <BiSolidComment className="text-sky-500" size={20} />
              </div>
              <h2 className="font-medium text-textBold text-base">
                AVG. COMMENTS
              </h2>
              <p className="font-bold text-sky-500 text-2xl">59.593</p>
            </div>

            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
              <div className="rounded-full bg-slate-200 flex items-center justify-center w-9 h-9 ">
                <FaEye className="text-sky-500" size={20} />
              </div>
              <h2 className="font-medium text-textBold text-base">
                AVG. REELS VIEW
              </h2>
              <p className="font-bold text-sky-500 text-2xl">99.612.620</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
            <h1 className="font-medium text-textBold ">User Authenticity </h1>
            <PieChart
              className="mt-4 !text-sm"
              sx={{
                "& .MuiChartsLegend-series text": {
                  fontSize: "14px !important",
                },
                "& .MuiChartsLegend-root": { marginLeft: "14px !important" },
              }}
              series={[
                {
                  data: desktopOS,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  valueFormatter,
                  cx: 120,
                },
              ]}
              height={180}
            />
          </div>

          <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
            <h1 className="font-medium text-textBold ">
              Profile Growth - Last 6 Months{" "}
            </h1>
            <LineChart
              xAxis={[
                {
                  scaleType: "time",
                  data: [
                    new Date(2024, 1, 0),
                    new Date(2024, 2, 0),
                    new Date(2024, 3, 0),
                    new Date(2024, 4, 0),
                    new Date(2024, 5, 0),
                    new Date(2024, 6, 0),
                  ],
                },
              ]}
              series={[
                {
                  data: [200, 550, 200, 850, 150, 500],
                  color: "#2E96FF",
                },
              ]}
              height={300}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
            <h1 className="font-medium text-textBold ">User Authenticity </h1>
            <PieChart
              className="mt-4 !text-sm"
              sx={{
                "& .MuiChartsLegend-series text": {
                  fontSize: "14px !important",
                },
                "& .MuiChartsLegend-root": { marginLeft: "14px !important" },
              }}
              series={[
                {
                  data: desktopOS2,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  valueFormatter,
                  cx: 120,
                },
              ]}
              height={180}
            />
          </div>

          <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
            <h1 className="font-medium text-textBold ">User Authenticity </h1>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["group A", "group B", "group C", "group D", "group E"],
                },
              ]}
              series={[{ data: [200, 500, 600, 100, 1000], color: "#2E96FF" }]}
              height={300}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analyser;
