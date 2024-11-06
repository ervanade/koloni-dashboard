import React, { useState } from 'react'
import Card from '../Card/Card'
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import { FaHistory, FaLine, FaSearch, FaTiktok, FaYoutube } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from '../../data/top100Films';

const Similiar = ({showFilter, setShowFilter}) => {
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
          <div className="form mt-6 items-center gap-4 grid grid-cols-2 md:grid-cols-4">
            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Creator Name</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Creator Name" />
                )}
              />
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Based On</p>
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Based On" />
                )}
              />
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Social Media</p>
              <Autocomplete
                disablePortal
                options={top100Films}
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

export default Similiar
