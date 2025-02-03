import axios from "axios";
import React, { useState } from "react";
import { FaAt, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AddComparison = ({
  isDrawerOpen,
  setIsDrawerOpen,
  onSubmit,
  credits,
  user,
  fetchUserData
}) => {
  const [formData, setFormData] = useState({
    platform: "Instagram",
    identifier: "",
  });

  const [loading, setLoading] = useState(false); // Untuk state loading

  if (!isDrawerOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refresh halaman
    if (!formData.identifier) {
      Swal.fire("Error", "Please enter a username.", "error");
      return;
    }

    setLoading(true); // Set loading state
    Swal.fire({
      title: "Search Analyse...",
      text: "Please Wait Preparing Your Data...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      // Panggil API untuk analisis
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/analyze`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`, // Ganti dengan token user Anda
          },
        }
      );

      // Kirim hasil ke komponen induk
      onSubmit({
        id: Date.now(),
        data: response.data,
      });
      Swal.fire(
        "Success Get Analyse Profile!",
        "Scroll Right To View Data",
        "success"
      );
      fetchUserData();
      setFormData({
        platform: "Instagram",
        identifier: "",
      });
      

      // Tutup popup setelah submit berhasil
      setIsDrawerOpen(false);
      setLoading(false); // Matikan loading state
    } catch (error) {
      console.error(error);
      if (error.response.status === 403) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "Not Enough Credit",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed Search Analyse Profile",
        });
      }
      setLoading(false); // Matikan loading state
    } finally {
      setLoading(false); // Matikan loading state
    }
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    if (credits < 1) {
      Swal.fire(
        "No Remaining Credits",
        "Contact Admin to Recharge Your Credits",
        "error"
      );
      setLoading(false);

      return;
    }
    return Swal.fire({
      title: "Are you sure?",
      text: "Are you sure this will reduce your credits?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Analyse it!",
      confirmButtonColor: "#24A5E9",
    }).then(async (result) => {
      if (result.value) {
        setLoading(true);
        handleSubmit(e);
      }
    });
  };

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
              <h3 className="text-xl font-bold text-primary">Add Comparison</h3>
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
              <form className="">
                <div className=" p-6 flex w-full">
                  <div className="font-normal text-textThin text-[15px] w-full flex items-center gap-2 flex-col sm:flex-row ">
                    <div className="select w-full sm:w-1/2 cursor-pointer">
                      <select
                        id="akun_ewallet"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            platform: e.target.value,
                          }))
                        }
                        className="w-full cursor-pointer bg-white px-2 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
                        value={formData.platform}
                      >
                        <option value="" selected disabled>
                          Select Platform
                        </option>
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
                        value={formData.identifier}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            identifier: e.target.value,
                          }))
                        }
                        placeholder="Enter Username..."
                        className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-3 rounded-md"
                      />
                    </div>
                    <button
                      className=" bg-sky-500 flex gap-2 items-center text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={(e) => handleSimpan(e)}
                      disabled={loading}
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
  );
};

export default AddComparison;
