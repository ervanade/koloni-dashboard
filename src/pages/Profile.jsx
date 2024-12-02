import React, { useState } from 'react'
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import { FaHistory, FaLine, FaTiktok, FaUserPlus, FaYoutube } from "react-icons/fa";
import Card from '../components/Card/Card';

const Profile = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [showSimiliar, setShowSimiliar] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

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
               <FaFilter className="me-2"/>
                Profile Information
            </button>
        </li>
        <li className={`me-2 flex-1 ${activeTab == "similiar" ? "border-b-2 border-blue-500" : ""}`}>
            <button onClick={() => setActiveTab("similiar")} className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${activeTab == "similiar" ? "text-blue-500 dark:text-blue-500 dark:border-blue-500" : ""} group`}>
                <FaUserPlus className="me-2"/>
                Change Password
            </button>
        </li>
    </ul>
</div>

{
  activeTab === "profile" ?  
  <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg text-textBold">Profile</h1>

        </div>
       
       
      </Card>
   : ""
}
     

     


    </div>
  );
};

export default Profile;
