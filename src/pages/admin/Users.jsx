import React from 'react'
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


const columns = [
  { id: 'name', label: 'Email', minWidth: 100 },
  { id: 'code', label: 'User Name', minWidth: 100 },
  {
    id: 'population',
    label: 'Role',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'discoverResult',
    label: 'Action',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population, discoverResult) {
  // const density = population / size;
  return { name, code, population, discoverResult };
}

const rows = [
  createData(<div className="flex items-center gap-2  text-sm font-publicSans"> <img
            src={UserDefault}
            className="rounded-full w-8 h-8"
            alt="Brand Image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = UserDefault;
            }}
          /><p className=''>example@email.com</p></div>, 'User Name', "Admin", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>Edit</button>),
  createData(<div className="flex items-center gap-2  text-sm font-publicSans"> <img
            src={UserDefault}
            className="rounded-full w-8 h-8"
            alt="Brand Image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = UserDefault;
            }}
          /><p className=''>example@email.com</p></div>, 'User Name', "User", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>Edit</button>),
  createData(<div className="flex items-center gap-2  text-sm font-publicSans"> <img
            src={UserDefault}
            className="rounded-full w-8 h-8"
            alt="Brand Image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = UserDefault;
            }}
          /><p className=''>example@email.com</p></div>, 'User Name', "User", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>Edit</button>),
  createData(<div className="flex items-center gap-2  text-sm font-publicSans"> <img
            src={UserDefault}
            className="rounded-full w-8 h-8"
            alt="Brand Image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = UserDefault;
            }}
          /><p className=''>example@email.com</p></div>, 'User Name', "User", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>Edit</button>),
  createData(<div className="flex items-center gap-2  text-sm font-publicSans"> <img
            src={UserDefault}
            className="rounded-full w-8 h-8"
            alt="Brand Image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = UserDefault;
            }}
          /><p className=''>example@email.com</p></div>, 'User Name', "User", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>Edit</button>),
];

const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            Tambah User
          </button>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} className='mt-6'>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
          >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                   className='!bg-slate-100 !text-textBold'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
          </Card>
        </div>
      );
}

export default Users
