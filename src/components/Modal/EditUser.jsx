import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = ({
  isDrawerOpen,
  setIsDrawerOpen,
  fetchUserData,
  userData,
}) => {
  const [formData, setFormData] = useState({
    email: userData?.email || "",
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
    roles: userData?.roles || "",
    credits: userData?.credits || "",
  });
  useEffect(() => {
    setFormData({
      email: userData?.email || "",
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      roles: userData?.roles || "",
      credits: userData?.credits || "",
    });
  }, [userData]);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const editUser = async () => {
    if (!formData.email) {
      Swal.fire("Error", "Ada Form yang belum di lengkapi", "error");
      return;
    }
    try {
      await axios({
        method: "put",
        url: `${import.meta.env.VITE_APP_API_URL}/users/${encodeURIComponent(
          userData?._id
        )}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        data: JSON.stringify({
          ...formData,
        }),
      });
      Swal.fire("Success Update User!", "", "success");
      setIsDrawerOpen(false);
      fetchUserData();
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error?.response?.status === 500) {
        Swal.fire("Error", "Email Telah Digunakan", "error");
        setLoading(false);
        return;
      }
    }
  };
  const handleSimpan = async (e) => {
    e.preventDefault();
    setLoading(true);
    editUser();
  };

  if (!isDrawerOpen) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-999 outline-none focus:outline-none">
        <div
          className="overlay fixed top-0 left-0 w-screen h-screen -z-99 bg-black/15"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
        <div className="relative my-6 mx-auto w-[85%] max-h-[80%] overflow-auto sm:w-3/4 xl:w-1/2 z-1">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-black/20 rounded-t ">
              <h3 className="text-xl font-bold text-primary">Edit User</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FaTimes className="close-button absolute top-0 right-0 mt-4 mr-4 cursor-pointer" />
                {/* <span className="text-red-500 opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    x
                  </span> */}
              </button>
            </div>
            <div className="modal-content">
              <form className="" onSubmit={handleSimpan}>
                <div className=" p-6 flex-auto w-full">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 md:col-span-1">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        className={` bg-white disabled:bg-[#F2F2F2] appearance-none text-sm border border-[#cacaca] focus:border-sky-500
                  "border-red-500" 
               rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                        id="jumlah_barang_dikirim"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Email"
                        required
                      />
                    </div>
                    {/* <div className="col-span-2 md:col-span-1">
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
                    </div> */}
                    <div className="col-span-2 md:col-span-1">
                      <label
                        for="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Role
                      </label>
                      <select
                        id="category"
                        value={formData.roles}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            roles: e.target.value,
                          }))
                        }
                        className="text-sm bg-white disabled:bg-[#F2F2F2] cursor-pointer  border border-[#cacaca] focus:border-sky-500 rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent"
                      >
                        <option selected disabled value="">
                          Select Role
                        </option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label
                        className=" block text-textBold text-sm font-medium mb-2"
                        htmlFor="email"
                      >
                        First Name
                      </label>

                      <input
                        className={` bg-white disabled:bg-[#F2F2F2] appearance-none text-sm border border-[#cacaca] focus:border-sky-500
                  "border-red-500" 
               rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                        id="jumlah_barang_dikirim"
                        type="text"
                        placeholder="FirstName"
                        required
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            first_name: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label
                        className=" block text-textBold text-sm font-medium mb-2"
                        htmlFor="email"
                      >
                        Last Name
                      </label>

                      <input
                        className={` bg-white disabled:bg-[#F2F2F2] appearance-none text-sm border border-[#cacaca] focus:border-sky-500
                  "border-red-500" 
               rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                        id="jumlah_barang_dikirim"
                        type="text"
                        placeholder="LastName"
                        // required
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            last_name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label
                        className=" block text-textBold text-sm font-medium mb-2"
                        htmlFor="email"
                      >
                        Credits
                      </label>

                      <input
                        className={` bg-white disabled:bg-[#F2F2F2] appearance-none text-sm border border-[#cacaca] focus:border-sky-500
                  "border-red-500" 
               rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                        id="jumlah_barang_dikirim"
                        type="number"
                        placeholder="Credits"
                        required
                        value={formData.credits}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            credits: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                 

                  <div className="flex items-center justify-center gap-2 mt-8">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
