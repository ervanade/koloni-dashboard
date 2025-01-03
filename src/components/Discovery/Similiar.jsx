import React, { useState } from 'react'
import Card from '../Card/Card'
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import { FaHistory, FaLine, FaSearch, FaTiktok, FaYoutube } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from '../../data/top100Films';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { accountOptions, basedOptions, cityOptions, countryOptions, socialOptions } from '../../data/data';
import ResultSImiliar from './ResultSimiliar';

const Similiar = ({showFilter, setShowFilter}) => {
    const [showCreator, setShowCreator] = useState(true);
  const [showAudience, setShowAudience] = useState(false);
  const [showSort, setShowSort] = useState(true);
  const [showResult, setShowResult] = useState(false);
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
              <FormControl sx={{ width: '100%' }} variant="outlined">
              <OutlinedInput
            id="outlined-adornment-creator-name"
            className='py-2'
            placeholder='Creator Name'
            endAdornment={<InputAdornment position="end"><FaSearch className='text-textThin font-thin'/></InputAdornment>}
            aria-describedby="outlined-creator-name-helper-text"
            inputProps={{
              'aria-label': 'creator-name',
            }}
          />
        </FormControl>
            </div>

            <div className="">
              <p className="font-normal text-textThin text-sm mb-2">Based On</p>
              <Autocomplete
                disablePortal
                options={basedOptions}
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
                options={socialOptions}
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

          <div className="form mt-6 items-center gap-4 grid grid-cols-1 md:grid-cols-3">
          <div className="">
                  <p className="font-normal text-textThin text-sm mb-2">
                    Creator Country
                  </p>
                  <Autocomplete
                    disablePortal
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
                    options={cityOptions}
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
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Account Type" />
                    )}
                  />
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
                onClick={() => setShowResult(!showResult)}
              >
                <FaSearch />
                Search
              </button>
        </div>
        </div>

       
      </Card>

      <ResultSImiliar title="Result History Discovery" data={showResult}/>

      </div>
  )
}

export default Similiar
