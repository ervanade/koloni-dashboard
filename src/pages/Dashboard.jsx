import React from "react";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Card>
        <div></div>
        <h1 className="font-medium text-lg mb-4">Influencer Analytics</h1>
        <div className="card font-normal text-textThin text-[15px]">
          <p>
            Revolutionize influencer marketing with our smart discovery and
            analytics. Effortlessly find, assess, and collaborate with
            influencers. Simplify campaigns and succeed with real-time insights.
          </p>
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <Link to={`/discovery`}>
          <Card className="h-32 bg-gradient-to-r from-blue-600 to-sky-500 dark:bg-meta-4 !text-white flex justify-center items-center font-medium">
            <span className="text-center">Discovery</span>
          </Card>
        </Link>
        <Link to={`/analyser`}>
          <Card className="h-32 bg-gradient-to-r from-blue-600 to-sky-500 dark:bg-meta-4 !text-white flex justify-center items-center font-medium">
            <span className="text-center">Analyser</span>
          </Card>
        </Link>
        <Link to={`analytics`}>
          <Card className="h-32 bg-gradient-to-r from-blue-600 to-sky-500 dark:bg-meta-4 !text-white flex justify-center items-center font-medium">
            <span className="text-center">Brand Analytics</span>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
