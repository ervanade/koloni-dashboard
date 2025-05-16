import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card/Card";
import { FaSearch, FaTrash, FaUser } from "react-icons/fa";
import { FaChartBar, FaChartColumn, FaComment, FaEye, FaHeart, FaMoneyBill } from 'react-icons/fa6';
import { BiSolidComment, BiSolidLike } from 'react-icons/bi';

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DataTable from "react-data-table-component";
import UserDefault from "../../assets/user/user-default.png";
import { CgSpinner } from "react-icons/cg";
import { dataUser } from "../../data/dummyData";
import AddUser from "../../components/Modal/AddUser";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import EditUser from "../../components/Modal/EditUser";
import { DataFormater } from "../../data/data";
import { MdContentPasteSearch } from "react-icons/md";
import { RiUserSearchLine } from "react-icons/ri";

const Credits = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userEdit, setUserEdit] = useState(null);

  const [search, setSearch] = useState(""); // Initialize search state with an empty string
  const [data, setData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = data.filter((item) => {
      return (
        (item?.user_name && item.user_name.toLowerCase().includes(value)) ||
        (item?.search_type && item.search_type.toLowerCase().includes(value)) ||
        (item?.search_query && item.search_query.toLowerCase().includes(value))
      );
    });

    setFilteredData(filtered);
  };
  const user = useSelector((a) => a.auth.user);

  const fetchUserData = async () => {
    setLoading(true);
    setError(false);
    try {
      const userData = dataUser;
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/logs`,
        headers: {
          "Content-Type": "application/json",
          //eslint-disable-next-line
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      setError(true);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const confirmEmail = async (id, formDataToSend) => {
    try {
      // Menambahkan email_confirmed_at dengan tanggal sekarang
      const updatedData = {
        email_confirmed_at: new Date().toISOString(), // Menambahkan tanggal sekarang,
        disabled: false,
      };

      await axios({
        method: "put",
        url: `${import.meta.env.VITE_APP_API_URL}/users/${encodeURIComponent(
          id
        )}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        data: JSON.stringify(updatedData),
      });

      Swal.fire("Success Confirm User!", "", "success");
      fetchUserData();
    } catch (error) {
      setLoading(false);
      console.log(error);
      // if (error.response?.status === 500) {
      //   Swal.fire("Error", "Email Telah Digunakan", "error");
      //   setLoading(false);
      //   return;
      // } else {
      //   Swal.fire("Error", "Terjadi Kesalahan, Coba Lagi", "error");
      // }
    }
  };

  const handleConfirmUser = async (id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You will Confirm This User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm it!",
      confirmButtonColor: "#24A5E9",
    }).then(async (result) => {
      if (result.value) {
        await confirmEmail(id);
        Swal.fire({
          icon: "success",
          title: "Confirmed!",
          text: "Your User has been confirmed.",
        });
      }
    });
  };

  const deleteUser = async (id) => {
    await axios({
      method: "delete",
      url: `${import.meta.env.VITE_APP_API_URL}/users/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then(() => {
        fetchUserData();
      })
      .catch((error) => {
        fetchUserData();
        console.log(error);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleConfirmDeleteUser = async (id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You will Delete This User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#24A5E9",
    }).then(async (result) => {
      if (result.value) {
        await deleteUser(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your User has been deleted.",
        });
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        name: "Username",
        selector: (row) => row.user_name,
        cell: (row) => (
          <div className="flex items-center gap-2  text-sm font-publicSans">
            {" "}
            <img
              src={"/user-default.png"}
              className="rounded-full w-8 h-8"
              alt="Brand Image"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/user-default.png";
              }}
            />
            <p className="text-center">{row.user_name}</p>
          </div>
        ),
        sortable: true,
        width: "250px",
      },
      //   {
      //     name: "User IP",
      //     selector: (row) => row.user_ip,
      //     sortable: true,
      //     width: "120px",
      //   },
      //   {
      //     name: "User Agent",
      //     selector: (row) => row.user_agent,
      //     sortable: true,
      //     cell: (row) => (
      //       <div className="text-wrap py-2 leading-5">{row.user_agent}</div>
      //     ),
      //     width: "150px",
      //   },
      {
        name: <div className="text-wrap">Action</div>,
        selector: (row) => row.search_query,
        sortable: true,
        cell: (row) => (
          <div className="text-wrap py-2 leading-5">{row.search_query}</div>
        ),
        minWidth: "120px",
      },
      {
        name: "Search Type",
        selector: (row) => row.search_type,
        sortable: true,
        width: "150px",
      },
      {
        name: "Search Date",
        selector: (row) => row.search_date,
        sortable: true,
      },
    ],
    []
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchCreditsData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/users/credits`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      const data = response?.data;
      setCreditsData(data)
     
    } catch (error) {
      setError(true);
      console.error("Error fetching credits data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCreditsData();
  }, []);
  return (
    <div>
      <AddUser
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        fetchUserData={fetchUserData}
      />
      <EditUser
        isDrawerOpen={isEditOpen}
        setIsDrawerOpen={setIsEditOpen}
        fetchUserData={fetchUserData}
        userData={userEdit}
      />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">
            Credit Reports
          </h1>
          <p className="font-normal text-textThin">Credit Reports</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">

      <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <MdContentPasteSearch className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          Credit Discovery 
          </h2>
          <p className="font-bold text-sky-500 text-2xl">

             {(creditsData?.credits_discovery)?.toLocaleString("id-ID")}
          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <RiUserSearchLine className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          Credits Analyser 
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
          {(creditsData?.credits_analyzer)?.toLocaleString("id-ID")}

          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <FaChartColumn className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          Credits Analytics 
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
          {(creditsData?.credits_analytics)?.toLocaleString("id-ID")}

          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <MdContentPasteSearch className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          Credit Discovery Usage 
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
          {(145).toLocaleString("id-ID")}

          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <RiUserSearchLine className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          Credits Analyser Usage 
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
          {(120).toLocaleString("id-ID")}

          </p>
        </Card>

        <Card className="flex flex-col gap-2 border border-[#C4C4C4] p-4 px-6 rounded-md  ">
          <div className="rounded-full bg-[#EBEEF4] flex items-center justify-center w-9 h-9 ">
            <FaChartColumn className="text-sky-500" size={20} />
          </div>
          <h2 className="font-bold text-textBold text-base">
          Credits Analytics Usage 
          </h2>
          <p className="font-bold text-sky-500 text-2xl">
          {(23).toLocaleString("id-ID")}

          </p>
        </Card>
      </div>
      <div className="my-6 flex items-center justify-between">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">
            Credits Activity
          </h1>
          <p className="font-normal text-textThin">Credits Activity</p>
        </div>
      </div>
      <Card>
        <div className="flex items-center justify-between gap-2">
          <div className="relative ">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <FaSearch className="text-[#bebaba]" />
            </button>

            <input
              value={search}
              onChange={handleSearch}
              type="text"
              placeholder="Search..."
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-2 rounded-md"
            />
          </div>
          {/* <button
            className=" bg-sky-500 text-sm flex gap-2 items-center text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => setIsDrawerOpen(true)}
          >
            {" "}
            Add User
          </button> */}
        </div>
        <div className="overflow-x-auto mt-6 font-publicSans">
          {loading ? (
            <div className="flex justify-center items-center">
              <CgSpinner className="animate-spin inline-block w-8 h-8 text-sky-500" />
              <span className="ml-2">Loading...</span>
            </div>
          ) : error || filteredData.length === 0 ? (
            <div className="text-center">Data Tidak Tersedia.</div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              persistTableHead
              highlightOnHover
              pointerOnHover
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#F1F5F9",
                    color: "#433F4F",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Public Sans",
                  },
                },
                rows: {
                  style: {
                    paddingTop: "16px", // override the cell padding for data cells
                    paddingBottom: "16px",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                  },
                },
              }}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Credits;
