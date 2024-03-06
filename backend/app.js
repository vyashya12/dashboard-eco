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
	const dummyData = {
		ok: true,
		status: "SuccessQuery",
		warning: null,
		error: null,
		data: {
			lastTimestamp: null,
			sale: null,
			sales: [
				{
					items: [
						{
							id: 926103028,
							salesDate: "2024-02-14T00:00:00.000Z",
							itemId: 200067089,
							itemCode: "63018006",
							alternateLookup: "",
							itemName: "BOTTLE PET500VTR 500ML 5PCS D6.5xH20.9CM 21G",
							itemType: "ECO",
							model: "ECO",
							description: " ",
							brand: "MP",
							unitPrice: 2.4,
							quantity: 1.0,
							profit: 0.7555,
							cost: 1.6445,
							advanceDiscount: null,
							discountPercentage: 0.0,
							instoreOutlet: "default",
							priceSchemes: {
								manufacturerPrice: 2.4,
								salePrice: 2.4,
								employeePrice: 2.6,
								wholesalePrice: 0.0,
								customPrice: 0.0,
								webPrice: 0.0,
								webDealerPrice: 0.0,
								cost: 1.6445,
							},
							uniqueId: "",
							matrixId: "",
							matrixBarcode: "",
							matrixX: "",
							matrixY: "",
							salesPerson: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
							subtotal: 2.4,
							taxCode: "",
							gstPercentage: 0.0,
							gstAmount: 0.0,
							gstInclusive: false,
							enterPrice: 2.4,
							scanCode: "",
							remark: null,
							deliveryQuantity: 1.0,
							discountAmount: 0.0,
							category: "PACK",
							pcid: "",
							salesType: "",
							promoGroup: "",
							businessDateTime: "2024-02-14T00:00:00.000Z",
							voucherNumber: "",
							customValueOne: "",
							customValueTwo: "NON FOOD",
							customValueThree: "CHAIRS - KITCHENWARE - PLASTICWARE",
							customValueFour: "CHAIRS",
							customValueFive: "",
							customValueSix: "",
							customValueSeven: "",
							customValueEight: "AllItem2",
							customValueNine: "AllItem",
							customValueTen: "",
							customValueEleven: "",
							customValueTwelve: "",
							customValueThirteen: "",
							customValueFourteen: "",
							customValueFifteen: "Eco Shop",
							discountRemark: "",
							totalTaxAmount: 0.0,
							isServiceCharge: false,
							isPrint: true,
							itemIndex: "0",
							foc: false,
							serviceChargePercentage: 0.0,
							stockType: "Normal",
							orderSource: null,
							deliveryType: null,
							totalBillLevelDiscountAmount: 0.0,
							subItems: null,
						},
					],
					collection: [],
					id: 926103028,
					dateTime: "2024-02-14T13:55:26.000Z",
					recipientName: "CASH",
					clientId: "",
					clientName: "CASH",
					paid: 2.4,
					balance: 0.0,
					term: "0",
					cashier: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
					billingAddress: {
						street: "",
						city: "",
						state: "",
						zipcode: "",
						country: "",
					},
					shippingAddress: {
						street: null,
						city: null,
						state: null,
						zipcode: null,
						country: null,
					},
					shippingRemark: null,
					shipmentDateTime: null,
					salesPerson: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
					shippingStatus: "NA",
					status: "Completed",
					paymentStatus: "PAID",
					outlet: "BCO - CHERAS BALAKONG",
					confirmOutlet: null,
					remark: null,
					salesType: "Retail",
					discountPercentage: 0.0,
					billDiscountAmount: 0.0,
					taxPercentage: 0.0,
					cost: 1.6445,
					profit: 0.7555,
					rounding: 0.0,
					recipientContact: null,
					netAmount: 2.4,
					grandTotal: 2.4,
					gstTaxAmount: 0.0,
					exchangeRate: 0.0,
					foreignTotalAmount: 0.0,
					currencyCode: null,
					siteId: "92610",
					reference: "",
					shipmentProvider: null,
					businessDateTime: "2024-02-14T00:00:00.000Z",
					customFieldValueOne: "",
					customFieldValueTwo: "",
					customFieldValueThree: "",
					customFieldValueFour: "",
					customFieldValueFive: "",
					orderNo: null,
					paxNumber: null,
					orderSource: null,
					deliveryType: null,
					pickupTime: null,
					orderStatus: null,
					outletId: "5def3e9a61164c408c824e9cece5ac0c",
					salesOrderNo: "",
					trackingLink: null,
					trackingNumber: null,
					client: {
						id: null,
						name: "CASH",
						email: null,
						contactNo: null,
						alternateContactNo: null,
						clientCode: null,
						recipientContact: null,
						recipientName: "CASH",
						billingAddress: {
							street: "",
							city: "",
							state: "",
							zipcode: "",
							country: "",
						},
						shippingAddress: {
							street: null,
							city: null,
							state: null,
							zipcode: null,
							country: null,
						},
						billingRemark: null,
						shippingRemark: null,
						shippingDateTime: null,
						IsoShippingDateTime: null,
						type: null,
						paymentTerms: 0,
						individualDiscount: 0.0,
					},
					paymentFlowType: null,
					customerAlternateLookup: null,
					customerEmail: null,
					totalBillDiscountAmount: 0.0,
					cancelBy: null,
					cancelRemark: null,
					cancelOutlet: null,
					cancelOutletId: null,
					cancelDateTime: null,
					totalQuantity: 1.0,
				},
				{
					items: [
						{
							id: 926103029,
							salesDate: "2024-02-14T00:00:00.000Z",
							itemId: 200033567,
							itemCode: "65055037",
							alternateLookup: "",
							itemName: "SAUCE BOTTLE G-321/2 150ML 2PCS 6x12CM",
							itemType: "ZZZZZZ",
							model: "ZZZZZZ",
							description: " ",
							brand: "L",
							unitPrice: 2.4,
							quantity: 1.0,
							profit: 1.498,
							cost: 3.302,
							advanceDiscount: null,
							discountPercentage: 0.0,
							instoreOutlet: "default",
							priceSchemes: {
								manufacturerPrice: 2.4,
								salePrice: 2.4,
								employeePrice: 2.6,
								wholesalePrice: 0.0,
								customPrice: 0.0,
								webPrice: 0.0,
								webDealerPrice: 0.0,
								cost: 3.302,
							},
							uniqueId: "",
							matrixId: "",
							matrixBarcode: "",
							matrixX: "",
							matrixY: "",
							salesPerson: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
							subtotal: 2.4,
							taxCode: "",
							gstPercentage: 0.0,
							gstAmount: 0.0,
							gstInclusive: false,
							enterPrice: 2.4,
							scanCode: "",
							remark: null,
							deliveryQuantity: 1.0,
							discountAmount: 0.0,
							category: "NPACK",
							pcid: "",
							salesType: "",
							promoGroup: "",
							businessDateTime: "2024-02-14T00:00:00.000Z",
							voucherNumber: "",
							customValueOne: "",
							customValueTwo: "NON FOOD",
							customValueThree: "CHAIRS - KITCHENWARE - PLASTICWARE",
							customValueFour: "CHAIRS",
							customValueFive: "",
							customValueSix: "",
							customValueSeven: "",
							customValueEight: "AllItem2",
							customValueNine: "AllItem",
							customValueTen: "",
							customValueEleven: "",
							customValueTwelve: "",
							customValueThirteen: "",
							customValueFourteen: "",
							customValueFifteen: "Eco Shop",
							discountRemark: "",
							totalTaxAmount: 0.0,
							isServiceCharge: false,
							isPrint: true,
							itemIndex: "0",
							foc: false,
							serviceChargePercentage: 0.0,
							stockType: "Normal",
							orderSource: null,
							deliveryType: null,
							totalBillLevelDiscountAmount: 0.0,
							subItems: null,
						},
						{
							id: 926103029,
							salesDate: "2024-02-14T00:00:00.000Z",
							itemId: 20008231,
							itemCode: "65040134",
							alternateLookup: "",
							itemName: "CASA CUTLERY HOLDER ASST H401-9912 7.5x18.3x14CM 143G",
							itemType: "CASA",
							model: "CASA",
							description:
								"CASA CUTLERY HOLDER ASST H401-9912 7.5x18.3x14CM 143G",
							brand: "YW",
							unitPrice: 2.4,
							quantity: 1.0,
							profit: 1.498,
							cost: 3.302,
							advanceDiscount: null,
							discountPercentage: 0.0,
							instoreOutlet: "default",
							priceSchemes: {
								manufacturerPrice: 2.4,
								salePrice: 2.4,
								employeePrice: 2.6,
								wholesalePrice: 0.0,
								customPrice: 0.0,
								webPrice: 0.0,
								webDealerPrice: 0.0,
								cost: 3.302,
							},
							uniqueId: "",
							matrixId: "",
							matrixBarcode: "",
							matrixX: "",
							matrixY: "",
							salesPerson: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
							subtotal: 2.4,
							taxCode: "",
							gstPercentage: 0.0,
							gstAmount: 0.0,
							gstInclusive: false,
							enterPrice: 2.4,
							scanCode: "",
							remark: null,
							deliveryQuantity: 1.0,
							discountAmount: 0.0,
							category: "CHINA",
							pcid: "",
							salesType: "",
							promoGroup: "",
							businessDateTime: "2024-02-14T00:00:00.000Z",
							voucherNumber: "",
							customValueOne: "",
							customValueTwo: "NON FOOD",
							customValueThree: "CHAIRS - KITCHENWARE - PLASTICWARE",
							customValueFour: "CHAIRS",
							customValueFive: "",
							customValueSix: "",
							customValueSeven: "",
							customValueEight: "AllItem2",
							customValueNine: "AllItem",
							customValueTen: "",
							customValueEleven: "",
							customValueTwelve: "",
							customValueThirteen: "",
							customValueFourteen: "",
							customValueFifteen: "Eco Shop",
							discountRemark: "",
							totalTaxAmount: 0.0,
							isServiceCharge: false,
							isPrint: true,
							itemIndex: "1",
							foc: false,
							serviceChargePercentage: 0.0,
							stockType: "Normal",
							orderSource: null,
							deliveryType: null,
							totalBillLevelDiscountAmount: 0.0,
							subItems: null,
						},
					],
					collection: [],
					id: 926103029,
					dateTime: "2024-02-14T13:55:54.000Z",
					recipientName: "CASH",
					clientId: "",
					clientName: "CASH",
					paid: 4.8,
					balance: 0.0,
					term: "0",
					cashier: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
					billingAddress: {
						street: "",
						city: "",
						state: "",
						zipcode: "",
						country: "",
					},
					shippingAddress: {
						street: null,
						city: null,
						state: null,
						zipcode: null,
						country: null,
					},
					shippingRemark: null,
					shipmentDateTime: null,
					salesPerson: "BCOB10002 NUR ALYSHA BALQIS BINTI OTHMAN",
					shippingStatus: "NA",
					status: "Completed",
					paymentStatus: "PAID",
					outlet: "BCO - CHERAS BALAKONG",
					confirmOutlet: null,
					remark: null,
					salesType: "Retail",
					discountPercentage: 0.0,
					billDiscountAmount: 0.0,
					taxPercentage: 0.0,
					cost: 3.302,
					profit: 1.498,
					rounding: 0.0,
					recipientContact: null,
					netAmount: 4.8,
					grandTotal: 4.8,
					gstTaxAmount: 0.0,
					exchangeRate: 0.0,
					foreignTotalAmount: 0.0,
					currencyCode: null,
					siteId: "92610",
					reference: "",
					shipmentProvider: null,
					businessDateTime: "2024-02-14T00:00:00.000Z",
					customFieldValueOne: "",
					customFieldValueTwo: "",
					customFieldValueThree: "",
					customFieldValueFour: "",
					customFieldValueFive: "",
					orderNo: null,
					paxNumber: null,
					orderSource: null,
					deliveryType: null,
					pickupTime: null,
					orderStatus: null,
					outletId: "5def3e9a61164c408c824e9cece5ac0c",
					salesOrderNo: "",
					trackingLink: null,
					trackingNumber: null,
					client: {
						id: null,
						name: "CASH",
						email: null,
						contactNo: null,
						alternateContactNo: null,
						clientCode: null,
						recipientContact: null,
						recipientName: "CASH",
						billingAddress: {
							street: "",
							city: "",
							state: "",
							zipcode: "",
							country: "",
						},
						shippingAddress: {
							street: null,
							city: null,
							state: null,
							zipcode: null,
							country: null,
						},
						billingRemark: null,
						shippingRemark: null,
						shippingDateTime: null,
						IsoShippingDateTime: null,
						type: null,
						paymentTerms: 0,
						individualDiscount: 0.0,
					},
					paymentFlowType: null,
					customerAlternateLookup: null,
					customerEmail: null,
					totalBillDiscountAmount: 0.0,
					cancelBy: null,
					cancelRemark: null,
					cancelOutlet: null,
					cancelOutletId: null,
					cancelDateTime: null,
					totalQuantity: 2.0,
				},
			],
		},
	};

	const camdummy = {
		message: "Hi from sales",
		camOneData: [
			{
				store_name: "Ecoshop Cheras Balakong",
				device_name: "Cam 1 - Counter Left",
				store_id: 356,
				device_mac: "E062906E7E9D",
				faces_image:
					"https://aishop-linksprite.s3.us-west-1.amazonaws.com/chips/874b6af3a6fbee4130b612abf7dfebbe.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAR4QODGFMTKGDBMW5%2F20240226%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240226T122234Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=905a929536ac899f579418679e0c1197b178019080dc732591b88c9079d8e434",
				visitor_id: "874b6af3a6fbee4130b612abf7dfebbe",
				age: "20-29",
				gender: 1,
				timestamp: "2024-02-14T13:55:26.000Z",
				anchor_id: "",
				temperature: "",
				tempUnit: 0,
				tempAlertThreshold: "",
				authentication_mode: 0,
				access_control: [
					800012, 700423, 600356, 510800, 400000, 300000, 200000, 100000,
				],
				mask: 0,
			},
			{
				store_name: "Ecoshop Cheras Balakong",
				device_name: "Cam 1 - Counter Left",
				store_id: 356,
				device_mac: "E062906E7E9D",
				faces_image:
					"https://aishop-linksprite.s3.us-west-1.amazonaws.com/chips/c4266e6e99b9f04ed3604c230da43f2e.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAR4QODGFMTKGDBMW5%2F20240226%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240226T122234Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=6c85f099074a1727dc5cb24828a100015695096cbb06ad5858cddd0bab2a9cd5",
				visitor_id: "c4266e6e99b9f04ed3604c230da43f2e",
				age: "10-19",
				gender: 1,
				timestamp: "2024-02-14T13:55:54.000Z",
				anchor_id: "",
				temperature: "",
				tempUnit: 0,
				tempAlertThreshold: "",
				authentication_mode: 0,
				access_control: [
					800012, 700423, 600356, 510800, 400000, 300000, 200000, 100000,
				],
				mask: 0,
			},
		],
	};

	dummyData.data.sales.sort(
		(a, b) => new Date(a.dateTime) - new Date(b.dateTime)
	);

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

	let customStartDate = convertISOToCustom(req.query.startDate);
	let customEndDate = convertISOToCustom(req.query.endDate);

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
	// const myHeaders = new Headers();
	// myHeaders.append("appid", "RWLFGF1zrPXW7MBeUCBJj9t7P8PjTf1X");
	// myHeaders.append("token", "v5_FB5in4b6XH8WGM63nZ86UvQQ1sRbqhsV3gV2k6LCvyU=");
	// myHeaders.append("auth", "5");

	// const requestOptions = {
	// 	method: "GET",
	// 	headers: myHeaders,
	// 	redirect: "follow",
	// };

	// await fetch(
	// 	`https://api.xilnex.com/logic/v2/sales/search?locationid=5def3e9a61164c408c824e9cece5ac0c&datefrom=${req.query.startDate}&dateto=${req.query.endDate}`,
	// 	requestOptions
	// )
	// 	.then((response) => response.json())
	// 	.then((result) => (bcoSale = result.data.sales))
	// 	.catch((error) => console.error(error));
	// let tobesigned = MD5(
	// 	`end_time=${customEndDate}&start_time=${customStartDate}&store_id=356&key=${token}`
	// )
	// 	.toString()
	// 	.toUpperCase();

	// const myHeaders = new Headers();
	// myHeaders.append("token", token);
	// myHeaders.append("sign", tobesigned);

	// const formdata = new FormData();
	// formdata.append("end_time", customEndDate);
	// formdata.append("start_time", customStartDate);
	// formdata.append("store_id", 356);

	// const requestOptions = {
	// 	method: "POST",
	// 	headers: myHeaders,
	// 	body: formdata,
	// 	redirect: "follow",
	// };

	// await fetch(
	// 	"https://deepcloud.linksprite.com/phpapi/v2/aiapp/subject/get_visiting_record",
	// 	requestOptions
	// )
	// 	.then((response) => response.json())
	// 	.then((result) => (visitingRecord = result.data))
	// 	.catch((error) => console.error(error));

	// const filtered = (unfiltered) => {
	// 	const filteredData = unfiltered.filter(
	// 		(record) => record.device_name === "Cam 1 - Counter Left"
	// 	);
	// 	return filteredData;
	// };
	// if (visitingRecord.length && token.length > 3) {
	// 	visitingRecord.forEach((item) => {
	// 		const stamp = new Date(item.timestamp.replace(" ", "T")).toISOString();
	// 		const date = new Date(stamp);
	// 		date.setHours(date.getHours() + 8);
	// 		item.timestamp = date;
	// 	});
	// }

	// visitingRecord.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

	// const camOneData = filtered(visitingRecord);

	function compareDatetime(date1, date2) {
		// Parse datetime strings into Date objects
		const d1 = new Date(date1);
		const d2 = new Date(date2);

		// Calculate the difference in milliseconds between the two datetime objects
		const diffMilliseconds = Math.abs(d1 - d2);

		// Convert milliseconds difference to seconds
		const diffSeconds = diffMilliseconds / 1000;

		// Check if the absolute difference is less than or equal to 20 seconds
		if (diffSeconds <= 20 || diffSeconds >= 20 || diffSeconds === 0) {
			return "Matched";
		} else {
			return "Suspect";
		}
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

	let finalData = [];
	const promises = dummyData.data.sales.map(async (element, index) => {
		let faces_frame = await getFacesFrame(
			camdummy.camOneData[index].visitor_id.toString()
		);

		finalData.push({
			Outlet: element.outlet,
			"Cashier Timestamp": element.dateTime,
			Cashier: element.cashier,
			"Sales ID": element.id,
			"Store Name": camdummy.camOneData[index].store_name,
			Camera: camdummy.camOneData[index].device_name,
			"Camera Timestamp": camdummy.camOneData[index].timestamp,
			"Theft Protection": compareDatetime(
				element.dateTime,
				camdummy.camOneData[index].timestamp
			),
			"Face Image": camdummy.camOneData[index].faces_image,
			"Frame Image": faces_frame,
		});
	});

	await Promise.all(promises);

	res.json({
		message: "Hi from sales",
		finalData,
	});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
