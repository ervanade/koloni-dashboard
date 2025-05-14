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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditUser from "../../components/Modal/EditUser";
import { DataFormater } from "../../data/data";
import { loginUser } from "../../store/authSlice";

const Favorites = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const dispatch = useDispatch();


  const [search, setSearch] = useState(""); // Initialize search state with an empty string
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  


  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      setToggleCleared(!toggleCleared);
    };

    const handleReset = () => {
      setToggleCleared(!toggleCleared);
      setSelectedRows([]);
    };

    const handleAskForPrice = () => {
      if (selectedRows.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Pilih Influencer',
          text: 'Silakan pilih setidaknya satu influencer untuk meminta perkiraan harga.',
        });
        return;
      }

      let message = "Halo Admin, Saya dari website Koloni tertarik dan ingin meminta perkiraan harga untuk beberapa influencer berikut:\n\n";
    selectedRows.forEach((row, index) => {
      message += `*${row?.username || 'Tidak Diketahui'}* (Platform: ${row?.platform || 'Tidak Diketahui'})`;
      if (index < selectedRows.length - 1) {
        message += "\n"; // Tambahkan baris baru antar kreator
      }
    });
    message += "\n\nMohon informasinya lebih lanjut. Terima kasih.";

    const whatsappLink = `https://api.whatsapp.com/send?phone=6281288756302&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    };

    return (
      <div className="flex items-center gap-2 !text-sm">
        <button
          key="reset"
          onClick={() => handleReset()}
          className="p-2 bg-red-500 rounded-md text-white text-sm"
          icon
        >
          Reset
        </button>
        <button
          key="ask-price"
          onClick={handleAskForPrice}
          className="p-2 px-4 bg-sky-500 rounded-md text-white text-sm"
          icon
        >
          Ask For Price
        </button>
      </div>
    );
  }, [filteredData, selectedRows, toggleCleared]);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

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
        url: `${import.meta.env.VITE_APP_API_URL}/users/${encodeURIComponent(
          user?._id
        )}/favorites`,
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

  const deleteUser = async (id,username, platform) => {
    await axios({
      method: "delete",
      url: `${import.meta.env.VITE_APP_API_URL}/users/${encodeURIComponent(id)}/favorites/${encodeURIComponent(username)}/${encodeURIComponent(platform)}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then(() => {
        const updatedFavorites = user?.favorites.filter(
          (fav) => fav.username !== username || fav.platform !== platform
        );
        dispatch(loginUser({ ...user, favorites: updatedFavorites }));
        fetchUserData();
        
      })
      .catch((error) => {
        fetchUserData();
        console.log(error);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleConfirmDeleteUser = async (id, username, platform) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You will Delete This User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#24A5E9",
    }).then(async (result) => {
      if (result.value) {
        await deleteUser(id, username, platform);
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
        name: "Creator Username",
        selector: (row) => row.username,
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
            <p className="text-left">{row.username}</p>
          </div>
        ),
        sortable: true,
        width: "250px",
      },
      {
        name: "Followers",
        selector: (row) => DataFormater(row.followers) || 0,
        sortable: true,
      },
      {
        name:<div className="text-wrap text-center">Engagement Rate</div>,
        selector: (row) => row.engagement_rate.toFixed(2) + "%"
        || "0%",
        sortable: true,
      },
      {
        name: "Platform",
        selector: (row) => row?.platform || "Instagram",
        cell: (row) =>  <p className="uppercase">{row?.platform || "Instagram"}</p>,
        sortable: true,
      },

      {
        name: "Action",
        cell: (row) => (
          <div className="flex items-center space-x-2">
            <a
                        target="_blank"
                        href={`https://api.whatsapp.com/send?phone=6281288756302&text=Halo%20Admin%2C%20Saya%20dari%20website%20koloni%20tertarik%20dan%20meminta%20perkiraan%20harga%20influencer%20dengan%20username%20%3A${
                          row?.creator_name || ""
                        }%20di%20platform%20${"Instagram" || ""}`}
                        rel="noopener noreferrer"
                        className="font-publicSans px-4 py-2 text-white bg-sky-500 rounded-md text-center text-sm"
                      >
                        Ask For Price
                      </a>
                      <button
                title="Delete"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleConfirmDeleteUser(user?._id,row?.username, row?.platform || "Instagram" )}
              >
                <FaTrash size={16} />
              </button>
          </div>
        ),
        ignoreRowClick: true,
        // allowOverflow: true,
        minWidth: "200px",
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
            My Favorites KOL
          </h1>
          <p className="font-normal text-textThin">My Favorites KOL</p>
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
            title={selectedRows.length > 0 ? "My Favorites Creators" : ""}
            columns={columns}
              data={filteredData}
              selectableRows
              contextActions={
                contextActions
              } // Tambahkan contextActions jika role 3/4
              onSelectedRowsChange={
              handleRowSelected
              } // Tambahkan handler jika role 3/4
              clearSelectedRows={
              toggleCleared
              } // Clear selection jika role 3/4
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

export default Favorites;
