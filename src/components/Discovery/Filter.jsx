import React, { useState } from 'react'
import Card from '../Card/Card'
import { FaFilter, FaInstagram, FaMinus } from "react-icons/fa6";
import { FaHistory, FaLine, FaSearch, FaTiktok, FaYoutube } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from '../../data/top100Films';
import { accountOptions, ageOptions, cityOptions, countryOptions, genderOptions, interestOption, topicOptions, verifiedOptions } from '../../data/data';
import ResultDiscovery from './ResultDiscovery';
import { FilledInput, FormControl, FormHelperText, InputAdornment, OutlinedInput } from '@mui/material';

const Filter = ({showFilter, setShowFilter}) => {
  const [formData, setFormData] = useState({
  "platform": "INSTAGRAM",
    "audience_age_max": 100000,
    "audience_age_min": 0,
    "creator_age_max": 1000000,
    "creator_age_min": 0,
    "audience_gender": null,
    "creator_gender": null,
    "audience_location_name": "Indonesia",
    "creator_location_name": "Indonesia",
    "call_id": null,
    "followers_min": null,
    "followers_max": null,
    "avg_views_min": null,
    "avg_views_max": null,
    "avg_like_max": null,
    "avg_like_min": null,
    "verified": null,
    "previous_call_id": null,
    "sorting_by": "REELS_VIEWS",
    "next_page": 0,
    "platform_account_type": null,
    "discovery_interest_value":["Sports"],
    "discovery_hashtag_value":["bola"],
    "discovery_keyword_value":["bola"],
    "discovery_topic_value":["bola"]
  })
    const [showCreator, setShowCreator] = useState(true);
  const [showAudience, setShowAudience] = useState(false);
  const [showSort, setShowSort] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value
    }));
  };
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
        {["INSTAGRAM", "TIKTOK", "YOUTUBE"].map((platform) => (
          <button
            key={platform}
            onClick={() => handleInputChange("platform", platform)}
            className={`bg-[#efeff1] text-textBold gap-2 mt-2 hover:bg-[#dcdcdf] font-medium ${formData.platform === platform ? "border-2 border-blue-500 !bg-[#dcdcdf] !text-blue-500 !font-bold " : ""} rounded-full px-6 py-2 shadow-sm flex items-center`}
          >
            <img src={`logo-${platform.toLowerCase()}.png`} alt={`Logo ${platform}`} className="w-6" />
            <p>{platform.charAt(0) + platform.slice(1).toLowerCase()}</p>
          </button>
        ))}
      </div>

          <div className="form mt-6 items-center gap-4 grid grid-cols-2 md:grid-cols-4">
          <div className="">
        <p className="font-normal text-textThin text-sm mb-2">Topic</p>
        <Autocomplete
          disablePortal
          options={topicOptions}
          onChange={(event, newValue) => handleInputChange('discovery_topic_value', [newValue?.value || formData.discovery_topic_value[0]])}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Topic" />
          )}
        />
      </div>

      <div className="">
        <p className="font-normal text-textThin text-sm mb-2">Hashtag</p>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-hashtag"
            className='py-2'
            placeholder='Hashtag'
            value={formData.discovery_hashtag_value[0]}
            onChange={(e) => handleInputChange('discovery_hashtag_value', [e.target.value])}
            endAdornment={<InputAdornment position="end"><FaSearch className='text-textThin font-thin' /></InputAdornment>}
            aria-describedby="outlined-hashtag-helper-text"
            inputProps={{
              'aria-label': 'hashtag',
            }}
          />
        </FormControl>
      </div>
              {/* <input
                      type="text"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Hashtag"
                      required
                    /> */}

<div className="">
        <p className="font-normal text-textThin text-sm mb-2">Interest</p>
        <Autocomplete
          disablePortal
          options={interestOption}
          onChange={(event, newValue) => handleInputChange('discovery_interest_value', [newValue?.value || formData.discovery_interest_value[0]])}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Interest" />
          )}
        />
      </div>

      <div className="">
        <p className="font-normal text-textThin text-sm mb-2">Keyword</p>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-keyword"
            className='py-2'
            placeholder='Keyword'
            value={formData.discovery_keyword_value[0]}
            onChange={(e) => handleInputChange('discovery_keyword_value', [e.target.value])}
            endAdornment={<InputAdornment position="end"><FaSearch className='text-textThin font-thin' /></InputAdornment>}
            aria-describedby="outlined-keyword-helper-text"
            inputProps={{
              'aria-label': 'keyword',
            }}
          />
        </FormControl>
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
              value={formData.followers_min}
              onChange={(e) => handleInputChange("followers_min", Number(e.target.value))}
              className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              placeholder="Min"
            />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      value={formData.followers_max}
              onChange={(e) => handleInputChange("followers_max", Number(e.target.value))}
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
                      value={formData.avg_like_min}
                      onChange={(e) => handleInputChange("avg_like_min", Number(e.target.value))}
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min"
                      required
                    />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      value={formData.avg_like_max}
                      onChange={(e) => handleInputChange("avg_like_max", Number(e.target.value))}
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
                    value={formData.creator_age}
            onChange={(e, newValue) => handleInputChange("creator_age", newValue?.value || "")}
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
            onChange={(e, newValue) => handleInputChange("verified", newValue?.value || "")}
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
            onChange={(e, newValue) => handleInputChange("account_type", newValue?.value || "")}
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
                    options={genderOptions}
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
                    options={ageOptions}
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
                    options={cityOptions}
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

      <ResultDiscovery title="Result History Discovery" data={showResult}/>
      </div>
  )
}

export default Filter
