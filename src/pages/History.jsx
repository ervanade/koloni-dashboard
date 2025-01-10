import React from 'react'

import { FaSearch } from 'react-icons/fa'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DataTable from "react-data-table-component";
import Card from '../components/Card/Card';

const columns = [
    { id: 'name', label: 'Discover Name', minWidth: 100 },
    { id: 'code', label: 'Last Update', minWidth: 100 },
    {
      id: 'population',
      label: 'Based On',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Socials',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'totalCreator',
      label: 'Total Creator',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'discoverType',
      label: 'Discover Type',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'discoverResult',
      label: 'Discover Result',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];
  
  function createData(name, code, population, size, totalCreator, discoverType, discoverResult) {
    const density = population / size;
    return { name, code, population, size, density, totalCreator, discoverType, discoverResult };
  }
  
  const rows = [
    createData('History 1', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>View</button>),
    createData('History 2', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>View</button>),
    createData('History 3', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>View</button>),
    createData('History 4', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>View</button>),
    createData('History 5', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-4 py-2 text-white rounded-md bg-sky-500'>View</button>),
  ];

const History = () => {
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
                History
              </h1>
              <p className="font-normal text-textThin">
                History
              </p>
            </div>

          </div>
          <Card>
          <div className="flex items-center justify-between">
        <div className='flex-[2_2_0%]'>

       <h1 className="font-medium text-lg text-textBold">History</h1>
       <p className='font-normal text-sm text-textThin'>Showing latest 1 History
       </p>
        </div>
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
       </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} className='mt-6'>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
          >
            <TableRow >
              {columns.map((column, index) => (
                <TableCell
                  key={index}
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
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
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

export default History
