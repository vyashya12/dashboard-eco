// component
// import SvgColor from "../iconify/Iconify";
import Iconify from "../iconify/Iconify";

// ----------------------------------------------------------------------

// const icon = (name) => (
//   // <SvgColor src={`../../icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

const navConfig = [
	{
		title: "dashboard",
		path: "/dashboard",
		icon: <Iconify icon={"material-symbols:query-stats-rounded"} />,
	},
	{
		title: "logout",
		path: "/logout",
		icon: <Iconify icon={"material-symbols:logout"} />,
	},
];

export default navConfig;
