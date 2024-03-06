import React, { useEffect, useState } from "react";
import SideNav from "../components/sidenav/SideNav";
import { Helmet } from "react-helmet-async";
import {
	Button,
	CircularProgress,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	NativeSelect,
	Paper,
	Select,
	Stack,
	TextField,
	Typography,
	styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import QuickFilteringGrid from "../components/quickFilteringGrid/QuickFilteringGrid";

const color = red[100];

const StyledRoot = styled("div")({
	display: "flex",
	minHeight: "100%",
	overflow: "hidden",
});

function DashboardPage() {
	const [tableData, setTableData] = useState();
	const [ready, setReady] = useState(false);
	const [value, setValue] = useState();
	const [requestData, setRequestData] = useState({});

	useEffect(() => {
		theftData();
	}, []);

	let theftData = async () => {
		const requestOptions = {
			method: "POST",
			redirect: "follow",
		};

		await fetch(
			"http://localhost:8000/sales?startDate=2024-02-14T12:00:00.000Z&endDate=2024-02-14T14:00:00.000Z",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				setTableData(result.finalData);
				setReady(true);
			})
			.catch((error) => console.error(error));
		setReady(true);
	};

	console.log(tableData);
	return (
		<>
			<Helmet>
				<title> Dashboard | Monitoring Dashboard </title>
			</Helmet>
			<StyledRoot>
				<SideNav />
				<Container
					maxWidth="xl"
					sx={{ mt: 10 }}
				>
					<Typography variant="h5">Hi, Welcome back</Typography>
					<div
						style={{
							justifySelf: "center",
							alignItems: "center",
							marginTop: "10px",
						}}
					>
						{/* <InputLabel>Select</InputLabel>
						<Select
							label="Select Outlet"
							name="Outlet"
							placeholder="Select Outlet"
							value="Outlet"
							sx={{ minWidth: 120 }}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select> */}
						<FormControl sx={{ width: "180px", mr: 2 }}>
							<InputLabel id="demo-simple-select-label">
								Select Outlet
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								// value={age}
								label="Select Outlet"
								// onChange={handleChange}
							>
								<MenuItem value={"Cheras Balokong"}>Cheras Balokong</MenuItem>
							</Select>
						</FormControl>
						<DatePicker
							label="Select Date"
							value={value}
							onChange={(newValue) => setValue(newValue)}
						/>
						<TextField
							id="outlined-number"
							label="Interval (Seconds)"
							type="number"
							sx={{ ml: 2 }}
						/>
						<Button
							variant="contained"
							sx={{ mt: 1, ml: 2 }}
							// onClick={theftData}
						>
							Submit
						</Button>
						{/* <QuickFilteringGrid data={tableData} /> */}
					</div>
					{ready ? (
						<Grid
							container
							spacing={2}
							sx={{ mt: 3 }}
						>
							<QuickFilteringGrid data={tableData} />
						</Grid>
					) : (
						<CircularProgress
							variant="solid"
							sx={{
								display: "flex",
								justifyContent: "center",
								alignSelf: "center",
								alignItems: "center",
							}}
							color="primary"
						/>
					)}
				</Container>
			</StyledRoot>
		</>
	);
}

export default DashboardPage;
