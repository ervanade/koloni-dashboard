import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card/Card";
import { FaSearch, FaTrash, FaUser } from "react-icons/fa";
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

const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userEdit, setUserEdit] = useState(null);

  const [search, setSearch] = useState(""); // Initialize search state with an empty string
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = data.filter((item) => {
      return item?.email && item.email.toLowerCase().includes(value);
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
        url: `${import.meta.env.VITE_APP_API_URL}/users`,
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
        name: "Email",
        selector: (row) => row.email,
        cell: (row) => (
          <div className="flex items-center gap-2  text-sm font-publicSans text-wrap">
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
            <p className="text-center">{row.email}</p>
          </div>
        ),
        sortable: true,
        width: "220px",
      },
      {
        name: <div className="text-wrap">Username</div>,
        selector: (row) => <p className="text-wrap"> {row.first_name + " " + row.last_name}</p>,
        sortable: true,
      },
      {
        name: "Role",
        selector: (row) => row.roles,
        sortable: true,
      },
      {
        name: <div className="text-wrap">Credits Discovery</div>,
        selector: (row) => row?.credits_discovery,
        sortable: true,
      },
      {
             name: <div className="text-wrap">Credits Analyser</div>,
        selector: (row) => row?.credits_analyzer,
        sortable: true,
      },
      {
             name: <div className="text-wrap">Credits Analytics</div>,
        selector: (row) => row?.credits_analytics,
        sortable: true,
      },
      // {
      //        name: <div className="text-wrap">Credits Listening</div>,
      //   selector: (row) => row?.credits_discovery,
      //   sortable: true,
      // },
      {
        name: "Status",
        cell: (row) => (
          <div className="flex items-center">
            {row.email_confirmed_at ? (
              <div className="px-4 py-2 text-white text-xs rounded-md bg-green-500">
                Active
              </div>
            ) : (
              <button
                className="px-4 py-2 text-white text-xs rounded-md bg-yellow-500"
                onClick={() => handleConfirmUser(row._id)}
              >
                Konfirmasi
              </button>
            )}
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: "Aksi",
        cell: (row) => (
          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 text-white rounded-md bg-sky-500"
              onClick={() => {
                setUserEdit(row);
                setIsEditOpen(true);
              }}
            >
              Edit
            </button>
            {user.roles === "admin" ? (
              <button
                title="Delete"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleConfirmDeleteUser(row._id)}
              >
                <FaTrash size={16} />
              </button>
            ) : (
              ""
            )}
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
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
            Users Management
          </h1>
          <p className="font-normal text-textThin">Users Management</p>
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
          <button
            className=" bg-sky-500 text-sm flex gap-2 items-center text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => setIsDrawerOpen(true)}
          >
            {" "}
            Add User
          </button>
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

export default Users;
