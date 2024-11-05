import React, { useState } from "react";
import Card from "../components/Card/Card";
import { FaInstagram, FaMinus } from "react-icons/fa6";
import { FaLine, FaTiktok, FaYoutube } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from "../data/top100Films";

const Discovery = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [showCreator, setShowCreator] = useState(true);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">Discovery</h1>
          <p className="font-normal text-textThin">
            Discover the right creators for your campaigns
          </p>
        </div>
        <div className="bg-[#efeff1] text-blue-500 rounded-full px-4 py-2 shadow-sm">
          <p className="font-medium">
            Remaining Discovery Credits / Remaining Credits 2
          </p>
        </div>
      </div>
      <Card>
        <div></div>
        <h1 className="font-medium text-lg mb-4">Discovery Analytics</h1>
        <div className="card font-normal text-textThin text-[15px]">
          <p>
            Revolutionize influencer marketing with our smart discovery and
            analytics. Effortlessly find, assess, and collaborate with
            influencers. Simplify campaigns and succeed with real-time insights.
          </p>
        </div>
      </Card>

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
          } card font-normal text-textThin text-[15px] mt-4`}
        >
          <p>Social Media</p>
          <div className="flex items-center gap-4">
            <button className="bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center">
              <img
                src="logo-instagram.png"
                alt="Logo Instagram"
                className="w-6"
              />
              <p className="font-medium">Instagram</p>
            </button>

            <button className="bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center">
              <img src="logo-tiktok.png" alt="Logo Tiktok" className="w-6" />{" "}
              <p className="font-medium">Tiktok</p>
            </button>

            <button className="bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center">
              <img src="logo-youtube.png" alt="Logo Youtube" className="w-6" />{" "}
              <p className="font-medium">Youtube</p>
            </button>
          </div>

          <div className="form mt-6 flex items-center gap-4">
            <div className="w-1/4">
              <p className="font-normal text-textBold text-sm mb-2">Topic</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Topic" />
                )}
              />
            </div>

            <div className="w-1/4">
              <p className="font-normal text-textBold text-sm mb-2">Hashtag</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Hashtag" />
                )}
              />
            </div>

            <div className="w-1/4">
              <p className="font-normal text-textBold text-sm mb-2">Interest</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Interest" />
                )}
              />
            </div>

            <div className="w-1/4">
              <p className="font-normal text-textBold text-sm mb-2">Keyword</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Keyword" />
                )}
              />
            </div>
          </div>
          <div className="creator-form p-6 border border-[#C4C4C4] rounded-md mt-6">
            <div className="flex items-center justify-between">
              <h1 className="font-medium text-lg text-textBold">Creator</h1>
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
              <div className="form mt-6 flex items-center gap-4">
                <div className="w-1/4">
                  <p className="font-normal text-textBold text-sm mb-2">
                    Followers Range
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min"
                      required
                    />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max"
                      required
                    />
                  </div>
                </div>

                <div className="w-1/4">
                  <p className="font-normal text-textBold text-sm mb-2">
                    Average Likes
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min"
                      required
                    />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max"
                      required
                    />
                  </div>
                </div>

                <div className="w-1/4">
                  <p className="font-normal text-textBold text-sm mb-2">
                    Creator Country
                  </p>
                  <Autocomplete
                    disablePortal
                    options={top100Films}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Creator Country" />
                    )}
                  />
                </div>

                <div className="w-1/4">
                  <p className="font-normal text-textBold text-sm mb-2">
                    Creator City
                  </p>
                  <Autocomplete
                    disablePortal
                    options={top100Films}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Creator City" />
                    )}
                  />
                </div>
              </div>

              <div className="form mt-6 flex items-center gap-4">
                <div className="w-1/4">
                  <p className="font-normal text-textBold text-sm mb-2">
                    Creator Gender
                  </p>
                  <Autocomplete
                    disablePortal
                    options={top100Films}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Creator Gender" />
                    )}
                  />
                </div>

                <div className="w-1/4">
                  <p className="font-normal text-textBold text-sm mb-2">
                    Creator Age
                  </p>
                  <Autocomplete
                    disablePortal
                    options={top100Films}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Creator Age" />
                    )}
                  />
                </div>

                <div className="w-1/4">
                  <p className="font-normal text-textBold text-sm mb-2">
                    Verified
                  </p>
                  <Autocomplete
                    disablePortal
                    options={top100Films}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Verified" />
                    )}
                  />
                </div>

                <div className="w-1/4">
                  <p className="font-normal text-textBold text-sm mb-2">
                    Account Type
                  </p>
                  <Autocomplete
                    disablePortal
                    options={top100Films}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Account Type" />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Discovery;
