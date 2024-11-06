import React from 'react'
import Card from '../Card/Card'
import { FaSearch } from 'react-icons/fa'

const History = () => {
  return (
    <Card className="mt-6">
       <div className="flex items-center justify-between">
        <div className='flex-[2_2_0%]'>

       <h1 className="font-medium text-lg text-textBold">History</h1>
        </div>
       <div className="relative ">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <FaSearch className='text-[#bebaba]'/>
            </button>

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-2 rounded-md"
            />
          </div>
       </div>
    </Card>
  )
}

export default History
