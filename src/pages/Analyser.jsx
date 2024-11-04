import React from 'react'
import Card from '../components/Card/Card'

const Analyser = () => {
  return (
    <div>
        <div className='mb-6 flex items-center justify-between'>
    <div>

        <h1 className='text-textBold font-bold text-2xl mb-1'>Analyser</h1>
        <p className='font-thin text-textThin'>Analyser the right creators for your campaigns</p>
    </div>
    <div className='bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm'>
        <p className='font-normal'>Remaining Analyser Credits / Remaining Credits 2</p>
    </div>
        </div>
        <Card>
         <div>

      </div>
      <h1 className='font-normal text-lg mb-4'>Analyser Analytics</h1>
      <div className="card font-thin text-textThin text-[15px]">

        <p>
        Revolutionize influencer marketing with our smart discovery and analytics. Effortlessly find, assess, and collaborate with influencers. Simplify campaigns and succeed with real-time insights.

        </p>

      </div>
      </Card>
    </div>
  )
}

export default Analyser
