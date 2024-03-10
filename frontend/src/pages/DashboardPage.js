import React, { useEffect, useState } from "react";
import SideNav from "../components/sidenav/SideNav";
import { Helmet } from "react-helmet-async";
import {
	Box,
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
	const [ready, setReady] = useState(true);
	const [value, setValue] = useState();
	const [requestData, setRequestData] = useState({});
	const [inputData, setInputData] = useState({});
	const [startDate, setStartDate] = useState();
	const [loading, setLoading] = useState(false);

	const onChangeHandler = (e) => {
		setInputData((prev) => ({
			...inputData,
			...{ [e.target.name]: e.target.value },
		}));
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		theftData(startDate, inputData.interval);
	};

	// useEffect(() => {
	// 	theftData();
	// }, []);

	let theftData = async (date, interval) => {
		setLoading(true);
		const requestOptions = {
			method: "POST",
			redirect: "follow",
		};

		await fetch(
			`http://${
				process.env.BACKEND
			}:8000/sales?startDate=${date}&interval=${parseInt(interval)}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				setTableData(result.finalData);
				setReady(true);
				setLoading(false);
			})
			.catch((error) => console.error(error));
		setReady(true);
		setLoading(false);
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
								name="outlet"
								required
								onChange={onChangeHandler}
							>
								<MenuItem value={"Cheras Balokong"}>Cheras Balokong</MenuItem>
							</Select>
						</FormControl>
						<DatePicker
							label="Select Date"
							value={startDate}
							required
							onChange={(newValue) => setStartDate(newValue)}
						/>
						<TextField
							id="outlined-number"
							label="Interval (Seconds)"
							type="number"
							sx={{ ml: 2 }}
							name="interval"
							required
							onChange={onChangeHandler}
						/>
						<Button
							variant="contained"
							sx={{ mt: 1, ml: 2 }}
							onClick={(e) => onSubmitHandler(e)}
						>
							Submit
						</Button>
						{/* <QuickFilteringGrid data={tableData} /> */}
					</div>
					{loading ? (
						<Box
							my={8}
							display="flex"
							alignItems="center"
							justifyContent="center"
							gap={4}
							p={2}
						>
							<CircularProgress
								variant="solid"
								color="primary"
							/>
							<Typography variant="p">
								This usually takes about 30 seconds
							</Typography>
						</Box>
					) : ready && tableData ? (
						<Grid
							container
							spacing={2}
							sx={{ mt: 3 }}
						>
							<QuickFilteringGrid data={tableData} />
						</Grid>
					) : null}
				</Container>
			</StyledRoot>
		</>
	);
}

export default DashboardPage;
