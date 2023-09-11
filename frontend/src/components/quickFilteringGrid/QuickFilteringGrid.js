import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Config } from "../../config";

const columns = [
  { field: "IP", headerName: "IP" },
  { field: "ServerName", headerName: "ServerName" },
  { field: "Drive", headerName: "Drive" },
  { field: "Size", headerName: "Size" },
  { field: "SizeFree", headerName: "SizeFree" },
  { field: "SizeUsed", headerName: "SizeUsed" },
  { field: "PercentFree", headerName: "PercentFree" },
  { field: "TotalMemory", headerName: "TotalMemory" },
  { field: "FreeMemory", headerName: "FreeMemory" },
  { field: "UsedMemory", headerName: "UsedMemory" },
  { field: "OnlineVPS", headerName: "OnlineVPS" },
  { field: "OfflineVPS", headerName: "OfflineVPS" },
  { field: "LastUpdate", headerName: "LastUpdate" },
  { field: "ServerUptime", headerName: "ServerUptime" },
];

export default function QuickFilteringGrid() {
  const [serverData, setServerData] = useState([]);

  let token = {};
  if (localStorage.hasOwnProperty("token")) {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    // fetch(`${process.env.REACT_APP_URL}api/servers/`, {
    fetch(`${process.env.REACT_APP_URL}api/servers/`, {
      headers: { "x-access-token": token },
    })
      .then((data) => data.json())
      .then((data) => setServerData(data));
  });

  return (
    <>
      {serverData.length ? (
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            rows={serverData}
            columns={columns}
            sx={{ overflowX: "scroll", width: "1000px", maxWidth: "1500px" }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
      ) : null}
    </>
  );
}
