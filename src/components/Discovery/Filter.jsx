import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { FaFilter, FaInstagram, FaMinus, FaQuestion } from "react-icons/fa6";
import {
  FaHistory,
  FaLine,
  FaSearch,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from "../../data/top100Films";
import {
  accountOptions,
  ageOptions,
  cityOptions,
  countryOptions,
  followersOptions,
  genderOptions,
  interestOption,
  topicOptions,
  verifiedOptions,
} from "../../data/data";
import ResultDiscovery from "./ResultDiscovery";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Filter = ({
  showFilter,
  setShowFilter,
  dataResult,
  setDataResult,
  fetchUserData,
  dataCredits,
  setActiveTab
}) => {
  const [formData, setFormData] = useState({
    platform: "INSTAGRAM",
    audience_age_max: null,
    audience_age_min: null,
    creator_age_max: null,
    creator_age_min: null,
    audience_gender: null,
    creator_gender: null,
    audience_location_name: "Indonesia",
    creator_location_name: "Indonesia",
    call_id: null,
    followers_min: null,
    followers_max: null,
    avg_views_min: null,
    avg_views_max: null,
    avg_like_max: null,
    avg_like_min: null,
    verified: null,
    previous_call_id: null,
    sorting_by: "REELS_VIEWS",
    next_page: 0,
    platform_account_type: null,
    discovery_interest_value: [""],
    discovery_hashtag_value: [""],
    discovery_keyword_value: [""],
    discovery_topic_value: [""],
  });
  const [showCreator, setShowCreator] = useState(true);
  const [showAudience, setShowAudience] = useState(false);
  const [showSort, setShowSort] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const [topicOptions, setTopicOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const user = useSelector((a) => a.auth.user);
  // Debounced function to fetch topics
  const fetchTopics = debounce(async (searchTerm) => {
    if (searchTerm.length < 3) {
      setTopicOptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/topic`,
        {
          params: {
            identifier: searchTerm,
            platform: "INSTAGRAM",
          },
          headers: {
            "Content-Type": "application/json",
            //eslint-disable-next-line
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      const topics = response.data?.data || [];
      setTopicOptions(
        topics.map((topic) => ({
          label: topic.name, // Adjust based on API response
          value: topic.value,
        }))
      );
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false);
    }
  }, 500); // Debounce by 500ms

  useEffect(() => {
    fetchTopics(inputValue);

    // Cleanup debounce function on unmount
    return () => fetchTopics.cancel();
  }, [inputValue]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleReset = () => {
    navigate(location.pathname, { replace: true });

    // setFormData({
    //   "platform": "INSTAGRAM",
    //     "audience_age_max": null,
    //     "audience_age_min": null,
    //     "creator_age_max": null,
    //     "creator_age_min": null,
    //     "audience_gender": null,
    //     "creator_gender": null,
    //     "audience_location_name": "Indonesia",
    //     "creator_location_name": "Indonesia",
    //     "call_id": null,
    //     "followers_min": null,
    //     "followers_max": null,
    //     "avg_views_min": null,
    //     "avg_views_max": null,
    //     "avg_like_max": null,
    //     "avg_like_min": null,
    //     "verified": null,
    //     "previous_call_id": null,
    //     "sorting_by": "REELS_VIEWS",
    //     "next_page": 0,
    //     "platform_account_type": null,
    //     "discovery_interest_value":[""],
    //     "discovery_hashtag_value":[""],
    //     "discovery_keyword_value":[""],
    //     "discovery_topic_value":[""]
    //   })
  };

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
        url: `${import.meta.env.VITE_APP_API_URL}/discovery`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        params: {
          page: page,
        },
        data: JSON.stringify({
          ...formData,
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

      setDataResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = async (newPage) => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_APP_API_URL}/discovery`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        params: { page: newPage },
        data: JSON.stringify({ ...formData }),
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
    if (!formData.discovery_interest_value || formData.discovery_interest_value.length === 0 || formData.discovery_interest_value[0] === ""  || formData.discovery_interest_value[0] === '') {
      Swal.fire({
        icon: "warning",
        title: "Interest Belum Diisi",
        text: "Silakan isi interest terlebih dahulu sebelum mencari creator.",
      });
      return; // Stop eksekusi jika interest belum diisi
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
          <h1 className="font-medium text-lg text-textBold">Filter</h1>
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
          } card font-normal text-textThin text-[15px] mt-4 text-sm`}
        >
          <p>Social Media</p>
          <div className="flex items-center gap-4 flex-wrap">
            {["INSTAGRAM", "TIKTOK", "YOUTUBE"].map((platform) => (
              <button
                key={platform}
                onClick={() => handleInputChange("platform", platform)}
                className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${
                  formData.platform === platform
                    ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold "
                    : ""
                } rounded-full px-6 py-2 shadow-sm flex items-center`}
              >
                <img
                  src={`logo-${platform.toLowerCase()}.png`}
                  alt={`Logo ${platform}`}
                  className="w-6"
                />
                <p>{platform.charAt(0) + platform.slice(1).toLowerCase()}</p>
              </button>
            ))}
          </div>

          <div className="form mt-6 items-center gap-4 grid grid-cols-2 md:grid-cols-4">
            <div className="">
              <div className="flex items-center gap-1 mb-2">
                <p className="font-normal text-textThin text-sm">Topic</p>
                <Tooltip title="Pilih topik utama yang relevan dengan influencer yang ingin Anda cari, Ketik Minimal 3 huruf untuk mencari topic yang tersedia.">
                  <div className="p-[2px] bg-sky-500 cursor-pointer rounded-full">
                    {" "}
                    <FaQuestion className="text-[10px] text-white" />
                  </div>
                </Tooltip>
              </div>

              <Autocomplete
                disablePortal
                options={topicOptions}
                loading={loading}
                noOptionsText={
                  loading
                    ? "Loading..."
                    : inputValue.length < 3
                    ? "Type at least 3 characters"
                    : "No options"
                }
                onInputChange={(event, newValue) => setInputValue(newValue)}
                onChange={(event, newValue) => {
                  handleInputChange("discovery_topic_value", [
                    newValue?.value || "",
                  ]);
                }}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Topic"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <div className="animate-spin w-4 h-4 border-2 border-teal-500 rounded-full border-t-transparent mr-2"></div>
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </div>

            <div className="">
              <div className="flex items-center gap-1 mb-2">
                <p className="font-normal text-textThin text-sm">Hashtag</p>
                <Tooltip title="Gunakan hashtag populer yang sering digunakan oleh influencer, misalnya #fitness atau #travel, untuk menemukan konten yang sesuai.">
                  <div className="p-[2px] bg-sky-500 cursor-pointer rounded-full">
                    {" "}
                    <FaQuestion className="text-[10px] text-white" />
                  </div>
                </Tooltip>
              </div>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-hashtag"
                  className="py-2"
                  placeholder="Hashtag"
                  value={formData.discovery_hashtag_value[0]}
                  onChange={(e) =>
                    handleInputChange("discovery_hashtag_value", [
                      e.target.value,
                    ])
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <FaSearch className="text-textThin font-thin" />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-hashtag-helper-text"
                  inputProps={{
                    "aria-label": "hashtag",
                  }}
                />
              </FormControl>
            </div>
            {/* <input
                      type="text"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Hashtag"
                      required
                    /> */}

            <div className="">
              <div className="flex items-center gap-1 mb-2">
                <p className="font-normal text-textThin text-sm">Interest</p>
                <Tooltip title="Tentukan kategori minat audiens influencer, seperti olahraga, musik, atau gaming, agar pencarian lebih relevan.">
                  <div className="p-[2px] bg-sky-500 cursor-pointer rounded-full">
                    {" "}
                    <FaQuestion className="text-[10px] text-white" />
                  </div>
                </Tooltip>
              </div>
              <Autocomplete
                disablePortal
                options={interestOption}
                onChange={(event, newValue) =>
                  handleInputChange("discovery_interest_value", [
                    newValue?.value || formData.discovery_interest_value[0],
                  ])
                }
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Interest" />
                )}
              />
            </div>

            <div className="">
              <div className="flex items-center gap-1 mb-2">
                <p className="font-normal text-textThin text-sm">Keyword</p>
                <Tooltip title="Masukkan kata kunci spesifik yang menggambarkan influencer atau niche yang Anda cari, seperti ‘review gadget’ atau ‘fashion tips’.">
                  <div className="p-[2px] bg-sky-500 cursor-pointer rounded-full">
                    {" "}
                    <FaQuestion className="text-[10px] text-white" />
                  </div>
                </Tooltip>
              </div>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-keyword"
                  className="py-2"
                  placeholder="Keyword"
                  value={formData.discovery_keyword_value[0]}
                  onChange={(e) =>
                    handleInputChange("discovery_keyword_value", [
                      e.target.value,
                    ])
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <FaSearch className="text-textThin font-thin" />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-keyword-helper-text"
                  inputProps={{
                    "aria-label": "keyword",
                  }}
                />
              </FormControl>
            </div>
          </div>

          <div className="creator-form p-6 border border-[#C4C4C4] rounded-md mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h1 className="font-medium text-lg text-textBold">Creator</h1>
                <Tooltip title="Pilih jenis kreator berdasarkan ukuran dan jenis konten mereka, misalnya jumlah pengikut, lokasu, usia, dll.">
                  <div className="p-[2px] bg-sky-500 cursor-pointer rounded-full">
                    {" "}
                    <FaQuestion className="text-[10px] text-white" />
                  </div>
                </Tooltip>
              </div>
              {!showCreator ? (
                <button
                  className="rounded-full border border-textBold"
                  onClick={() => setShowCreator(true)}
                >
                  <BiChevronDown size={22} />
                </button>
              ) : (
                <button
                  className="rounded-full border border-textBold"
                  onClick={() => setShowCreator(false)}
                >
                  <BiChevronUp size={22} />
                </button>
              )}
            </div>

            <div
              className={`${
                !showCreator ? "hidden" : ""
              } card font-normal text-textThin text-[15px] mt-4`}
            >
              <div className="form mt-6 items-center gap-4 grid grid-cols-2 md:grid-cols-4">
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
                      handleInputChange(
                        "followers_range",
                        newValue?.value || ""
                      )
                    }
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Followers Range" />
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
                      value={formData.followers_min}
                      onChange={(e) =>
                        handleInputChange(
                          "followers_min",
                          Number(e.target.value)
                        )
                      }
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min"
                    />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      value={formData.followers_max}
                      onChange={(e) =>
                        handleInputChange(
                          "followers_max",
                          Number(e.target.value)
                        )
                      }
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max"
                      required
                    />
                  </div>
                </div> */}

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Average Likes
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="number-input"
                      value={formData.avg_like_min}
                      onChange={(e) =>
                        handleInputChange(
                          "avg_like_min",
                          Number(e.target.value)
                        )
                      }
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min"
                      required
                    />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      value={formData.avg_like_max}
                      onChange={(e) =>
                        handleInputChange(
                          "avg_like_max",
                          Number(e.target.value)
                        )
                      }
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max"
                      required
                    />
                  </div>
                </div>

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Creator Country
                  </p>
                  <Autocomplete
                    disablePortal
                    value={countryOptions[0]}
                    options={countryOptions}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Creator Country" />
                    )}
                  />
                </div>

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Creator City
                  </p>
                  <Autocomplete
                    disablePortal
                    options={
                      formData.platform === "INSTAGRAM" ? cityOptions : []
                    } // Batasi pilihan jika platform bukan INSTAGRAM
                    value={
                      cityOptions.find(
                        (option) =>
                          option.value === formData.creator_location_name
                      ) || cityOptions[0]
                    } // Default ke "Any"
                    onChange={(e, newValue) =>
                      handleInputChange(
                        "creator_location_name",
                        newValue?.value || "Indonesia"
                      )
                    }
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Creator City" />
                    )}
                  />
                </div>
              </div>

              <div className="form mt-6 items-center gap-4 grid grid-cols-2 md:grid-cols-4">
                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Creator Gender
                  </p>
                  <Autocomplete
                    disablePortal
                    options={genderOptions}
                    sx={{ width: "100%" }}
                    value={formData.creator_gender}
                    onChange={(e, newValue) =>
                      handleInputChange("creator_gender", newValue?.value || "")
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Creator Gender" />
                    )}
                  />
                </div>

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Creator Age
                  </p>
                  <Autocomplete
                    disablePortal
                    options={ageOptions}
                    value={ageOptions.find(
                      (option) =>
                        option.value ===
                          formData.creator_age_min?.toString() +
                            (formData.creator_age_max
                              ? ` - ${formData.creator_age_max}`
                              : " >") || ""
                    )}
                    onChange={(e, newValue) =>
                      handleInputChange("creator_age", newValue?.value || "")
                    }
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Creator Age" />
                    )}
                  />
                </div>

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Verified
                  </p>
                  <Autocomplete
                    disablePortal
                    options={verifiedOptions}
                    value={formData.verified}
                    onChange={(e, newValue) =>
                      handleInputChange("verified", newValue?.value || "")
                    }
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Verified" />
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
                    value={formData.account_type}
                    onChange={(e, newValue) =>
                      handleInputChange("account_type", newValue?.value || "")
                    }
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Account Type" />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="audience-form p-6 border border-[#C4C4C4] rounded-md mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h1 className="font-medium text-lg text-textBold">Audience</h1>
                <Tooltip title="Filter influencer berdasarkan karakteristik audiens mereka, seperti demografi, lokasi, atau ketertarikan spesifik.">
                  <div className="p-[2px] bg-sky-500 cursor-pointer rounded-full">
                    {" "}
                    <FaQuestion className="text-[10px] text-white" />
                  </div>
                </Tooltip>
              </div>

              {!showAudience ? (
                <button
                  className="rounded-full border border-textBold"
                  onClick={() => setShowAudience(true)}
                >
                  <BiChevronDown size={22} />
                </button>
              ) : (
                <button
                  className="rounded-full border border-textBold"
                  onClick={() => setShowAudience(false)}
                >
                  <BiChevronUp size={22} />
                </button>
              )}
            </div>

            <div
              className={`${
                !showAudience ? "hidden" : ""
              } card font-normal text-textThin text-[15px] mt-4`}
            >
              <div className="form mt-6 items-center gap-4 grid grid-cols-2 md:grid-cols-4">
                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Audience Gender
                  </p>
                  <Autocomplete
                    disablePortal
                    options={genderOptions}
                    sx={{ width: "100%" }}
                    value={formData.audience_gender}
                    onChange={(e, newValue) =>
                      handleInputChange(
                        "audience_gender",
                        newValue?.value || ""
                      )
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Audience Gender" />
                    )}
                  />
                </div>

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Audience Age
                  </p>
                  <Autocomplete
                    disablePortal
                    options={ageOptions}
                    value={ageOptions.find(
                      (option) =>
                        option.value ===
                          formData.audience_age_min?.toString() +
                            (formData.audience_age_max
                              ? ` - ${formData.audience_age_max}`
                              : " >") || ""
                    )}
                    onChange={(e, newValue) =>
                      handleInputChange("audience_age", newValue?.value || "")
                    }
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Audience Age" />
                    )}
                  />
                </div>

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Audience Country
                  </p>
                  <Autocomplete
                    disablePortal
                    options={countryOptions}
                    value={countryOptions[0]}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Audience Country" />
                    )}
                  />
                </div>

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Audience City
                  </p>
                  <Autocomplete
                    disablePortal
                    options={
                      formData.platform === "INSTAGRAM" ? cityOptions : []
                    } // Batasi pilihan jika platform bukan INSTAGRAM
                    value={
                      cityOptions.find(
                        (option) =>
                          option.value === formData.audience_location_name
                      ) || cityOptions[0]
                    } // Default ke "Any"
                    onChange={(e, newValue) =>
                      handleInputChange(
                        "audience_location_name",
                        newValue.value || "Indonesia"
                      )
                    }
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Audience City" />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="audience-form p-6 border border-[#C4C4C4] rounded-md mt-6">
            <div className="flex items-center justify-between">
              <h1 className="font-medium text-lg text-textBold">Sort By</h1>
              {!showSort ? (
                <button
                  className="rounded-full border border-textBold"
                  onClick={() => setShowSort(true)}
                >
                  <BiChevronDown size={22} />
                </button>
              ) : (
                <button
                  className="rounded-full border border-textBold"
                  onClick={() => setShowSort(false)}
                >
                  <BiChevronUp size={22} />
                </button>
              )}
            </div>

            <div
              className={`${
                !showSort ? "hidden" : ""
              } card font-normal text-textThin text-[15px] mt-4`}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  className={`${
                    formData.sorting_by === "REELS_VIEWS"
                      ? "bg-[#dcdcdf] border-blue-500 border-2"
                      : "bg-[#efeff1]"
                  } text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center`}
                  onClick={() => handleInputChange("sorting_by", "REELS_VIEWS")}
                >
                  <p
                    className={`${
                      formData.sorting_by === "REELS_VIEWS"
                        ? "font-bold text-blue-500"
                        : "font-medium"
                    }`}
                  >
                    Instagram Reels View
                  </p>
                </button>

                {/* Button 2: Engagement Rate */}
                <button
                  className={`${
                    formData.sorting_by === "ENGAGEMENT_RATE"
                      ? "bg-[#dcdcdf] border-blue-500 border-2"
                      : "bg-[#efeff1]"
                  } text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center`}
                  onClick={() =>
                    handleInputChange("sorting_by", "ENGAGEMENT_RATE")
                  }
                >
                  <p
                    className={`${
                      formData.sorting_by === "ENGAGEMENT_RATE"
                        ? "font-bold text-blue-500"
                        : "font-medium"
                    }`}
                  >
                    Engagement Rate
                  </p>
                </button>

                {/* Button 3: Followers */}
                <button
                  className={`${
                    formData.sorting_by === "FOLLOWER_COUNT"
                      ? "bg-[#dcdcdf] border-blue-500 border-2"
                      : "bg-[#efeff1]"
                  } text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center`}
                  onClick={() =>
                    handleInputChange("sorting_by", "FOLLOWER_COUNT")
                  }
                >
                  <p
                    className={`${
                      formData.sorting_by === "FOLLOWER_COUNT"
                        ? "font-bold text-blue-500"
                        : "font-medium"
                    }`}
                  >
                    Followers
                  </p>
                </button>
              </div>
            </div>
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
        <ResultDiscovery
          title="Result History Discovery"
          data={showResult}
          dataResult={dataResult}
          loading={loading}
          page={page}
          setPage={setPage}
          handleSearch={handleSearch}
          handleSearchPagination={handleSearchPagination}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default Filter;
