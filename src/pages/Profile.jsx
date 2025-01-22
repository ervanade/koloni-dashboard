import React, { useEffect, useState } from "react";
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import {
  FaEye,
  FaEyeSlash,
  FaHistory,
  FaLine,
  FaLock,
  FaTiktok,
  FaUser,
  FaUserPlus,
  FaYoutube,
} from "react-icons/fa";
import Card from "../components/Card/Card";
import UserDefault from "../assets/user/user-default.png";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { loginUser } from "../store/authSlice";

const Profile = () => {
  const user = useSelector((a) => a.auth.user);
  const [showFilter, setShowFilter] = useState(true);
  const [showSimiliar, setShowSimiliar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [previewImages, setPreviewImages] = useState({
    profile: null,
  });
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    profile: "",
    profileName: "",
    roles: "",
    credits: "",

  });
  const [showPassword, setShowPassword] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const dispatch = useDispatch()

  const fetchUserData = async () => {
    setGetLoading(true);
    try {
      // eslint-disable-next-line
      const responseUser = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/user`,
        headers: {
          "Content-Type": "application/json",
          //eslint-disable-next-line
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }).then(function (response) {
        // handle success
        // console.log(response)
        const data = response.data;
        setFormData({
          email: data?.email,
          username: data.first_name + " " + data.last_name,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          profile: "",
          profileName: "",
          roles: data?.roles || "",
          credits: data?.credits || "",
        });
        setPreviewImages({
          profile: data.profile ? `${data.profile}` : null,
        });
      });
      setGetLoading(false);
    } catch (error) {
      console.log(error.response.data.detail);
      setGetLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);


  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event) => {
    const { id, value, files } = event.target;
    if (files) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire("Error", "File size harus dibawah 2 MB", "error");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [id]: file,
        profileName: file.name,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const editUser = async () => {
    if (!formData.email || !formData.first_name || !formData.last_name) {
      Swal.fire("Error", "Ada Form yang belum di lengkapi", "error");
      return;
    }
    try {
      await axios({
        method: "patch",
        url: `${import.meta.env.VITE_APP_API_URL}/user`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        data: JSON.stringify({
          password : formData.password ? formData.password : null,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
        }),
      });
      Swal.fire("Success Edit User!", "", "success");
      const fullUserData = {
        ...user,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,

        
      }
      dispatch(loginUser(fullUserData))
      setIsDrawerOpen(false);
      setFormData({
        password: "",
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        profile: "",
        profileName: "",
        roles: "",
        credits: "",
    
      })
      
      fetchUserData();
    } catch (error) {
      setLoading(false);
      console.log(error);
      setFormData({
        password: "",
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        profile: "",
        profileName: "",
        roles: "",
        credits: "",
    
      })
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
    return Swal.fire({
      title: "Are you sure?",
      text: "Are you sure this will update your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      confirmButtonColor: "#24A5E9",
    }).then(async (result) => {
      if (result.value) {
        setLoading(true);
        editUser();
      }
    });
  };

  if (getLoading) {
    return (
      <div className="flex justify-center  flex-col items-center">
        <CgSpinner className="animate-spin inline-block w-10 h-10 text-blue-400" />
        {/* <span className="ml-2">Loading...</span> */}
      </div>
    );
  }
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
          <li
            className={`me-2 flex-1 ${
              activeTab == "profile" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${
                activeTab == "filter"
                  ? "text-blue-500 dark:text-blue-500 dark:border-blue-500"
                  : ""
              } group`}
              aria-current="page"
            >
              <FaUser className="me-2" />
              Profile Information
            </button>
          </li>
          <li
            className={`me-2 flex-1 ${
              activeTab == "similiar" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("similiar")}
              className={`w-full flex items-center justify-center p-4  rounded-t-lg active ${
                activeTab == "similiar"
                  ? "text-blue-500 dark:text-blue-500 dark:border-blue-500"
                  : ""
              } group`}
            >
              <FaLock className="me-2" />
              Change Password
            </button>
          </li>
        </ul>
      </div>

      {activeTab === "profile" ? (
        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <h1 className="font-medium text-lg text-textBold">Profile</h1>
            <div>
              <p className="font-xs">
                Credits: <span className="font-bold">{formData?.credits}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-14 w-14 rounded-full">
              <img
                src={previewImages.profile || "/user-default.png"}
                className="rounded-full"
                alt="Profile Preview"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/user-default.png";
                }}
              />
            </div>
            <p>{formData?.username}</p>
            {/* <div className="flex items-center justify-center gap-2">
              <div className="sm:flex-[5_5_0%] flex flex-col items-start gap-1">
                <div className="flex items-center">
                  <label className="bg-sky-500 disabled:bg-slate-500 cursor-pointer text-white text-sm font-normal py-2 px-4 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1">
                    <input
                      className="hidden"
                      id="profile"
                      onChange={handleChange}
                      type="file"
                      accept="image/*"
                    />
                    Change Profile
                  </label>
                  {formData.profileName && (
                    <p className="text-gray-500 text-xs ml-4">
                      File: {formData.profileName}
                    </p>
                  )}
                </div>

              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="bg-slate-300 disabled:bg-slate-500 text-sm text-textThin font-normal py-2 px-4 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1"
                type="submit"
              >
                Reset
              </button>
            </div> */}
          </div>
          <form className="">
            <div className="mt-6 flex-auto w-full">
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
                {/* <div className="col-span-2 md:col-span-1">
                  <label
                    for="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    value={formData.roles}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        roles: e.target.value,
                      }))
                    }
                    id="category"
                    className="text-sm bg-white disabled:bg-[#F2F2F2] cursor-pointer  border border-[#cacaca] focus:border-sky-500 rounded-md w-full py-2 px-2 text-textBold leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent"
                  >
                    <option selected="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div> */}
              </div>

              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                onClick={handleSimpan}
                  className="bg-sky-500 disabled:bg-slate-500  text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
