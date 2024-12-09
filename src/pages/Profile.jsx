import React, { useState } from 'react'
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import { FaEye, FaEyeSlash, FaHistory, FaLine, FaLock, FaTiktok, FaUser, FaUserPlus, FaYoutube } from "react-icons/fa";
import Card from '../components/Card/Card';
import UserDefault from "../assets/user/user-default.png";


const Profile = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [showSimiliar, setShowSimiliar] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [previewImages, setPreviewImages] = useState({
    profile: null,
  });
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    username: "",
    profile: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">Profile</h1>

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
        
        <li className={`me-2 flex-1 ${activeTab == "profile" ? "border-b-2 border-blue-500" : ""}`}>
            <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${activeTab == "filter" ? "text-blue-500 dark:text-blue-500 dark:border-blue-500" : ""} group`} aria-current="page">
               <FaUser className="me-2"/>
                Profile Information
            </button>
        </li>
        <li className={`me-2 flex-1 ${activeTab == "similiar" ? "border-b-2 border-blue-500" : ""}`}>
            <button onClick={() => setActiveTab("similiar")} className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${activeTab == "similiar" ? "text-blue-500 dark:text-blue-500 dark:border-blue-500" : ""} group`}>
                <FaLock className="me-2"/>
                Change Password
            </button>
        </li>
    </ul>
</div>

{
  activeTab === "profile" ?  
  <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg text-textBold">Profile Page</h1>

        </div>
        <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full mt-6">
                        <img
                          src={previewImages.profile || UserDefault}
                          className="rounded-full"
                          alt="Profile Preview"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = UserDefault;
                          }}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                    <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full xl:w-3/4 cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-4"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <p>
                        <span className="text-primary">
                          Change Profile
                        </span>
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG</p>
                      <p>(max: 1MB size:800 X 800px)</p>
                    </div>
                  </div>
<button
  className="bg-sky-500 disabled:bg-slate-500 text-white text-sm font-normal py-2 px-4 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1"
  type="submit"

>
Change Profile
</button>
<button
              onClick={() => setIsDrawerOpen(false)}
                className="bg-slate-300 disabled:bg-slate-500 text-sm text-textThin font-normal py-2 px-4 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1"
                type="submit"

              >
Reset
              </button>

                    </div>
                    </div>
        <form className="" >
            <div className="mt-6 flex-auto w-full">
            <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 md:col-span-1">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                    className={` bg-white disabled:bg-[#F2F2F2] appearance-none text-sm border border-[#cacaca] focus:border-sky-500
                  "border-red-500" 
               rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                    id="jumlah_barang_dikirim"
                    type="email"

                    placeholder="Email"
                    required
                  />
                       
                    </div>
                    <div className="col-span-2 md:col-span-1">
                    <label
                    className="block text-textBold text-sm font-medium mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                <input
                  className={` bg-white disabled:bg-[#F2F2F2] appearance-none text-sm border border-[#cacaca] focus:border-sky-500
                  "border-red-500" 
               rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="*******"
                />
                <button
                  className="absolute right-4 top-2.5"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <FaEye size={16} className="text-bodydark2" />
                  ) : (
                    <FaEyeSlash size={16} className="text-bodydark2" />
                  )}
                </button>
              </div>
              <button
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                    <label
                    className=" block text-textBold text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Username
                  </label>
             
                  <input
                    className={` bg-white disabled:bg-[#F2F2F2] appearance-none text-sm border border-[#cacaca] focus:border-sky-500
                  "border-red-500" 
               rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                    id="jumlah_barang_dikirim"
                    type="text"

                    placeholder="Username"
                    required
                  />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                        <select id="category" className="text-sm bg-white disabled:bg-[#F2F2F2] cursor-pointer  border border-[#cacaca] focus:border-sky-500 rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent">
                            <option selected="">Select Role</option>
                            <option value="TV">User</option>
                            <option value="PC">Admin</option>
                        </select>
                    </div>

                </div>
            

              <div className="flex items-center justify-center gap-2 mt-8">

              <button
                className="bg-sky-500 disabled:bg-slate-500  text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1"
                type="submit"

              >
Submit
              </button>
            
            </div>
            </div>
            </form>
       
       
      </Card>
   : ""
}
     

     


    </div>
  );
};

export default Profile;
