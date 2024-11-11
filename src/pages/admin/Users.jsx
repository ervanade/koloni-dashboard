import React from 'react'
import Card from '../../components/Card/Card';

const Users = () => {
    return (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-textBold font-bold text-2xl mb-1">
                Users Management
              </h1>
              <p className="font-normal text-textThin">
                Users Management
              </p>
            </div>

          </div>
          <Card>
            <div></div>
            <h1 className="font-medium text-lg mb-4">Users Management</h1>
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
}

export default Users
