import React, { useState } from 'react'
import Card from '../Card/Card'
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import { FaHistory, FaLine, FaSearch, FaTiktok, FaYoutube } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from '../../data/top100Films';

const Filter = ({showFilter, setShowFilter}) => {
    const [showCreator, setShowCreator] = useState(true);
  const [showAudience, setShowAudience] = useState(false);
  const [showSort, setShowSort] = useState(true);
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
          } card font-normal text-textThin text-[15px] mt-4`}
        >
          <p>Social Media</p>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-[#dcdcdf] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] border-2 border-blue-500 rounded-full px-6 py-2 shadow-sm flex items-center">
              <img
                src="logo-instagram.png"
                alt="Logo Instagram"
                className="w-6"
              />
              <p className="font-bold text-blue-500">Instagram</p>
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

          <div className="form mt-6 items-center gap-4 grid grid-cols-2 md:grid-cols-4">
            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Topic</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Topic" />
                )}
              />
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Hashtag</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Hashtag" />
                )}
              />
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Interest</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Interest" />
                )}
              />
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Keyword</p>
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
              <div className="form mt-6 items-center gap-4 grid grid-cols-2 md:grid-cols-4">
                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Followers Range
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min"
                      required
                    />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max"
                      required
                    />
                  </div>
                </div>

                <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Average Likes
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min"
                      required
                    />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    options={top100Films}
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
                    options={top100Films}
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
                    options={top100Films}
                    sx={{ width: "100%" }}
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
                    options={top100Films}
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
                    options={top100Films}
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

          <div className="audience-form p-6 border border-[#C4C4C4] rounded-md mt-6">
            <div className="flex items-center justify-between">
              <h1 className="font-medium text-lg text-textBold">Audience</h1>
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
                    options={top100Films}
                    sx={{ width: "100%" }}
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
                    options={top100Films}
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
                    options={top100Films}
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
                    options={top100Films}
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
            <button className="bg-[#dcdcdf] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] border-2 border-blue-500 rounded-full px-6 py-2 shadow-sm flex items-center">

              <p className="font-bold text-blue-500">Instagram Reels View</p>
            </button>

            <button className="bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center">

              <p className="font-medium">Engagement Rate</p>
            </button>

            <button className="bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] rounded-full px-6 py-2 shadow-sm flex items-center">
              <p className="font-medium">Followers</p>
            </button>
          </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
        <button
                className="border border-sky-500  text-sky-500 font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Reset
              </button>
              <button
                className=" bg-sky-500 flex gap-2 items-center text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <FaSearch />
                Search
              </button>
        </div>
      </Card>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg text-textBold">Result Discovery</h1>
<p>Creator Found</p>
        </div>

<div className="py-6 flex items-center justify-center flex-col gap-2">
    <img src="/NotFound.png" alt="" className='w-1/2 sm:w-1/3' />
    <h1 className='font-medium text-textBold text-center'>No results found    </h1>
    <p className='font-normat text-textThin text-center text-sm'>Looks like there's no data here. Try using our filters above to discover the information you need.    </p>
</div>
      </Card>
      </div>
  )
}

export default Filter