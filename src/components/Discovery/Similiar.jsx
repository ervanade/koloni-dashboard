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
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Similiar = ({showFilter, setShowFilter}) => {
  const [formData, setFormData] = useState({
    "platform": "INSTAGRAM",
    "audience_age_max": null,
    "audience_age_min": null,
    "creator_age_max": null,
    "creator_age_min": null,
    "audience_location_name": "Indonesia",
    "creator_location_name": "Indonesia",
    "followers_min": null,
    "followers_max": null,
    "audience_lookalikes": null,
    "creator_lookalikes": "",
    "sorting_by": "CREATOR_LOOKALIKES",
    "previous_call_id": null,
    "next_page": 0

    })
    const user = useSelector((a) => a.auth.user);

    const handleInputChange = (field, value) => {
      if (field === "creator_age") {
        if (!value) {
          // Reset jika memilih "Any"
          setFormData((prev) => ({
            ...prev,
            creator_age_min: 0,
            creator_age_max: 100,
          }));
        } else if (value === "55 >") {
          // Jika memilih "55 >"
          setFormData((prev) => ({
            ...prev,
            creator_age_min: 55,
            creator_age_max: null,
          }));
        } else {
          // Jika memilih rentang usia (contoh: "18 - 24")
          const [min, max] = value.split(" - ").map(Number);
          setFormData((prev) => ({
            ...prev,
            creator_age_min: min,
            creator_age_max: max,
          }));
        }
      } else if (field === "audience_age") {
        if (!value) {
          // Reset jika memilih "Any"
          setFormData((prev) => ({
            ...prev,
            audience_age_min: 0,
            audience_age_max: 100,
          }));
        } else if (value === "55 >") {
          // Jika memilih "55 >"
          setFormData((prev) => ({
            ...prev,
            audience_age_min: 55,
            audience_age_max: null,
          }));
        } else {
          // Jika memilih rentang usia (contoh: "18 - 24")
          const [min, max] = value.split(" - ").map(Number);
          setFormData((prev) => ({
            ...prev,
            audience_age_min: min,
            audience_age_max: max,
          }));
        }
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleReset = () => {
    navigate(location.pathname, { replace: true });
  }
  return (
    <div>
    <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg text-textBold">Filter By Similiar</h1>
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
            value={formData.creator_lookalikes}
              onChange={(e) => handleInputChange("creator_lookalikes", e.target.value)}
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
                value={basedOptions.find(option => option.value === formData.sorting_by) || null} 
    onChange={(e, newValue) => handleInputChange("sorting_by", newValue?.value || "")}
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
                value={socialOptions.find(option => option.value === formData.platform) || null} 
                onChange={(e, newValue) => handleInputChange("platform", newValue?.value || "")}
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
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min"
                      value={formData.followers_min}
              onChange={(e) => handleInputChange("followers_min", Number(e.target.value))}
                      required
                    />
                    <FaMinus className="text-2xl" />
                    <input
                      type="number"
                      id="number-input"
                      value={formData.followers_max}
              onChange={(e) => handleInputChange("followers_max", Number(e.target.value))}
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-[#C4C4C4] text-textBold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    value={formData.account_type}
            onChange={(e, newValue) => handleInputChange("account_type", newValue?.value || "")}
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
                onClick={handleReset}
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
