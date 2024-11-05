import React from "react";
import Card from "../components/Card/Card";

const Analytics = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">
            Brand Analytics
          </h1>
          <p className="font-normal text-textThin">
            Brand Analytics the right creators for your campaigns
          </p>
        </div>
        <div className="bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm">
          <p className="font-medium">Remaining Analyser Credits: 2</p>
        </div>
      </div>
      <Card>
        <div></div>
        <h1 className="font-medium text-lg mb-4">Brand Analytics</h1>
        <div className="card font-normal text-textThin text-[15px]">
          <p>
            Revolutionize influencer marketing with our smart discovery and
            analytics. Effortlessly find, assess, and collaborate with
            influencers. Simplify campaigns and succeed with real-time insights.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
