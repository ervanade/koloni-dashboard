import React, { useEffect } from "react";
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
  FaSpinner,
} from "react-icons/fa6";
import DataBola from "../../data/discovery_bola.json";
import { useNavigate } from "react-router-dom";

const ResultDiscovery = ({
  title,
  data,
  dataResult,
  page,
  setPage,
  handleSearch,
  handleSearchPagination,
  loading,
  setActiveTab
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate(); // React Router Hook
  const columnsDiscovery = [
    { id: "creator", label: "Creator", minWidth: 300 },
    {
      id: "account_type",
      label: "Account Type",
      minWidth: 100,
      align: "center",
    },
    { id: "followers", label: "Followers", minWidth: 150, align: "center" },
    {
      id: "engagement_rate",
      label: "Engagement Rate",
      minWidth: 100,
      align: "center",
    },
    {
      id: "average_likes",
      label: "Average Likes",
      minWidth: 150,
      align: "center",
    },
    { id: "actions", label: "Actions", minWidth: 150, align: "center" },
  ];

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
        <p>
          {dataResult?.total_results ? dataResult?.total_results : "0"} Creator
          Found
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center mt-6">
          <FaSpinner className="animate-spin text-sky-500" size="30px" />
        </div>
      ) : dataResult?.data?.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto bg-white border-separate border-spacing-0 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-sky-500 text-white">
              <tr>
                {columnsDiscovery?.map((column) => (
                  <th
                    key={column.id}
                    className={`px-6 py-4 text-left text-sm font-semibold ${
                      column.align === "center" ? "text-center" : ""
                    }`}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataResult?.data?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-100 border-b last:border-b-0 even:bg-slate-100"
                >
                  <td className={`px-6 py-4 text-sm `}>
                    {" "}
                    <div className="font-publicSans">
                      <h2 className="font-publicSans font-medium text-textBold text-lg mb-2">
                        {row?.creator_name}
                      </h2>
                      <div className="flex items-center gap-2">
                        {row?.ig_url && (
                          <a
                            href={row?.ig_url}
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
                        {row?.tiktok_url && (
                          <a
                            href={row?.tiktok_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/logo-tiktok.png"
                              alt="Logo Tiktok"
                              className="w-5 h-5"
                            />
                          </a>
                        )}
                        {row?.youtube_url && (
                          <a
                            href={row?.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/logo-youtube.png"
                              alt="Logo Youtube"
                              className="w-5 h-5"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-sm text-center`}>
                    {
                      <div className="flex items-center gap-2 text-blue-500 text-sm font-medium font-publicSans">
                        {row?.creator_account_type === "CREATOR" ? (
                          <FaPaintBrush />
                        ) : (
                          <FaBusinessTime />
                        )}
                        <p className="font-bold">{row?.creator_account_type}</p>
                      </div>
                    }
                  </td>
                  <td className={`px-6 py-4 text-sm text-center`}>
                    {" "}
                    <h2 className="px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans">
                      {row?.followers?.toLocaleString()}
                    </h2>
                  </td>
                  <td className={`px-6 py-4 text-sm text-center`}>
                    {" "}
                    <h2 className="px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans">
                      {row?.engagement_rate?.toLocaleString()}
                    </h2>
                  </td>
                  <td className={`px-6 py-4 text-sm text-center`}>
                    {" "}
                    <h2 className="px-4 py-2 text-sky-500 font-bold text-lg rounded-md font-publicSans">
                      {row?.avg_likes?.toLocaleString()}
                    </h2>
                  </td>
                  <td className={`px-6 py-4 text-sm text-center`}>
                    <div className="flex gap-2 flex-col text-sm">
                      <a
                        target="_blank"
                        href={`https://api.whatsapp.com/send?phone=6281288756302&text=Halo%20Admin%2C%20Saya%20dari%20website%20koloni%20tertarik%20dan%20meminta%20perkiraan%20harga%20influencer%20dengan%20username%20%3A${
                          row?.creator_name || ""
                        }%20di%20platform%20${"Instagram" || ""}`}
                        rel="noopener noreferrer"
                        className="font-publicSans px-4 py-2 text-sky-500 rounded-md border border-sky-500"
                      >
                        Ask For Price
                      </a>
                      <button
  className="font-publicSans px-4 py-2 text-white rounded-md bg-sky-500"
  onClick={(e) => {
    e.preventDefault();
    // setActiveTab("similiar"); // Ubah active tab
    const match = row?.creator_name.match(/\(([^)]+)\)/);
    const username = match ? match[1] : row?.creator_name;
    window.open(`/discovery?similiar=${username}`, "_blank"); // Buka di tab baru
  }}
>
  Similiar Creator
</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      <div className="flex items-center justify-between">
        <p>
          Total Page : {page} / {dataResult?.total_page || 0}
        </p>
        {dataResult?.has_next_page && (
          <button
            className="font-publicSans px-4 py-2 text-white rounded-md bg-sky-500 mt-6 "
            onClick={handleSearchPagination} // Gunakan fungsi handleNextPage
          >
            Next Page
          </button>
        )}
      </div>
    </Card>
  );
};

export default ResultDiscovery;
