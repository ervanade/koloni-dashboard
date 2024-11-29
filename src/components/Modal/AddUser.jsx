import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

const AddUser = ({isDrawerOpen, setIsDrawerOpen}) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    username: "",
    role: "",
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
              Add User
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
            <form className="" ></form>
            <div className=" p-6 flex-auto w-full">
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
            

              <div className="flex items-center justify-center gap-2 mt-6">

              <button
                className="bg-sky-500 disabled:bg-slate-500  text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1"
                type="submit"

              >
Submit
              </button>
              <button
              onClick={() => setIsDrawerOpen(false)}
                className="bg-slate-300 disabled:bg-slate-500  text-textThin font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1"
                type="submit"

              >
Cancel
              </button>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddUser
