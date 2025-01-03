import React from "react";
import Card from "../Card/Card";
import { FaPaintBrush, FaSearch } from "react-icons/fa";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  FaArtstation,
  FaBusinessTime,
  FaCreativeCommons,
} from "react-icons/fa6";
import DataBola from "../../data/discovery_bola.json";

const columns = [
  { id: "creator", label: "Creator", minWidth: 300 },
  { id: "account_type", label: "Account Type", minWidth: 100, align: "center" },
  {
    id: "followers",
    label: "Followers",
    minWidth: 150,
    align: "center",
  },
  {
    id: "engagement_rate",
    label: "Engagement Rate",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "average_likes",
    label: "Average Likes",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  creator,
  account_type,
  followers,
  engagement_rate,
  average_likes,
  actions
) {
  return {
    creator,
    account_type,
    followers,
    engagement_rate,
    average_likes,
    actions,
  };
}
const rows = DataBola.data.map((creator) => {
  const {
    creator_name,
    ig_url,
    tiktok_url,
    youtube_url,
    followers,
    engagement_rate,
    avg_likes,
    creator_account_type,
  } = creator;

  // Create name with social links
  const socialLinks = (
    <div className="font-publicSans">
      <h2 className="font-publicSans font-medium text-textBold text-lg mb-2">
        {creator_name}
      </h2>
      <div className="flex items-center gap-2">
        
        {ig_url && (
           <a
           href={ig_url}
           target="_blank"
           rel="noopener noreferrer"
         >
          <img
            src="/logo-instagram.png"
            alt="Logo Instagram"
            className="w-5 h-5"
          />
          </a>
        )}
        {tiktok_url && (
           <a
           href={tiktok_url}
           target="_blank"
           rel="noopener noreferrer"
         >
          <img src="/logo-tiktok.png" alt="Logo Tiktok" className="w-5 h-5" />
          </a>
        )}
        {youtube_url && (
           <a
           href={youtube_url}
           target="_blank"
           rel="noopener noreferrer"
         >
          <img src="/logo-youtube.png" alt="Logo Youtube" className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );

  // Define the creator type (Creator or Business)
  const creatorType = (
    <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans">
      {creator_account_type === "CREATOR" ? (
        <FaPaintBrush />
      ) : (
        <FaBusinessTime />
      )}
      <p>{creator_account_type === "CREATOR" ? "Creator" : "Business"}</p>
    </div>
  );

  // Engagement rate, followers and avg likes
  const engagementText = (
    <h2 className="px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans">
      {engagement_rate.toFixed(2)}%
    </h2>
  );

  const followersText = (
    <h2 className="px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans">
      {followers.toLocaleString()}
    </h2>
  );

  const avgLikesText = (
    <h2 className="px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans">
      {avg_likes.toLocaleString()}
    </h2>
  );

  // Action buttons (static for now, modify if needed)
  const actions = (
    <div className="flex gap-2 flex-col text-sm">
      <button className="font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500">
        Ask For Price
      </button>
      <button className="font-publicSans px-4 py-2 text-white rounded-md bg-sky-500">
        Similiar Creator
      </button>
    </div>
  );

  return createData(
    socialLinks,
    creatorType,
    followersText,
    engagementText,
    avgLikesText,
    actions
  );
});

// const rows = [
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>Bagus Al Azis (menteri_bola)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-tiktok.png" alt="Logo Tiktok" className='w-5 h-5' /><img src="/logo-youtube.png" alt="Logo Youtube" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans"><FaPaintBrush className=''/><p className=''>Creator</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>40.709</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>1,13%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>45.981</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>Muhamad Alief (aliffutsal)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-tiktok.png" alt="Logo Tiktok" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans"><FaPaintBrush className=''/><p className=''>Creator</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>144.634</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>0,7%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>101.027</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>DUBBING - LAGU (dubbbing.id)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-youtube.png" alt="Logo Youtube" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans"><FaPaintBrush className=''/><p className=''>Creator</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>56.938</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>0,14%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>8.054</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>PERSIB BANDUNG (casual.persib)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-tiktok.png" alt="Logo Tiktok" className='w-5 h-5' /><img src="/logo-youtube.png" alt="Logo Youtube" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-sky-500 text-sm font-medium font-publicSans"><FaBusinessTime className=''/><p className=''>Business</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>40.709</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>1,13%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>45.981</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>Bagus Al Azis (menteri_bola)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-tiktok.png" alt="Logo Tiktok" className='w-5 h-5' /><img src="/logo-youtube.png" alt="Logo Youtube" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans"><FaPaintBrush className=''/><p className=''>Creator</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>40.709</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>1,13%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>45.981</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>Muhamad Alief (aliffutsal)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-tiktok.png" alt="Logo Tiktok" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans"><FaPaintBrush className=''/><p className=''>Creator</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>144.634</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>0,7%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>101.027</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>DUBBING - LAGU (dubbbing.id)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-youtube.png" alt="Logo Youtube" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans"><FaPaintBrush className=''/><p className=''>Creator</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>56.938</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>0,14%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>8.054</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>PERSIB BANDUNG (casual.persib)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-tiktok.png" alt="Logo Tiktok" className='w-5 h-5' /><img src="/logo-youtube.png" alt="Logo Youtube" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-sky-500 text-sm font-medium font-publicSans"><FaBusinessTime className=''/><p className=''>Business</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>40.709</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>1,13%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>45.981</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>Bagus Al Azis (menteri_bola)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-tiktok.png" alt="Logo Tiktok" className='w-5 h-5' /><img src="/logo-youtube.png" alt="Logo Youtube" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans"><FaPaintBrush className=''/><p className=''>Creator</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>40.709</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>1,13%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>45.981</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),
//   createData(<div className='font-publicSans'><h2 className='font-publicSans font-medium text-textBold text-lg mb-2'>Muhamad Alief (aliffutsal)</h2><div className="flex items-center gap-2"><img src="/logo-instagram.png" alt="Logo Instagram" className='w-5 h-5' /><img src="/logo-tiktok.png" alt="Logo Tiktok" className='w-5 h-5' /></div></div>, <div className="flex items-center gap-2 text-green-500 text-sm font-medium font-publicSans"><FaPaintBrush className=''/><p className=''>Creator</p></div>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>144.634</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>0,7%</h2>, <h2 className='px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans'>101.027</h2>,<div className="flex gap-2 flex-col text-sm"> <button className='font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500'>Ask For Price</button><button className='font-publicSans px-4 py-2 text-white rounded-md bg-sky-500'>Similiar Creator</button></div>),

// ];

const ResultDiscovery = ({ title, data }) => {
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
    <Card className="mt-6 !font-publicSans">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg text-textBold">Result Discovery</h1>
        <p>{data ? "68 " : ""}Creator Found</p>
      </div>

      {data ? (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden" }} className="mt-6">
            <TableContainer sx={{ maxHeight: 800 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        className="!bg-sky-500 !text-white"
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
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
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
        </>
      ) : (
        <div className="py-6 flex items-center justify-center flex-col gap-2">
          <img src="/NotFound.png" alt="" className="w-1/2 sm:w-1/3" />
          <h1 className="font-medium text-textBold text-center">
            No results found{" "}
          </h1>
          <p className="font-normat text-textThin text-center text-sm">
            Looks like there's no data here. Try using our filters above to
            discover the information you need.{" "}
          </p>
        </div>
      )}
    </Card>
  );
};

export default ResultDiscovery;
