import React, { useEffect, useMemo, useState } from "react";
import Card from '../../components/Card/Card';
import { FaSearch, FaUser } from 'react-icons/fa'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DataTable from "react-data-table-component";
import UserDefault from "../../assets/user/user-default.png";
import { CgSpinner } from "react-icons/cg";
import { dataUser } from "../../data/dummyData";


const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [search, setSearch] = useState(""); // Initialize search state with an empty string
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = data.filter((item) => {
      // return (

      // );
    });

    setFilteredData(filtered);
  };

  const fetchUserData = async () => {
    setLoading(true);
    setError(false);
    try {
      const userData = dataUser
      // const response = await axios({
      //   method: "get",
      //   url: `${import.meta.env.VITE_APP_API_URL}/api/users`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${user?.token}`,
      //   },
      // });
      setData(userData);
      setFilteredData(userData);
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

  const columns = useMemo(
    () => [
      {
        name: "Email",
        selector: (row) => row.email,
        cell: (row) => <div className="flex items-center gap-2  text-sm font-publicSans"> <img
        src={UserDefault}
        className="rounded-full w-8 h-8"
        alt="Brand Image"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = UserDefault;
        }}
      /><p className='text-center'>{row.email}</p></div>,
        sortable: true,
        width: "250px",
      },
      {
        name: "Username",
        selector: (row) => row.username,
        sortable: true,
      },
      {
        name: "Role",
        selector: (row) =>
          row.role == "1"
            ? "Admin"
            : row.role == "2"
            ? "User"
            : "" || "",
        sortable: true,
      },
      {
        name: "Aksi",
        cell: (row) => (
          <div className="flex items-center space-x-2">
          <button className='px-4 py-2 text-white rounded-md bg-sky-500'>Edit</button>
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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-textBold font-bold text-2xl mb-1">
                Users Management
              </h1>
              <p className="font-normal text-textThin">
                Users Management
              </p>
            </div>

          </div>
          <Card>
            <div className='flex items-center justify-between'>
            <div className="relative ">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <FaSearch className='text-[#bebaba]'/>
            </button>

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white py-2 rounded-md"
            />
          </div>            
          <button
            className=" bg-sky-500 text-sm flex gap-2 items-center text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
            // onClick={() => setShowResult(!showResult)}
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
                    fontFamily: "Public Sans"
                  },
                },
                rows: {
                  style: {
                    paddingTop: '16px', // override the cell padding for data cells
                    paddingBottom: '16px',
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                  }
                }
              }}
            />
          )}
        </div>
          </Card>
        </div>
      );
}

export default Users
