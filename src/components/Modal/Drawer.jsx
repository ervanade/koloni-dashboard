import React, { useState } from 'react'
import { FaTimes, FaSearch } from 'react-icons/fa'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

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
  createData('History 1', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-2 py-1 text-sm text-white rounded-md bg-sky-500'>View</button>),
  createData('History 2', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-2 py-1 text-sm text-white rounded-md bg-sky-500'>View</button>),
  createData('History 3', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-2 py-1 text-sm text-white rounded-md bg-sky-500'>View</button>),
  createData('History 4', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-2 py-1 text-sm text-white rounded-md bg-sky-500'>View</button>),
  createData('History 5', '04 November 2024', "-", "Instagram", "10", "Manual Filter", <button className='px-2 py-1 text-sm text-white rounded-md bg-sky-500'>View</button>),
];

const Drawer = ({isDrawerOpen, setIsDrawerOpen}) => {
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
    <>
      <div className={`modal h-[100vh] overflow-y-auto shadow-card fixed bg-white !z-9999 top-0 right-[-999px] w-full max-w-[600px] transition-all ease-in-out duration-500 flex justify-center flex-col text-textBold text-center ${isDrawerOpen ? `!right-0 transition-all ease-in-out duration-500` : ``}`}>
                    <FaTimes className='close-button absolute top-0 right-0 mt-4 mr-4 cursor-pointer' onClick={() => setIsDrawerOpen(false)} />
                    <div className='modal__content flex items-center flex-col justify-center text-left font-bold w-full p-6'>
                      <div className="flex items-center justify-between w-full">
                      <h2 className='text-left'>
                            History Analyser
                        </h2>
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

                    </div>
                </div>
                <div className={`backdrop fixed top-0 left-0 w-full h-full bg-black/30 !z-999 hidden opacity-0 transition-all ease-out duration-200 ${isDrawerOpen ? `transition-all ease-out duration-200 !block !opacity-100` : ``}`} onClick={() => setIsDrawerOpen(false)}></div>
    </>
  )
}

export default Drawer
