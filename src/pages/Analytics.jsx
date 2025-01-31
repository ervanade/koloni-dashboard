import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaAt, FaLink } from "react-icons/fa6";

const Analytics = () => {
  const user = useSelector((a) => a.auth.user);
  const [dataCredits, setDataCredits] = useState(user);
  const [formData, setFormData] = useState({
    platform: "Instagram",
    username: "",
  });
  const [fieldType, setFieldType] = useState("username"); // Default input
  const [loading, setLoading] = useState(false);



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
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">
            Brand Analytics
          </h1>
          <p className="font-normal text-textThin">
            Brand Analytics the right creators for your campaigns
          </p>
        </div>
        <div className="bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm text-sm">
          <p className="font-medium">Remaining Credits : {dataCredits?.credits || 0}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-4 flex-wrap text-sm">
          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, platform: "Instagram" }))
            }
            className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${
              formData.platform == "Instagram"
                ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold "
                : ""
            }  rounded-full px-6 py-2 shadow-sm flex items-center`}
          >
            <img
              src="logo-instagram.png"
              alt="Logo Instagram"
              className="w-6"
            />
            <p className="">Instagram</p>
          </button>

          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, platform: "Tiktok" }))
            }
            className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${
              formData.platform == "Tiktok"
                ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold "
                : ""
            }  rounded-full px-6 py-2 shadow-sm flex items-center`}
          >
            <img src="logo-tiktok.png" alt="Logo Tiktok" className="w-6" />{" "}
            <p className="">Tiktok</p>
          </button>

          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, platform: "Youtube" }))
            }
            className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${
              formData.platform == "Youtube"
                ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold "
                : ""
            }  rounded-full px-6 py-2 shadow-sm flex items-center`}
          >
            <img src="logo-youtube.png" alt="Logo Youtube" className="w-6" />{" "}
            <p className="">Youtube</p>
          </button>
        </div>
      </div>
      <Card className="mt-6">
      <h1 className="font-medium text-lg mb-4">Brand Analytics</h1>
      <p className="font-normal text-sm text-textThin">
      Provide real-time performance data of campaigns, contents, or specific creator accounts.
        </p>
        <div className="mt-6 font-normal text-textThin text-[15px] flex items-center gap-2">
        <select
              className="w-1/2 bg-white p-2 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
              value={fieldType}
        onChange={(e) => {
          setFieldType(e.target.value);
          setFormData((prev) => ({ ...prev, [e.target.value]: "" }))
        }}
      >
        <option value="username">Username</option>
        <option value="contentUrl">Content URL</option>
      </select>
          <div className="relative w-full">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              {fieldType === "username" ? <FaAt className="text-[#bebaba]" /> : <FaLink  className="text-[#bebaba]"/>}
            </button>

            <input
              type="text"
              value={formData[fieldType]}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [fieldType]: e.target.value }))
              }
              placeholder={fieldType === "username" ? "Enter Username" : "Enter Content URL"}
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
            />
          </div>
          <button
            className=" bg-sky-500 flex gap-2 items-center text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => handleSimpan(e)}
            disabled={loading}
          >
            {" "}
            Analyse
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">

        <p className="text-textThin font-normal text-sm">Example: @cristiano</p>
        <p className="text-textThin font-normal text-sm">Example: https://www.instagram.com/reels/C9JpcPKv89i/</p>
        </div>

       
      </Card>
    </div>
  );
};

export default Analytics;
