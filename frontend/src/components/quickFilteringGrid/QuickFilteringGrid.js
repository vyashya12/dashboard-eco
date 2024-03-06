import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const columns = [
	//under this is bco
	{ field: "Outlet", headerName: "Outlet" }, //outlet
	{ field: "CashierTimestamp", headerName: "Cashier Timestamp" }, //dateTime
	{ field: "Cashier", headerName: "Cashier" }, //cashier
	{ field: "SalesID", headerName: "Sales ID" }, //id
	//we need to know cashier counter from xilnex
	//timing is 12pm to 2pm then i still get 6pm data
	//eye button on a column, opens a new tab(done)
	//first input is datetime start and end(done)
	//get outlets and display in a select (dummy for now)
	// interval (seconds) number input field
	//no people or suspected then show "No Face Detected" in Face Image field

	//under this is aishop
	{ field: "StoreName", headerName: "Store Name" }, //store_name
	{ field: "Camera", headerName: "Camera" }, //device_name
	{
		field: "CameraTimestamp",
		headerName: "Camera Timestamp",
	}, //timestamp
	{
		field: "TheftProtection",
		headerName: "Theft Protection",
		// width: "100px",
		renderCell: (params) => {
			if (params.value == "Matched") {
				return (
					<div style={{ color: "green" }}>
						<p>{params.value}</p>
					</div>
				);
			} else {
				return (
					<div style={{ color: "yellow" }}>
						<p>{params.value}</p>
					</div>
				);
			}
		},
	}, //status -> Matched = green bg or Suspect = yellow bg
	{
		field: "FaceImage",
		headerName: "Face Image",
		renderCell: (params) => {
			return (
				<a
					href={params.value}
					target="_blank"
				>
					<RemoveRedEyeIcon />
				</a>
			);
		},
	}, //face_image
	{
		field: "FrameImage",
		headerName: "Frame Image",
		renderCell: (params) => {
			return (
				<a
					href={params.value}
					target="_blank"
				>
					<RemoveRedEyeIcon />
				</a>
			);
		},
	}, //facesFrame from getFacesFrame

	//eye button for frame image done
	//eye button for face image done
	//close sidebar on click done
	//select box for the store
	//match = green, suspect = yellow (done hopefully) (seems like logic not working)
	//between store name and camera add siteid
	//allow only startdate
	//add loader if progress bar is difficult, this usually takes 30 seconds
	//livedata and hosting
];

const rowDataTable = [
	{
		id: 926103028,
		Outlet: "BCO - CHERAS BALAKONG",
		CashierTimestamp: "2024-02-14T13:55:26.000Z",
		Cashier: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
		SalesID: 926103028,
		StoreName: "Ecoshop Cheras Balakong",
		Camera: "Cam 1 - Counter Left",
		CameraTimestamp: "2024-02-14T13:55:26.000Z",
		TheftProtection: "Matched",
		FaceImage:
			"https://aishop-linksprite.s3.us-west-1.amazonaws.com/chips/874b6af3a6fbee4130b612abf7dfebbe.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAR4QODGFMTKGDBMW5%2F20240226%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240226T122234Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=905a929536ac899f579418679e0c1197b178019080dc732591b88c9079d8e434",
		FrameImage:
			"https://aishop-linksprite.s3.us-west-1.amazonaws.com/frames/d19ff7fb2d0e02f15fa32b2ea62cf9f3.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAR4QODGFMTKGDBMW5%2F20240227%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240227T132255Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=ca063c23e04ffc4ae6fb905846e42ba639587f46e86d2db8d4124c204a55bd31",
	},
	{
		id: 926103029,
		Outlet: "BCO - CHERAS BALAKONG",
		CashierTimestamp: "2024-02-14T13:55:54.000Z",
		Cashier: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
		SalesID: 926103029,
		StoreName: "Ecoshop Cheras Balakong",
		Camera: "Cam 1 - Counter Left",
		CameraTimestamp: "2024-02-14T13:55:54.000Z",
		TheftProtection: "Matched",
		FaceImage:
			"https://aishop-linksprite.s3.us-west-1.amazonaws.com/chips/c4266e6e99b9f04ed3604c230da43f2e.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAR4QODGFMTKGDBMW5%2F20240226%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240226T122234Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=6c85f099074a1727dc5cb24828a100015695096cbb06ad5858cddd0bab2a9cd5",
		FrameImage:
			"https://aishop-linksprite.s3.us-west-1.amazonaws.com/frames/6f18a988282d03c4b9eb2988bfe42e2c.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAR4QODGFMTKGDBMW5%2F20240227%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240227T132256Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=320a931955de0706027f9bd53e516976a6fdb791d34291c4f1664f535e1ee427",
	},
];

export default function QuickFilteringGrid({ data }) {
	const [tableData, setTableData] = useState(data);
	return (
		<>
			{rowDataTable.length ? (
				<Box>
					<DataGrid
						rows={rowDataTable}
						columns={columns}
						sx={{ width: "auto" }}
						slots={{ toolbar: GridToolbar }}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 20,
								},
							},
						}}
						pageSizeOptions={[5]}
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
