import React, { useEffect, useState } from "react";
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
  extractFollowerCounts,
  extractMonths,
  followersChart,
  optionsAge,
  optionsFollowers,
  optionsProfile,
  optionsProfile2,
  optionsProfileGrowth,
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
const ResultAnalyser = ({ data, dataAnalyse }) => {

  const columnColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#f8d3ff",
    bg2: "#53D86A",
  };

  const [profileOptions, setProfileOptions] = useState(optionsProfile2);
  const [profileSeries, setProfileSeries] = useState([]);

  const [citiesOptions, setCitiesOptions] = useState(optionsFollowers);
  const [citiesSeries, setCitiesSeries] = useState([]);

  const [ageOptions, setAgeOptions] = useState(optionsAge);
  const [ageSeries, setAgeSeries] = useState([]);
  
  useEffect(() => {
    // Profile Growth
    if (dataAnalyse?.reputation_histories?.length > 0) {
      const months = dataAnalyse.reputation_histories.map((item) => item.month);
      const followerCounts = dataAnalyse.reputation_histories.map(
        (item) => item.followerCount
      );

      setProfileOptions((prev) => ({
        ...prev,
        xaxis: { ...prev.xaxis, categories: months },
      }));
      setProfileSeries([{ name: "Followers", data: followerCounts }]);
    }

    // Top Cities
    if (dataAnalyse?.audience_breakdown?.top_city?.length > 0) {
      const topCities = dataAnalyse.audience_breakdown.top_city
        .sort((a, b) => b.value - a.value) // Sort by value descending
        .slice(0, 10); // Top 10 cities

      const cityNames = topCities.map((city) => city.name);
      const cityValues = topCities.map((city) => city.value.toFixed(2));

      setCitiesOptions((prev) => ({
        ...prev,
        xaxis: { ...prev.xaxis, categories: cityNames },
      }));
      setCitiesSeries([{ name: "Top Cities", data: cityValues }]);
    }

    // Age Range
    if (dataAnalyse?.audience_breakdown?.age_ranges?.length > 0) {
      const groupedByAgeRange = Object.values(
        dataAnalyse.audience_breakdown.age_ranges.reduce((acc, curr) => {
          const key = curr.age_range;
          if (!acc[key]) acc[key] = { age_range: key, value: 0 };
          acc[key].value += curr.value;
          return acc;
        }, {})
      );

      const ageCategories = groupedByAgeRange.map((item) => item.age_range);
      const ageValues = groupedByAgeRange.map((item) => item.value.toFixed(2));

      setAgeOptions((prev) => ({
        ...prev,
        xaxis: { ...prev.xaxis, categories: ageCategories },
      }));
      setAgeSeries([{ name: "Age Distribution", data: ageValues }]);
    }
  }, [dataAnalyse]);
  
  return (
    <>
      {data ? (
        <Card className={`mt-6`}>
          <div className="flex items-center gap-4 border border-[#C4C4C4] p-4 rounded-md justify-between ">
            <div className="flex items-center sm:flex-row flex-col gap-4 ">
              <div className="rounded-full w-12 md:w-16 overflow-hidden">
                <img
                  src={dataAnalyse?.profile_image || "/cristiano.jpeg"}
                  alt=""
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-medium md:text-lg ">
                  {dataAnalyse?.username || ""}
                </h1>
                <p className="text-textThin font-normal">
                  {" "}
                  {"@" + dataAnalyse?.username || ""}
                </p>
                <div className="flex items-center gap-2">
                  {" "}
                  {
                    dataAnalyse?.instagram &&   <img
                    src="logo-instagram.png"
                    alt="Logo Instagram"
                    className="w-5 md:w-6"
                  />
                  }

{
                    dataAnalyse?.youtube &&   <img
                    src="logo-youtube.png"
                    alt="Logo youtube"
                    className="w-5 md:w-6"
                  />
                  }
                
                {
                    dataAnalyse?.tiktok &&   <img
                    src="logo-tiktok.png"
                    alt="Logo tiktok"
                    className="w-5 md:w-6"
                  />
                  }
                 
                 
                </div>
                <a
                  className=" bg-sky-500 text-sm flex gap-2 items-center text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        target="_blank"
        rel="noopener noreferrer"
                  href={`https://api.whatsapp.com/send?phone=6281288756302&text=Halo%20Admin%2C%20Saya%20dari%20website%20koloni%20tertarik%20dan%20meminta%20perkiraan%20harga%20influencer%20dengan%20username%20%3A${dataAnalyse?.username || ""}%20di%20platform%20${"Instagram" || ""}`}
                >
                  Ask For Price
                </a>
              </div>
            </div>

            <div className="flex sm:items-center text-sm md:text-base flex-col md:flex-row md:flex-1 justify-around">
              <div>
                <h2 className="font-medium text-textThin">ENGAGEMENT RATE</h2>{" "}
                <p className="font-bold text-sky-500 md:text-2xl">
                  {dataAnalyse?.engagement_rate
                    ? dataAnalyse.engagement_rate.toFixed(2) + "%"
                    : "0%"}
                </p>
              </div>

              <div>
                <h2 className="font-medium text-textThin">FOLLOWERS</h2>{" "}
                <p className="font-bold text-sky-500 md:text-2xl">
                  {DataFormater(dataAnalyse?.followers) || "641.3M"}
                </p>
              </div>

              <div>
                <h2 className="font-medium text-textThin">FOLLOWING</h2>{" "}
                <p className="font-bold text-sky-500 md:text-2xl">
                  {DataFormater(dataAnalyse?.following) || "584"}
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
                    dataAnalyse?.user_performance?.avg_likes_per_post
                  ) || 0}
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
                    dataAnalyse?.user_performance?.avg_comment_per_post
                  ) || 0}
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
                  {DataFormater(dataAnalyse?.user_performance?.avg_reels) || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
            {
              dataAnalyse?.user_authenticity?.length > 0
              &&  <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">User Authenticity </h1>
              <PieChart
                colors={["#9B88FA", "#2E96FF", "#32D4BD", "#6DDE80", "#FFA500"]} // Use palette
                className="mt-4 !text-sm"
                sx={{
                  "& .MuiChartsLegend-series text": {
                    fontSize: "14px !important",
                  },
                  "& .MuiChartsLegend-root": { marginLeft: "14px !important" },
                }}
                series={[
                  {
                    data: dataAnalyse?.user_authenticity?.map(
                      ({ name, value, color }) => ({
                        label: name, // Use `name` as the label
                        value : value.toFixed(2), // Keep the `value`,
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
            }
           

            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">
                Significant Followers
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-6">
                {dataAnalyse?.significant_followers
                  ?.slice(0, 6)
                  ?.map((item, index) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
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
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">
                Followers Reachability{" "}
              </h1>
              <PieChart
                colors={["#9B88FA", "#2E96FF", "#32D4BD", "#6DDE80", "#FFA500"]} // Use palette
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
                    data: dataAnalyse?.follower_reachabilities?.map(
                      ({ followingRange, value, color }) => ({
                        label: followingRange, // Use `name` as the label
                        value : value.toFixed(2), // Keep the `value`,
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
              {
                profileSeries.length > 0 && <Chart
                options={profileOptions}
                series={profileSeries}
                type="area"
                height={350}
              />
              }
              
            </div>
          </div>

               <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
                {
                dataAnalyse?.audience_breakdown?.top_city?.length > 0
                &&  
                
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">Top Cities </h1>
              <Chart
          options={citiesOptions}
          series={citiesSeries}
          type="bar"
          height={420}
        />
            </div>
          }
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">Age Range </h1>
              <Chart
          options={ageOptions}
          series={ageSeries}
          type="bar"
          height={400}
        />
            </div>
          </div>

          

          {
            dataAnalyse?.topHashtag?.length > 0
            && <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-bold text-textBold ">Top Hashtags</h1>
              <div className="mt-4">
                {dataAnalyse?.top_hashtags?.slice(0, 10)?.map((item, index) => (
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
                {dataAnalyse?.top_mentions?.slice(0, 10)?.map((item, index) => (
                  <p className="text-[#1E3A8A]" key={index}>
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
                {dataAnalyse?.top_interest?.slice(0, 4)?.map((item, index) => (
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
              </div>
            </div>
          </div>
          }

          

          <div className="flex flex-col border border-[#C4C4C4] p-4 rounded-md mt-6 overflow-hidden">
            <h1 className="font-bold text-textBold ">Top Contents </h1>
            <div className="scroll items-center mt-6 !overflow-x-auto w-full whitespace-nowrap pb-2">
              {dataAnalyse?.top_contents?.slice(0, 10)?.map((item, index) => (
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
                      <span>{item.comment.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
{
  dataAnalyse?.look_alies_content_creators?.length > 0
  && <div className="flex flex-col border border-[#C4C4C4] p-4 rounded-md mt-6 overflow-hidden">
  <h1 className="font-bold text-textBold ">
    Lookalikes Content Creator{" "}
  </h1>
  <div className="scroll items-center mt-6 !overflow-x-auto w-full whitespace-nowrap pb-2">
    {dataAnalyse?.look_alies_content_creators
      ?.slice(0, 5)
      ?.map((item, index) => (
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
}
          
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

export default ResultAnalyser;
