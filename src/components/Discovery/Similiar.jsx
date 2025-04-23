import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import {
  FaHistory,
  FaLine,
  FaQuestion,
  FaSearch,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from "../../data/top100Films";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import {
  accountOptions,
  basedOptions,
  cityOptions,
  countryOptions,
  followersOptions,
  socialOptions,
} from "../../data/data";
import ResultSImiliar from "./ResultSimiliar";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

const Similiar = ({
  showFilter,
  setShowFilter,
  fetchUserData,
  dataCredits,
  activeTab,
  setActiveTab,
}) => {
  const [formData, setFormData] = useState({
    platform: "INSTAGRAM",
    audience_age_max: null,
    audience_age_min: null,
    creator_age_max: null,
    creator_age_min: null,
    audience_location_name: "Indonesia",
    creator_location_name: "Indonesia",
    followers_min: null,
    followers_max: null,
    audience_lookalikes: null,
    creator_lookalikes: "",
    sorting_by: "CREATOR_LOOKALIKES",
    previous_call_id: null,
    next_page: 0,
  });
  const user = useSelector((a) => a.auth.user);
  const [searchParams] = useSearchParams();
  const similiar = searchParams.get("similiar"); // Ambil query parameter
  useEffect(() => {
    if (similiar) {
      setFormData((prev) => ({ ...prev, creator_lookalikes: similiar }));
    }
  }, [similiar]);

  const handleInputChange = (field, value) => {
    if (field === "creator_age" || field === "audience_age") {
      const isCreator = field === "creator_age";
      if (!value) {
        setFormData((prev) => ({
          ...prev,
          [isCreator ? "creator_age_min" : "audience_age_min"]: 0,
          [isCreator ? "creator_age_max" : "audience_age_max"]: 100,
        }));
      } else if (value === "55 >") {
        setFormData((prev) => ({
          ...prev,
          [isCreator ? "creator_age_min" : "audience_age_min"]: 55,
          [isCreator ? "creator_age_max" : "audience_age_max"]: null,
        }));
      } else {
        const [min, max] = value.split(" - ").map(Number);
        setFormData((prev) => ({
          ...prev,
          [isCreator ? "creator_age_min" : "audience_age_min"]: min,
          [isCreator ? "creator_age_max" : "audience_age_max"]: max,
        }));
      }
    } else if (field === "followers_range") {
      if (!value) {
        setFormData((prev) => ({
          ...prev,
          followers_min: null,
          followers_max: null,
        }));
      } else {
        const [min, max] = value
          .split(" - ")
          .map((v) => (v === "null" ? null : Number(v)));
        setFormData((prev) => ({
          ...prev,
          followers_min: min,
          followers_max: max,
        }));
      }
    } else if (
      field === "creator_location_name" ||
      field === "audience_location_name"
    ) {
      if (!value) {
        // Reset ke default jika tidak diisi
        setFormData((prev) => ({
          ...prev,
          [field]: "Indonesia",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    } else if (field === "platform") {
      setFormData((prev) => ({
        ...prev,
        platform: value,
        creator_location_name:
          value === "INSTAGRAM" ? prev.creator_location_name : "Indonesia",
        audience_location_name:
          value === "INSTAGRAM" ? prev.audience_location_name : "Indonesia",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const [showCreator, setShowCreator] = useState(true);
  const [showAudience, setShowAudience] = useState(false);
  const [showSort, setShowSort] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [dataResult, setDataResult] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleReset = () => {
    navigate(location.pathname, { replace: true });
  };

  const searchDiscovery = async () => {
    setLoading(true);
    Swal.fire({
      title: "Search Discovery...",
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
        url: `${import.meta.env.VITE_APP_API_URL}/discovery/similiar`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        params: {
          page: page,
        },
        data: JSON.stringify({
          ...formData, // Spread dulu semua data form
          creator_lookalikes: formData.creator_lookalikes
            ? "@" + formData.creator_lookalikes // Tambahkan "@" jika ada nilainya
            : "", // Jika tidak ada, tetap string kosong
        }),
      });
      setDataResult(response.data);
      Swal.fire(
        "Success Get Analyse Profile!",
        "Scroll Down To View Analyse Data",
        "success"
      );
      fetchUserData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 403) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "Not Enough Credit",
        });
      } else if (
        error?.response?.status === 404 ||
        error?.response?.status === 400
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

      setDataResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = async (newPage) => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_APP_API_URL}/discovery/similiar`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        params: { page: newPage },
        data: JSON.stringify({
          ...formData, // Spread dulu semua data form
          creator_lookalikes: formData.creator_lookalikes
            ? "@" + formData.creator_lookalikes // Tambahkan "@" jika ada nilainya
            : "", // Jika tidak ada, tetap string kosong
        }),
      });
      setDataResult(response.data);
      setLoading(false);
      fetchUserData();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch data for the next page",
      });
    }
  };

  const handleSearch = async (e) => {
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

    if (
      !formData.creator_lookalikes
    ) {
      Swal.fire({
        icon: "warning",
        title: "Creator Username Belum Diisi",
        text: "Silakan isi creator username dahulu sebelum mencari similiar creator.",
      });
      setLoading(false);

      return; // Stop eksekusi jika platform Instagram dan interest belum diisi
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
        setPage(1); // Reset ke halaman pertama
        await searchDiscovery();
      }
    });
  };

  const handleSearchPagination = async () => {
    if (dataCredits.credits < 1) {
      Swal.fire(
        "No Remaining Credits",
        "Contact Admin to Recharge Your Credits",
        "error"
      );
      setLoading(false);
      return;
    }

    // Konfirmasi pengguna hanya saat tombol Next Page diklik
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure this will reduce your credits?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Analyse it!",
      confirmButtonColor: "#24A5E9",
    }).then(async (result) => {
      if (result.value) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1); // Update halaman
      }
    });
  };

  useEffect(() => {
    if (page > 1) {
      handlePagination(page); // Fetch data setelah halaman diperbarui
    }
  }, [page]); // Panggil fetchData setiap kali halaman berubah
  return (
    <div>
      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 mb-2">
            <h1 className="font-medium text-lg text-textBold">
              Filter By Similiar
            </h1>
            <Tooltip title="Filter discovery berdasarkan kemiripan creator dan demografi creator.">
              <div className="p-[2px] bg-sky-500 cursor-pointer rounded-full">
                {" "}
                <FaQuestion className="text-[10px] text-white" />
              </div>
            </Tooltip>
          </div>
          {!showFilter ? (
            <button
              className="rounded-full border border-textBold"
              onClick={() => setShowFilter(true)}
            >
              <BiChevronDown size={22} />
            </button>
          ) : (
            <button
              className="rounded-full border border-textBold"
              onClick={() => setShowFilter(false)}
            >
              <BiChevronUp size={22} />
            </button>
          )}
        </div>
        <div
          className={`${
            !showFilter ? "hidden" : ""
          } card font-normal text-textThin text-[15px] mt-4`}
        >
          <div className="form mt-6 items-center gap-2 md:gap-4 gap-y-6 grid grid-cols-2 md:grid-cols-3">
            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">
                Creator Username <span className="text-sm text-red-500">*</span>
              </p>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-creator-name"
                  className="py-2"
                  placeholder="Creator Username"
                  value={formData.creator_lookalikes}
                  onChange={(e) =>
                    handleInputChange("creator_lookalikes", e.target.value)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <FaSearch className="text-textThin font-thin" />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-creator-name-helper-text"
                  inputProps={{
                    "aria-label": "creator-name",
                  }}
                />
              </FormControl>
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Based On</p>
              <Autocomplete
                disablePortal
                options={basedOptions}
                value={
                  basedOptions.find(
                    (option) => option.value === formData.sorting_by
                  ) || null
                }
                onChange={(e, newValue) =>
                  handleInputChange("sorting_by", newValue?.value || "")
                }
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Based On" />
                )}
              />
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">
                Social Media
              </p>
              <Autocomplete
                disablePortal
                options={socialOptions}
                value={
                  socialOptions.find(
                    (option) => option.value === formData.platform
                  ) || null
                }
                onChange={(e, newValue) =>
                  handleInputChange("platform", newValue?.value || "")
                }
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Social Media" />
                )}
              />
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">
                Followers Range
              </p>
              <Autocomplete
                disablePortal
                options={followersOptions}
                value={followersOptions.find(
                  (option) =>
                    option.value ===
                    (formData.followers_min !== null
                      ? `${formData.followers_min} - ${
                          formData.followers_max || "null"
                        }`
                      : null)
                )}
                onChange={(e, newValue) =>
                  handleInputChange("followers_range", newValue?.value || "")
                }
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Followers Range" />
                )}
              />
            </div>
            {/* <div className="">
              <p className="font-normal text-textThin text-sm mb-2">
                Creator Country
              </p>
              <Autocomplete
                disablePortal
                options={countryOptions}
                value={countryOptions[0]}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Creator Country" />
                )}
              />
            </div> */}

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">
                Creator City
              </p>
              <Autocomplete
                disablePortal
                options={formData.platform === "INSTAGRAM" ? cityOptions : []} // Batasi pilihan jika platform bukan INSTAGRAM
                value={
                  cityOptions.find(
                    (option) => option.value === formData.creator_location_name
                  ) || cityOptions[0]
                } // Default ke "Any"
                onChange={(e, newValue) =>
                  handleInputChange(
                    "creator_location_name",
                    newValue.value || "Indonesia"
                  )
                }
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Creator City" />
                )}
              />
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">
                Account Type
              </p>
              <Autocomplete
                disablePortal
                options={accountOptions}
                value={
                  accountOptions.find(
                    (option) => option.value === formData.platform_account_type
                  ) || accountOptions[0]
                }
                onChange={(e, newValue) =>
                  handleInputChange(
                    "platform_account_type",
                    newValue?.value || ""
                  )
                }
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Account Type" />
                )}
              />
            </div>
          
            {/* <div className="">
              <p className="font-normal text-textThin text-sm mb-2">
                Followers Range
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Min"
                  value={formData.followers_min}
                  onChange={(e) =>
                    handleInputChange("followers_min", Number(e.target.value))
                  }
                  required
                />
                <FaMinus className="text-2xl" />
                <input
                  type="number"
                  id="number-input"
                  value={formData.followers_max}
                  onChange={(e) =>
                    handleInputChange("followers_max", Number(e.target.value))
                  }
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Max"
                  required
                />
              </div>
            </div> */}
          </div>

          <div className="form mt-6 items-center gap-2 md:gap-4 gap-y-6 grid grid-cols-1 md:grid-cols-3">
       
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              className="border border-sky-500  text-sky-500 font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className=" bg-sky-500 flex gap-2 items-center text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => handleSearch(e)}
            >
              <FaSearch />
              Search
            </button>
          </div>
        </div>
      </Card>

      {dataResult && (
        <ResultSImiliar
          title="Result History Discovery"
          data={showResult}
          dataResult={dataResult}
          page={page}
          loading={loading}
          platform={formData?.platform}
          setPage={setPage}
          handleSearch={handleSearch}
          handleSearchPagination={handleSearchPagination}
        />
      )}
    </div>
  );
};

export default Similiar;
