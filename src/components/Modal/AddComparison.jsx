import React, { useState } from 'react'
import { FaAt, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

const AddComparison = ({isDrawerOpen, setIsDrawerOpen}) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    username: "",
    role: "",
    platform: "Instagram"
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  if (!isDrawerOpen) {
    return null;
  }
  
  return (
    <>
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-999 outline-none focus:outline-none">
      <div className="overlay fixed top-0 left-0 w-screen h-screen -z-99 bg-black/15" onClick={() => setIsDrawerOpen(false)}></div>
      <div className="relative my-6 mx-auto w-[85%] max-h-[80%] overflow-auto sm:w-3/4 xl:w-1/2 z-1">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-black/20 rounded-t ">
            <h3 className="text-xl font-bold text-primary">
              Add Comparison
            </h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setIsDrawerOpen(false)}
            >
              <FaTimes className='close-button absolute top-0 right-0 mt-4 mr-4 cursor-pointer' />
              {/* <span className="text-red-500 opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    x
                  </span> */}
            </button>
          </div>
          <div className="modal-content">
            <form className="" >
            <div className=" p-6 flex w-full">
            <div className="font-normal text-textThin text-[15px] w-full flex items-center gap-2">
            <div className="select w-1/2 cursor-pointer">
                            <select
                                id="akun_ewallet"
                                onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value}))}
                                className="w-full cursor-pointer bg-white px-2 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
                                value={formData.platform}
                            >
                                <option value="" selected disabled>Select Platform</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Tiktok">Tiktok</option>
                                <option value="Youtube">Youtube</option>
                            </select>
                        </div>
          <div className="relative w-full">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <FaAt className="text-[#bebaba]" />
            </button>

            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData( prev => ({...prev, username:e.target.value}))}
              placeholder="Enter Username..."
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
            />
          </div>
          <button
            className=" bg-sky-500 flex gap-2 items-center text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => setShowResult(!showResult)}
          >
            {" "}
            Submit
          </button>
        </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddComparison
