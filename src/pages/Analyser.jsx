import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { FaCheckCircle, FaEye, FaFileExport, FaPlus, FaSearch } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";
import {
  BiCheckCircle,
  BiLike,
  BiSolidComment,
  BiSolidLike,
} from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { PieChart } from "@mui/x-charts/PieChart";
import { desktopOS, desktopOS2, valueFormatter } from "../data/data";
import { BarChart, LineChart } from "@mui/x-charts";
import ResultAnalyser from "../components/Analyser/ResultAnalyser";
import Drawer from "../components/Modal/Drawer";
import AddComparison from "../components/Modal/AddComparison";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';


const Analyser = () => {
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [dataAnalyse, setDataAnalyse] = useState({});
  const user = useSelector((a) => a.auth.user);
  const [dataCredits, setDataCredits] = useState(user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    platform: "Instagram",
    identifier: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const fetchUserData = async () => {
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
        setDataCredits({
          email: data?.email,
          username: data.first_name + data.last_name,
          profile: "",
          profileName: "",
          roles: data?.roles || "",
          credits: data?.credits || "",
        });
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const [comparisons, setComparisons] = useState([]);
  const handleAddComparison = (newComparison) => {
    if (comparisons.length < 10) {
      setComparisons((prev) => [...prev, newComparison]); // Tambah data baru ke comparisons
    }
  };

  const handleRemoveComparison = (id) => {
    setComparisons(comparisons.filter((comparison) => comparison.id !== id));
  };

  const searchAnalyse = async () => {
    if (!formData.identifier) {
      Swal.fire("Error", "Username Belum Diisi", "error");
      setLoading(false);

      return;
    }
    setLoading(true);
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
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_APP_API_URL}/analyze`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        data: JSON.stringify({
          ...formData,
        }),
      });
      setDataAnalyse(response.data);
      setComparisons([
        { id: Date.now(), data: response.data }, // Simpan hasil ke dalam comparisons
      ]);
      Swal.fire("Success Get Analyse Profile!", "Scroll Down To View Analyse Data", "success");
      setShowResult(true);
      fetchUserData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "Not Enough Credit",
        });
      } else if (
        error.response.status === 404 ||
        error.response.status === 400
      ) {
        return Swal.fire({
          icon: "error",
          title: "Error Not Found",
          text: "Influencers Not Found",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed Search Analyse Profile",
        });
      }

      setDataAnalyse(null);
      setFormData({
        platform: "Instagram",
        identifier: "",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSimpan = async (e) => {
    e.preventDefault();
    if (dataCredits.credits < 1) {
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
        searchAnalyse();
      }
    });
  };
  

  const exportAllToPDF = () => {
    Swal.fire({
      title: 'Exporting PDF...',
      text: 'Please wait while the document is being generated.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Menampilkan spinner
      },
    });
    const pdf = new jsPDF({
      orientation: 'p',  // Potrait orientation
      unit: 'mm',        // Satuan dalam milimeter
      format: [1000, 300]  // Menggunakan ukuran kertas sesuai dimensi gambar
    });
    const pxToMm = 0.264583; // Konversi piksel ke milimeter
    const margin = 10; // Margin atas dan bawah
    let currentY = margin; // Posisi Y awal

  
    const tasks = comparisons?.map((comparison, index) => {
      const elementId = `comparison-${index}`;
      const element = document.getElementById(elementId);
  
      return domtoimage.toPng(element).then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
  
        return new Promise((resolve) => {
          img.onload = () => {
            const imgWidth = img.width * pxToMm;
            const imgHeight = img.height * pxToMm;
  
            if (currentY + imgHeight > pdf.internal.pageSize.getHeight()) {
              pdf.addPage(); // Tambahkan halaman baru jika penuh
              currentY = margin;
            }
  
            pdf.addImage(dataUrl, "PNG", margin, currentY, imgWidth, imgHeight);
            currentY += imgHeight + margin; // Update posisi Y
            resolve();
          };
        });
      });
    });
  
    Promise.all(tasks)
      .then(() => {
        pdf.save(`Results Analyser ${comparisons[0].data?.username || ""}.pdf`);
        Swal.close()
        Toast.fire({
          icon: "success",
          title: "Success Export PDF",
        });
      })
      .catch((error) => {
        console.error("Error exporting PDF:", error);
        Swal.fire({
          icon: 'error',
          title: 'Export Failed!',
          text: 'An error occurred while generating the PDF. Please try again.',
        });
      });
  };
  
  

  return (
    <div className="analyser">
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">Analyser</h1>
          <p className="font-normal text-textThin">
            Analyse creators across Instagram, TikTok, and YouTube
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end text-sm">
          <div className="bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm">
            <p className="font-medium">
              Remaining Analyser Credits: {dataCredits?.credits || 0}
            </p>
          </div>
          {
          comparisons?.length > 0 &&  <button
          onClick={exportAllToPDF}
          className="mb-4 bg-sky-500 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
        >
          <FaFileExport /><span>PDF</span>
        </button>
        }
        </div>
      </div>
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-4 flex-wrap text-sm">
          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, platform: "Instagram" }))
            }
            className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${
              formData.platform == "Instagram"
                ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold "
                : ""
            }  rounded-full px-6 py-2 shadow-sm flex items-center`}
          >
            <img
              src="logo-instagram.png"
              alt="Logo Instagram"
              className="w-6"
            />
            <p className="">Instagram</p>
          </button>

          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, platform: "Tiktok" }))
            }
            className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${
              formData.platform == "Tiktok"
                ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold "
                : ""
            }  rounded-full px-6 py-2 shadow-sm flex items-center`}
          >
            <img src="logo-tiktok.png" alt="Logo Tiktok" className="w-6" />{" "}
            <p className="">Tiktok</p>
          </button>

          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, platform: "Youtube" }))
            }
            className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${
              formData.platform == "Youtube"
                ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold "
                : ""
            }  rounded-full px-6 py-2 shadow-sm flex items-center`}
          >
            <img src="logo-youtube.png" alt="Logo Youtube" className="w-6" />{" "}
            <p className="">Youtube</p>
          </button>
        </div>
        {showResult && (
          <div className="flex items-center">
            <button
              className=" bg-sky-500 flex gap-2 items-center text-sm   text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => setIsModal(true)}
            >
              <FaPlus />
              <span>Add Comparison</span>
            </button>
          </div>
        )}
      </div>
      <Card className="mt-6">
        <h1 className="font-medium text-base mb-1">Instagram Profile Analyser</h1>
        <p className="font-normal text-sm text-textThin">
          Analyser Instagram account for better performance.
        </p>
        <div className="mt-6 font-normal text-textThin text-[15px] flex items-center gap-2">
          <div className="relative w-full">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <FaAt className="text-[#bebaba]" />
            </button>

            <input
              type="text"
              value={formData.identifier}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, identifier: e.target.value }))
              }
              placeholder="Enter Instagram Username..."
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
            Analyse
          </button>
        </div>
        <p className="text-textThin font-normal  mt-2 text-sm">Example: @cristiano</p>

       
      </Card>
      {/* Section Comparison */}
      <div className="overflow-x-auto flex gap-4 mt-6">
        {comparisons.map((comparison, index) => (
          <div
            key={index}
            id={`comparison-${index}`} // Add ID for each result
            className={`${
              comparisons?.length > 1 ? "w-[96%]" : "w-full"
            } bg-white shadow-md rounded-lg p-4 relative`}
          >
            {comparisons.length > 1 && index !== 0 && (
              <button
                onClick={() => handleRemoveComparison(comparison.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            )}

            <ResultAnalyser
              dataAnalyse={comparison.data}
              data={showResult}
              comparisonLength={comparisons?.length || 0}
            />
          </div>
        ))}
      </div>
      {/* <ResultAnalyser title="tes" data={showResult} dataAnalyse={dataAnalyse} /> */}
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <AddComparison
        isDrawerOpen={isModal}
        setIsDrawerOpen={setIsModal}
        onSubmit={handleAddComparison}
        credits={dataCredits.credits || 0}
        user={user}
      />
    </div>
  );
};

export default Analyser;
