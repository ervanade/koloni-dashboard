import React from 'react'
import Card from '../Card/Card'
import DataAnalytics from "../../data/analytics.json";
import { DataFormater } from '../../data/data';
import { BiSolidComment, BiSolidLike } from 'react-icons/bi';
import { FaChartBar, FaChartColumn, FaComment, FaEye, FaHeart, FaMoneyBill } from 'react-icons/fa6';

const ResultAnalytics = () => {
    const data = DataAnalytics.data.data
  return (
    <div className='w-full'>
      {
        data ? 
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <BiSolidLike className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          TOTAL INFLUENCER
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
            {DataFormater(
              data?.user_performance?.avg_likes_per_post
            ) || 1}
          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <FaEye className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          VIEW
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
            {DataFormater(
              data[0].engagement?.view_count
            ) || 0}
          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <FaChartColumn className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
           ENGAGEMENT
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
          {DataFormater(
             data[0].engagement?.like_count
            ) || 0}
          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <BiSolidComment className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
            COMMENT
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
          {DataFormater(
              data[0].engagement?.comment_count
            ) || 0}
          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <FaChartColumn className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          ENGAGEMENT RATE
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
          {DataFormater(
             data[0].engagement?.view_count / data[0].engagement?.like_count
            ) || 0}
          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <FaMoneyBill className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          TOTAL SPENDING
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
            {DataFormater(
              data?.user_performance?.avg_comment_per_post
            ) || 0}
          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <FaMoneyBill className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
           CPE
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
            {DataFormater(data?.user_performance?.avg_reels) ||
              0}
          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <FaMoneyBill className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
            CPV
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
            {DataFormater(data?.user_performance?.avg_reels) ||
              0}
          </p>
        </Card>
      </div>
            : ""
      }
          <h1 className="font-medium text-lg mb-4 mt-6" >Content</h1>

              <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-4 mt-4">

              <Card className="!px-4 !py-4">
              {data[0].url && (
                          <a
                            href={data[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/logo-instagram.png"
                              alt="Logo Instagram"
                              className="w-5 h-5"
                            />
                          </a>
                        )}
                          <div className="img w-full h-54 flex justify-center items-center">
                          <img
                            src={data[0].media_url}
                            className="w-full object-cover max-h-54"
                            alt=""
                          />
                        </div>
         <h2 className="font-bold text-textBold text-base mt-2 line-clamp-3 min-h-19 overflow-hidden">
         {data[0].title}
          </h2>
         
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1 mt-2">
                      <FaHeart className="text-red-500" />
                      <span>{data[0].engagement.like_count.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <FaComment className="text-blue-500" />
                      <span>{data[0].engagement.comment_count.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
        </Card>

{/* {
    data ? data?.map((item, index) => (
        <Card className="!px-4 !py-4" key={index}>
              {item?.url && (
                          <a
                            href={item?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/logo-instagram.png"
                              alt="Logo Instagram"
                              className="w-5 h-5"
                            />
                          </a>
                        )}
                          <div className="img w-full h-54 flex justify-center items-center">
                          <img
                            src={item.thumbnail_url}
                            className="w-full object-cover max-h-54"
                            alt=""
                          />
                        </div>
         <h2 className="font-bold text-textBold text-base mt-2 line-clamp-3 min-h-19 overflow-hidden">
         {item?.title}
          </h2>
         
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1 mt-2">
                      <FaHeart className="text-red-500" />
                      <span>{item.engagement.like_count.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <FaComment className="text-blue-500" />
                      <span>{item.engagement.comment_count.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
        </Card>
    )) : ""
} */}
     
    </div>
    </div>
  )
}

export default ResultAnalytics
