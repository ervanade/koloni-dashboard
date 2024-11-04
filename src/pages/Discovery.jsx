import React from 'react'
import Card from '../components/Card/Card'
import { FaInstagram } from 'react-icons/fa6'
import { FaTiktok, FaYoutube } from 'react-icons/fa'

const Discovery = () => {
  return (
    <div>
        <div className='mb-6 flex items-center justify-between'>
    <div>

        <h1 className='text-textBold font-bold text-2xl mb-1'>Discovery</h1>
        <p className='font-thin text-textThin'>Discover the right creators for your campaigns</p>
    </div>
    <div className='bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm'>
        <p className='font-normal'>Remaining Discovery Credits / Remaining Credits 2</p>
    </div>
        </div>
        <Card>
         <div>

      </div>
      <h1 className='font-normal text-lg mb-4'>Discovery Analytics</h1>
      <div className="card font-thin text-textThin text-[15px]">

        <p>
        Revolutionize influencer marketing with our smart discovery and analytics. Effortlessly find, assess, and collaborate with influencers. Simplify campaigns and succeed with real-time insights.

        </p>

      </div>
      </Card>

      <Card className="mt-6">
     
      <h1 className='font-normal text-lg mb-4'>Filter</h1>
      <div className="card font-thin text-textThin text-[15px]">

        <p>
Social Media
        </p>
<div className="flex items-center gap-4">
        <button className='bg-[#efeff1] text-textBold gap-2 mt-2 hover:text-blue-500 rounded-full px-6 py-2 shadow-sm flex items-center'>
            <FaInstagram />
        <p className='font-normal'>Instagram</p>
    </button>

    <button className='bg-[#efeff1] text-textBold gap-2 mt-2 hover:text-blue-500 rounded-full px-6 py-2 shadow-sm flex items-center'>
            <FaTiktok />
        <p className='font-normal'>Tiktok</p>
    </button>

    <button className='bg-[#efeff1] text-textBold gap-2 mt-2 hover:text-blue-500 rounded-full px-6 py-2 shadow-sm flex items-center'>
            <FaYoutube />
        <p className='font-normal'>Youtube</p>
    </button>
    </div>

      </div>
      </Card>
    </div>
  )
}

export default Discovery
