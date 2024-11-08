import React from 'react'
import { FaCheckCircle, FaEye, FaSearch } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";
import { BiCheckCircle, BiLike, BiSolidComment, BiSolidLike } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { PieChart } from "@mui/x-charts/PieChart";
import { desktopOS, desktopOS2, valueFormatter } from "../../data/data";
import { BarChart, LineChart } from "@mui/x-charts";
import Card from '../Card/Card';
import Chart from 'react-apexcharts'
const ResultAnalyser = ({data}) => {
    const options = {
        chart: {
          zoom: {
            enabled: false
          },
          parentHeightOffset: 0,
          toolbar: {
            show: false
          }
        },
    
        markers: {
          strokeWidth: 7,
          strokeOpacity: 1,
          strokeColors: ['#fff'],
          colors: ["#826af9"]
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        colors: ["#826af9"],
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        tooltip: {
          custom(data) {
            return `<div class='px-1 py-4'>
                  <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
                </div>`
          }
        },
        xaxis: {
          categories: [
            '13-17',
            '18-24',
            '25-34',
            '35-34',
            '45-64',


            
          ]
        },
        yaxis: {

        }
      }
    
      // ** Chart Series
      const series = [
        {
          data: [6.1, 36.4, 43.7, 10.9, 2.7]
        }
      ]

      const columnColors = {
        series1: '#826af9',
        series2: '#d2b0ff',
        bg: '#f8d3ff'
      }
    
      // ** Chart Options
      const optionsBar = {
        chart: {
          height: 400,
          type: 'bar',
          stacked: true,
          parentHeightOffset: 0,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '15%',
            colors: {
              backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
              backgroundBarRadius: 10
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'top',
          horizontalAlign: 'start'
        },
        colors: [columnColors.series1, columnColors.series2],
        stroke: {
          show: true,
          colors: ['transparent']
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        xaxis: {
          categories: ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12']
        },
        fill: {
          opacity: 1
        },
        yaxis: {
          opposite: 'rtl'
        }
      }
    
      // ** Chart Series
      const seriesBar = [
        {
          name: 'Apple',
          data: [90, 120, 55, 100, 80, 125, 175, 70, 88, 180]
        },
        {
          name: 'Samsung',
          data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20]
        }
      ]
  return (
    <>
    
        {
            data ? <Card className={`mt-6`}><div className="flex items-center border border-[#C4C4C4] p-4 rounded-md justify-between ">
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
              <h1 className="font-medium text-textBold ">Significant Followers</h1>
      <div className="grid grid-cols-3 gap-2 mt-6">
      <div className="p-2 bg-slate-200 rounded-md flex flex-col justify-center items-center gap-2"><div class="relative inline-flex w-fit">
      <div
      className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
      <FaCheckCircle className="text-blue-500"/>
      </div>
      
      
      <img src="/nike.jpeg" className="rounded-full w-10"/>
      
      
      </div><h2 className="text-sm text-center font-bold text-textBold">nike
      </h2><p className="text-sm text-center text-bold font-medium">303.462.935 Followers</p></div>
      
      <div className="p-2 bg-slate-200 rounded-md flex flex-col justify-center items-center gap-2"><div class="relative inline-flex w-fit">
      <div
      className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
      <FaCheckCircle className="text-blue-500"/>
      </div>
      
      
      <img src="/nike.jpeg" className="rounded-full w-10"/>
      
      
      </div><h2 className="text-sm text-center font-bold text-textBold">nike
      </h2><p className="text-sm text-center text-bold font-medium">303.462.935 Followers</p></div>
      
      <div className="p-2 bg-slate-200 rounded-md flex flex-col justify-center items-center gap-2"><div class="relative inline-flex w-fit">
      <div
      className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
      <FaCheckCircle className="text-blue-500"/>
      </div>
      
      
      <img src="/nike.jpeg" className="rounded-full w-10"/>
      
      
      </div><h2 className="text-sm text-center font-bold text-textBold">nike
      </h2><p className="text-sm text-center text-bold font-medium">303.462.935 Followers</p></div>
      
      <div className="p-2 bg-slate-200 rounded-md flex flex-col justify-center items-center gap-2"><div class="relative inline-flex w-fit">
      <div
      className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
      <FaCheckCircle className="text-blue-500"/>
      </div>
      
      
      <img src="/nike.jpeg" className="rounded-full w-10"/>
      
      
      </div><h2 className="text-sm text-center font-bold text-textBold">nike
      </h2><p className="text-sm text-center text-bold font-medium">303.462.935 Followers</p></div>
      
      <div className="p-2 bg-slate-200 rounded-md flex flex-col justify-center items-center gap-2"><div class="relative inline-flex w-fit">
      <div
      className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
      <FaCheckCircle className="text-blue-500"/>
      </div>
      
      
      <img src="/nike.jpeg" className="rounded-full w-10"/>
      
      
      </div><h2 className="text-sm text-center font-bold text-textBold">nike
      </h2><p className="text-sm text-center text-bold font-medium">303.462.935 Followers</p></div>
      
      <div className="p-2 bg-slate-200 rounded-md flex flex-col justify-center items-center gap-2"><div class="relative inline-flex w-fit">
      <div
      className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full px-1 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
      <FaCheckCircle className="text-blue-500"/>
      </div>
      
      
      <img src="/nike.jpeg" className="rounded-full w-10"/>
      
      
      </div><h2 className="text-sm text-center font-bold text-textBold">nike
      </h2><p className="text-sm text-center text-bold font-medium">303.462.935 Followers</p></div>
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
              <h1 className="font-medium text-textBold ">Top Cities            </h1>
              <BarChart
              className="font-publicSans"
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["group A", "group B", "group C", "group D", "group E"],
                  },
                ]}
                series={[{ data: [200, 500, 600, 100, 1000], color: "#53D86A" }]}
                height={300}
              />
            </div>
      
            <div className="flex flex-col gap-2 border border-[#C4C4C4] p-4 rounded-md">
              <h1 className="font-medium text-textBold ">Age Range            </h1>
              <Chart options={options} series={series} type='bar' height={400} />
            </div>
          </div>
          </Card> : ""
        }
    
  
  </>
  )
}

export default ResultAnalyser
