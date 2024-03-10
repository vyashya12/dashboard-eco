const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const MD5 = require("crypto-js/md5");

var corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.set("trust proxy", "127.0.0.1");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Hello Wysetime!!!" });
});

app.post("/sales", async (req, res) => {
	let bcoSale = {};
	let visitingRecord = {};
	let token;
	function convertISOToCustom(isoDateString) {
		const date = new Date(isoDateString);
		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, "0");
		const day = String(date.getUTCDate()).padStart(2, "0");
		const hours = String(date.getUTCHours()).padStart(2, "0");
		const minutes = String(date.getUTCMinutes()).padStart(2, "0");
		const seconds = String(date.getUTCSeconds()).padStart(2, "0");
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}

	function convertTOISO(string) {
		const date = new Date(string);

		const isoDateString = date.toISOString();

		return isoDateString;
	}

	function addHoursAndMinutes(isoDateString, hoursToAdd, minutesToAdd) {
		const date = new Date(isoDateString);
		date.setUTCHours(date.getUTCHours() + hoursToAdd);
		date.setUTCMinutes(date.getUTCMinutes() + minutesToAdd);
		return date.toISOString();
	}

	let isoStartDate = convertTOISO(req.query.startDate);
	let isoEndDate = addHoursAndMinutes(req.query.startDate, 23, 59);

	let customDateStart = convertISOToCustom(isoStartDate);
	let customDateEnd = convertISOToCustom(isoEndDate);

	console.log(customDateStart);
	console.log(customDateEnd);
	console.log(isoStartDate);
	console.log(isoEndDate);

	// let customEndDate = convertISOToCustom(req.query.endDate);

	const loginHeaders = new Headers();
	loginHeaders.append("Content-Type", "application/json; charset=UTF-8");
	loginHeaders.append("Accept", "application/json; charset=UTF-8");
	loginHeaders.append("Cookie", "PHPSESSID=5f8b92jqcvndikq8soudjs1o6o");

	const raw =
		'{\r\n    "username": "ecoshop@wysetime.com",\r\n    "password": "1395c9c8b0cf559f46671094476f1397",\r\n    "client_type": 1\r\n}';

	const loginRequestOptions = {
		method: "POST",
		headers: loginHeaders,
		body: raw,
		redirect: "follow",
	};

	await fetch(
		"https://deepcloud.linksprite.com/phpapi/common/home/login",
		loginRequestOptions
	)
		.then((response) => response.json())
		.then((result) => (token = result.data.token))
		.catch((error) => console.error(error));

	//Sales data under here
	const myHeaders2 = new Headers();
	myHeaders2.append("appid", "RWLFGF1zrPXW7MBeUCBJj9t7P8PjTf1X");
	myHeaders2.append("token", "v5_FB5in4b6XH8WGM63nZ86UvQQ1sRbqhsV3gV2k6LCvyU=");
	myHeaders2.append("auth", "5");

	const requestOptions2 = {
		method: "GET",
		headers: myHeaders2,
		redirect: "follow",
	};

	await fetch(
		`https://api.xilnex.com/logic/v2/sales/search?locationid=5def3e9a61164c408c824e9cece5ac0c&datefrom=${isoStartDate}&dateto=${isoEndDate}`,
		requestOptions2
	)
		.then((response) => response.json())
		.then((result) => (bcoSale = result.data.sales))
		.catch((error) => console.error(error));
	bcoSale.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

	const filtered2 = (unfiltered) => {
		const filteredData = unfiltered.filter(
			(record) => record.siteId === "92560"
		);
		return filteredData;
	};

	const filteredSales = filtered2(bcoSale);

	//Cam below here
	let tobesigned = MD5(
		`end_time=${customDateEnd}&start_time=${customDateStart}&store_id=356&key=${token}`
	)
		.toString()
		.toUpperCase();

	const myHeaders = new Headers();
	myHeaders.append("token", token);
	myHeaders.append("sign", tobesigned);

	const formdata = new FormData();
	formdata.append("end_time", customDateEnd);
	formdata.append("start_time", customDateStart);
	formdata.append("store_id", 356);

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formdata,
		redirect: "follow",
	};

	await fetch(
		"https://deepcloud.linksprite.com/phpapi/v2/aiapp/subject/get_visiting_record",
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => (visitingRecord = result.data))
		.catch((error) => console.error(error));

	const filtered = (unfiltered) => {
		const filteredData = unfiltered.filter(
			(record) => record.device_name === "Cam 1 - Counter Left"
		);
		return filteredData;
	};
	if (visitingRecord.length && token.length > 3) {
		visitingRecord.forEach((item) => {
			const stamp = new Date(item.timestamp.replace(" ", "T")).toISOString();
			const date = new Date(stamp);
			date.setHours(date.getHours() + 8);
			item.timestamp = date;
		});
	}

	visitingRecord.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

	const camOneData = filtered(visitingRecord);

	// function compareDatetime(date1, date2) {
	// 	// Parse datetime strings into Date objects
	// 	const d1 = new Date(date1);
	// 	const d2 = new Date(date2);

	// 	// Calculate the difference in milliseconds between the two datetime objects
	// 	const diffMilliseconds = Math.abs(d1 - d2);

	// 	// Convert milliseconds difference to seconds
	// 	const diffSeconds = diffMilliseconds / 1000;

	// 	// Check if the absolute difference is less than or equal to 20 seconds
	// 	if (diffSeconds <= 20 || diffSeconds >= 20 || diffSeconds === 0) {
	// 		return "Matched";
	// 	} else {
	// 		return "Suspect";
	// 	}
	// }

	function findMatch(salesObj, camData, timeDifference) {
		// Convert salesData timestamp to a Date object
		const salesDate = new Date(salesObj.dateTime);

		// Find if any camData object matches the salesData object
		const camMatch = camData.find((camObj) => {
			// Convert camData timestamp to a Date object
			const camDate = new Date(camObj.timeStamp);
			// Check if the difference is within the specified time difference
			const diffInMilliseconds = Math.abs(
				salesDate.getTime() - camDate.getTime()
			);
			return diffInMilliseconds <= timeDifference * 1000; // Convert seconds to milliseconds
		});

		// If a match is found, return 'Matched'
		if (camMatch) {
			return "Matched";
		}

		// If no match is found, return 'Suspect'
		return "Suspect";
	}

	let getFacesFrame = async (data) => {
		let faceSign = `visitor_id=${data}&key=${token}`;
		let faceSigned = MD5(faceSign).toString().toUpperCase();
		const faceHeader = new Headers();
		faceHeader.append("token", token);
		faceHeader.append("sign", faceSigned);

		const formdata = new FormData();
		formdata.append("visitor_id", data);

		const requestOptions = {
			method: "POST",
			headers: faceHeader,
			body: formdata,
			redirect: "follow",
		};

		let visitor_frame = "";

		await fetch(
			"https://deepcloud.linksprite.com/phpapi/system/subject/getFacesFrame",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => (visitor_frame = result.data.facesFrame.toString()))
			.catch((error) => console.error(error));

		return visitor_frame;
	};

	console.log(req.query.interval);

	//i am finding for it exact, i am not finding the closest
	//matched or suspect
	//i need to find closest time with sales data and push that object to finaldata, i cannot use current looping method

	// res.json(camOneData);

	let finalData = [];
	let reallyfinal = [];

	const promises = camOneData.map(async (element, index) => {
		// let faces_frame = await getFacesFrame(
		// 	camOneData[index]?.visitor_id.toString()
		// );

		const camDate = new Date(element.timestamp);

		let closestSalesObj;
		let closestDiff = Infinity;
		// let arrayofsales = []

		await filteredSales.map((salesObj) => {
			// Convert camData timestamp to a Date object
			const salesDate = new Date(salesObj.dateTime);
			// Calculate the difference between timestamps
			const diff = Math.abs(camDate.getTime() - salesDate.getTime());
			// Update closestCamObj if a closer timestamp is found
			if (diff < closestDiff) {
				closestDiff = diff;
				closestSalesObj = salesObj;
				closestSalesObj.diff = closestDiff;
			}
		});
		// console.log(index, closestDiff);
		if (closestDiff <= req.query.interval * 1000) {
			finalData.push({
				id: closestSalesObj.id,
				Outlet: closestSalesObj.outlet,
				CashierTimestamp: closestSalesObj.dateTime,
				Cashier: closestSalesObj.cashier,
				SalesID: closestSalesObj.id,
				StoreName: element.store_name,
				Camera: element.device_name,
				CameraTimestamp: element.timestamp,
				SiteID: closestSalesObj.siteId,
				TheftProtection: "Matched",
				FaceImage: element.faces_image,
				FrameImage: await getFacesFrame(element.visitor_id),
			});
		} else {
			finalData.push({
				id: closestSalesObj.id,
				Outlet: closestSalesObj.outlet,
				CashierTimestamp: closestSalesObj.dateTime,
				Cashier: closestSalesObj.cashier,
				SalesID: closestSalesObj.id,
				StoreName: element.store_name,
				Camera: element.device_name,
				CameraTimestamp: element.timestamp,
				SiteID: closestSalesObj.siteId,
				TheftProtection: "Suspect",
				FaceImage: element.faces_image,
				FrameImage: await getFacesFrame(element.visitor_id),
			});
		}
	});

	await Promise.all(promises);

	res.json({
		finalData,
	});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
