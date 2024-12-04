import React from "react";
import { FaCheckCircle, FaEye, FaSearch } from "react-icons/fa";
import { FaAt, FaComment, FaHeart } from "react-icons/fa6";
import {
  BiCheckCircle,
  BiLike,
  BiSolidComment,
  BiSolidLike,
} from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  DataFormater,
  desktopOS,
  desktopOS2,
  followersChart,
  optionsFollowers,
  optionsProfile,
  seriesFollowers,
  seriesProfile,
  valueFormatter,
} from "../../data/data";
import { BarChart, LineChart } from "@mui/x-charts";
import Card from "../Card/Card";
import Chart from "react-apexcharts";
import {
  topContents,
  topHashtag,
  topMentions,
  topSimiliar,
} from "../../data/dataAnalyser";
import DataRaffi from "../../data/nagita.json";
const ResultAnalyser = ({ data }) => {
  const groupedByAgeRange = Object.values(
    DataRaffi.data.audience_breakdown.age_ranges.reduce((acc, curr) => {
      const key = curr.age_range; // Grouping key is age_range
      if (!acc[key]) {
        acc[key] = { age_range: curr.age_range, value: 0 }; // Initialize group
      }
      acc[key].value += curr.value; // Sum up values
      return acc;
    }, {})
  );
  const options = {
    chart: {
      zoom: {
        enabled: false,
      },
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },

    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      strokeColors: ["#fff"],
      colors: ["#826af9"],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: ["#826af9"],
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      custom(data) {
        return `<div className='px-1 py-4'>
                  <span>${
                    data.series[data.seriesIndex][data.dataPointIndex]
                  }%</span>
                </div>`;
      },
    },
    xaxis: {
      categories: groupedByAgeRange.map((item) => item.age_range),
      // categories: ["13-17", "18-24", "25-34", "35-34", "45-64"],
    },
    yaxis: {},
  };

  // ** Chart Series
  const series = [
    {
      data: groupedByAgeRange.map((item) => item.value.toFixed(2)),
      // data: [6.1, 36.4, 43.7, 10.9, 2.7],
    },
  ];

  const columnColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#f8d3ff",
    bg2: "#53D86A",
  };

  // ** Chart Options
  const optionsBar = {
    chart: {
      height: 400,
      type: "bar",
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "15%",
        colors: {
          backgroundBarColors: [
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
          ],
          backgroundBarRadius: 10,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "start",
    },
    colors: [columnColors.series1, columnColors.series2],
    stroke: {
      show: true,
      colors: ["transparent"],
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: [
        "7/12",
        "8/12",
        "9/12",
        "10/12",
        "11/12",
        "12/12",
        "13/12",
        "14/12",
        "15/12",
        "16/12",
      ],
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      opposite: "rtl",
    },
  };

  // ** Chart Series
  const seriesBar = [
    {
      name: "Apple",
      data: [90, 120, 55, 100, 80, 125, 175, 70, 88, 180],
    },
    {
      name: "Samsung",
      data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20],
    },
  ];
  return (
    <>
      {data ? (
        <Card className={`mt-6`}>
          <div className="flex items-center gap-4 border border-[#C4C4C4] p-4 rounded-md justify-between ">
            <div className="flex items-center sm:flex-row flex-col gap-4 ">
              <div className="rounded-full w-12 md:w-16 overflow-hidden">
                <img
                  src={DataRaffi.data.profile_image || "/cristiano.jpeg"}
                  alt=""
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-medium md:text-lg ">
                  {DataRaffi.data.influencer_name || "cristiano"}
                </h1>
                <p className="text-textThin font-normal">
                  {" "}
                  {"@" + DataRaffi.data.influencer_name || "@cristiano"}
                </p>
                <div className="flex items-center gap-2">
                  {" "}
                  <img
                    src="logo-instagram.png"
                    alt="Logo Instagram"
                    className="w-5 md:w-6"
                  />
                  <img
                    src="logo-youtube.png"
                    alt="Logo youtube"
                    className="w-5 md:w-6"
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

            <div className="flex sm:items-center text-sm md:text-base flex-col md:flex-row md:flex-1 justify-around">
              <div>
                <h2 className="font-medium text-textThin">ENGAGEMENT RATE</h2>{" "}
                <p className="font-bold text-sky-500 md:text-2xl">
                  {DataRaffi.data.engagement_rate + "%" || "1,2%"}
                </p>
              </div>

              <div>
                <h2 className="font-medium text-textThin">FOLLOWERS</h2>{" "}
                <p className="font-bold text-sky-500 md:text-2xl">
                  {DataFormater(DataRaffi.data.followers) || "641.3M"}
                </p>
              </div>

              <div>
                <h2 className="font-medium text-textThin">FOLLOWING</h2>{" "}
                <p className="font-bold text-sky-500 md:text-2xl">
                  {DataFormater(DataRaffi.data.following) || "584"}
                </p>
              </div>
            </div>
          </div>

          <div className=" border border-[#C4C4C4] p-4 rounded-md justify-between mt-6 ">
            <h1 className="font-bold text-textBold ">User Performance</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
                <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
                  <BiSolidLike className="text-sky-500" size={20} />
                </div>
                <h2 className="font-bold text-textBold text-base">
                  AVG. LIKES
                </h2>
                <p className="font-bold text-sky-500 text-2xl">
                  {DataFormater(
                    DataRaffi.data.user_performance.avg_likes_per_post
                  ) || "7.786.266"}
                </p>
              </div>

              <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
                <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
                  <BiSolidComment className="text-sky-500" size={20} />
                </div>
                <h2 className="font-bold text-textBold text-base">
                  AVG. COMMENTS
                </h2>
                <p className="font-bold text-sky-500 text-2xl">
                  {DataFormater(
                    DataRaffi.data.user_performance.avg_comment_per_post
                  ) || "59.593"}
                </p>
              </div>

              <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
                <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
                  <FaEye className="text-sky-500" size={20} />
                </div>
                <h2 className="font-bold text-textBold text-base">
                  AVG. REELS VIEW
                </h2>
                <p className="font-bold text-sky-500 text-2xl">
                  {DataFormater(DataRaffi.data.user_performance.avg_reels) ||
                    "99.612.620"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">User Authenticity </h1>
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
                    data: DataRaffi.data.user_authenticity.map(
                      ({ name, value, color }) => ({
                        label: name, // Use `name` as the label
                        value, // Keep the `value`,
                        color,
                      })
                    ),
                    // data: desktopOS,
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
              <h1 className="font-bold text-textBold ">
                Significant Followers
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-6">
                {DataRaffi.data.significant_followers
                  .slice(0, 6)
                  .map((item, index) => (
                    <a href={item.url}
                    target="_blank"
                    rel="noopener noreferrer" className="">
                    <div
                      className="p-2 hover:bg-white border border-[#EBEEF4] bg-[#EBEEF4] rounded-md flex flex-col justify-center items-center gap-2"
                      key={index}
                    >
                      <div className="relative inline-flex w-fit">
                        <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                          <FaCheckCircle className="text-blue-500" />
                        </div>

                        <img
                          src={item.imageUrl}
                          className="rounded-full w-10"
                        />
                      </div>
                      <h2 className="text-[13px] text-center font-bold text-textBold">
                        {item.platformUsername}
                      </h2>
                      <p className="text-[13px] text-center text-[#6B7280] font-medium">
                        {item.followerCount.toLocaleString("id-ID")} Followers
                      </p>
                    </div>
                    </a>
                  ))}
                {/* <div className="p-2 bg-[#EBEEF4] rounded-md flex flex-col justify-center items-center gap-2">
                  <div className="relative inline-flex w-fit">
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      <FaCheckCircle className="text-blue-500" />
                    </div>

                    <img src="/nike.jpeg" className="rounded-full w-10" />
                  </div>
                  <h2 className="text-sm text-center font-bold text-textBold">
                    nike
                  </h2>
                  <p className="text-sm text-center text-textBold font-medium">
                    303.462.935 Followers
                  </p>
                </div>

                <div className="p-2 bg-[#EBEEF4] rounded-md flex flex-col justify-center items-center gap-2">
                  <div className="relative inline-flex w-fit">
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      <FaCheckCircle className="text-blue-500" />
                    </div>

                    <img src="/virat.jpeg" className="rounded-full w-10" />
                  </div>
                  <h2 className="text-sm text-center font-bold text-textBold">
                    virat.kohli
                  </h2>
                  <p className="text-sm text-center text-textBold font-medium">
                    270.700.837 Followers
                  </p>
                </div>

                <div className="p-2 bg-[#EBEEF4] rounded-md flex flex-col justify-center items-center gap-2">
                  <div className="relative inline-flex w-fit">
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      <FaCheckCircle className="text-blue-500" />
                    </div>

                    <img src="/jlo.jpeg" className="rounded-full w-10" />
                  </div>
                  <h2 className="text-sm text-center font-bold text-textBold">
                    jlo
                  </h2>
                  <p className="text-sm text-center text-textBold font-medium">
                    250.777.388 Followers
                  </p>
                </div>

                <div className="p-2 bg-[#EBEEF4] rounded-md flex flex-col justify-center items-center gap-2">
                  <div className="relative inline-flex w-fit">
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      <FaCheckCircle className="text-blue-500" />
                    </div>

                    <img src="/neymar.jpeg" className="rounded-full w-10" />
                  </div>
                  <h2 className="text-sm text-center font-bold text-textBold">
                    neymar
                  </h2>
                  <p className="text-sm text-center text-textBold font-medium">
                    225.158.410 Followers
                  </p>
                </div>

                <div className="p-2 bg-[#EBEEF4] rounded-md flex flex-col justify-center items-center gap-2">
                  <div className="relative inline-flex w-fit">
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      <FaCheckCircle className="text-blue-500" />
                    </div>

                    <img src="/kevin.jpeg" className="rounded-full w-10" />
                  </div>
                  <h2 className="text-sm text-center font-bold text-textBold">
                    kevin
                  </h2>
                  <p className="text-sm text-center text-textBold font-medium">
                    178.562.767 Followers
                  </p>
                </div>

                <div className="p-2 bg-[#EBEEF4] rounded-md flex flex-col justify-center items-center gap-2">
                  <div className="relative inline-flex w-fit">
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      <FaCheckCircle className="text-blue-500" />
                    </div>

                    <img src="/kingjames.jpeg" className="rounded-full w-10" />
                  </div>
                  <h2 className="text-sm text-center font-bold text-textBold">
                    kingjames
                  </h2>
                  <p className="text-sm text-center text-textBold font-medium">
                    159.885.215 Followers
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">
                Followers Reachability{" "}
              </h1>
              <PieChart
                colors={['#9B88FA', '#2E96FF', '#32D4BD', '#6DDE80']} // Use palette
                className="mt-4 !text-sm"
                sx={{
                  "& .MuiChartsLegend-series text": {
                    fontSize: "14px !important",
                  },
                  "& .MuiChartsLegend-root": { marginLeft: "14px !important" },
                }}
                series={[
                  {
                    // data: followersChart,
                    data: DataRaffi.data.follower_reachabilities.map(
                      ({ followingRange, value, color }) => ({
                        label: followingRange, // Use `name` as the label
                        value, // Keep the `value`,
                        // color,
                      })
                    ),
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
              <h1 className="font-bold text-textBold ">
                Profile Growth - Last 6 Months{" "}
              </h1>
              {/* <LineChart
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
              /> */}
              <Chart
                options={optionsProfile}
                series={seriesProfile}
                type="area"
                height={300}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">Top Cities </h1>
              <Chart
                options={optionsFollowers}
                series={seriesFollowers}
                type="bar"
                height={420}
              />
            </div>

            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">Age Range </h1>
              <Chart
                options={options}
                series={series}
                type="bar"
                height={400}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">Top Hashtags</h1>
              <div className="mt-4">
                {DataRaffi.data.top_hashtags.slice(0, 10).map((item, index) => (
                  <p className="text-[#1E3A8A]" key={index}>
                    {"#" + item.name}{" "}
                    <span
                      className={`${
                        index == 9 ? "hidden" : ""
                      } pl-4 text-slate-300 text-lg`}
                    >
                      /
                    </span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">Top Mentions</h1>
              <div className="mt-4">
                {DataRaffi.data.top_mentions.slice(0, 10).map((item, index) => (
                  <p className="text-[#1E3A8A]">
                    {"@" + item.name}{" "}
                    <span
                      className={`${
                        index == 9 ? "hidden" : ""
                      } pl-4 text-slate-300 text-lg`}
                    >
                      /
                    </span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">Top Interests</h1>
              <div className="mt-4 flex flex-col gap-4">
                {DataRaffi.data.top_interest.slice(0, 4).map((item, index) => (
                  <div key={index}>
                    <p className="text-sm text-textBold font-medium ">
                      {item.name}
                    </p>
                    <div className="w-full bg-[#EBEEF4] rounded-full dark:bg-gray-700 mt-2">
                      <div
                        className="bg-sky-500 text-xs font-medium text-blue-100 text-center p-[3px] leading-none rounded-full"
                        style={{ width: `${item.value.toFixed(2)}%` }}
                      >
                        {item.value.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div>
                  <p className="text-sm text-textBold font-medium ">
                    Friends, Family & Relationships
                  </p>
                  <div className="w-full bg-[#EBEEF4] rounded-full dark:bg-gray-700 mt-2">
                    <div className="bg-sky-500 text-xs font-medium text-blue-100 text-center p-[3px] leading-none rounded-full w-[32.3%]">
                      {" "}
                      32.3%
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-textBold font-medium ">
                    Clothes, Shoes, Handbags & Accessories
                  </p>
                  <div className="w-full bg-[#EBEEF4] rounded-full dark:bg-gray-700 mt-2">
                    <div className="bg-sky-500 text-xs font-medium text-blue-100 text-center p-[3px] leading-none rounded-full w-[27.9%]">
                      {" "}
                      27.9%
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-textBold font-medium ">Sports</p>
                  <div className="w-full bg-[#EBEEF4] rounded-full dark:bg-gray-700 mt-2">
                    <div className="bg-sky-500 text-xs font-medium text-blue-100 text-center p-[3px] leading-none rounded-full w-[27.4%]">
                      {" "}
                      27.4%
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-textBold font-medium ">
                    Camera & Photography
                  </p>
                  <div className="w-full bg-[#EBEEF4] rounded-full dark:bg-gray-700 mt-2">
                    <div className="bg-sky-500 text-xs font-medium text-blue-100 text-center p-[3px] leading-none rounded-full w-[24.8%]">
                      {" "}
                      24.8%
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-[#C4C4C4] p-4 rounded-md mt-6 overflow-hidden">
            <h1 className="font-bold text-textBold ">Top Contents </h1>
            <div className="scroll items-center mt-6 !overflow-x-auto w-full whitespace-nowrap pb-2">
              {DataRaffi.data.top_contents.slice(0, 10).map((item, index) => (
                <div className="w-54 inline-block me-4" key={index}>
                  <a
                    href={item.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="img w-full h-54 flex justify-center items-center">
                      <img
                        src={item.image_url}
                        className="w-full object-cover max-h-54"
                        alt=""
                      />
                    </div>
                  </a>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1 mt-2">
                      <FaHeart className="text-red-500" />
                      <span>{item.like.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <FaComment className="text-blue-500" />
                      <span>{item.like.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col border border-[#C4C4C4] p-4 rounded-md mt-6 overflow-hidden">
            <h1 className="font-bold text-textBold ">
              Lookalikes Content Creator{" "}
            </h1>
            <div className="scroll items-center mt-6 !overflow-x-auto w-full whitespace-nowrap pb-2">
              {DataRaffi.data.look_alies_content_creators
                .slice(0, 5)
                .map((item, index) => (
                  <div className="w-54 inline-block me-4" key={index}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="img w-full h-54 flex justify-center items-center">
                        <img
                          src={item.image_url}
                          className="w-full object-cover max-h-54"
                          alt=""
                        />
                      </div>
                    </a>
                    <div className="flex mt-3 flex-col">
                      <h2 className="text-textThin font-medium ">FOLLOWERS</h2>
                      <div className="flex items-center ">
                        <span className=" text-sky-500 font-bold">
                          {item.followers.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <a
                        href={item.profile_url}
                        className="text-[#1E3A8A] mt-2"
                      >
                        See Instagram Post
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

export default ResultAnalyser;
