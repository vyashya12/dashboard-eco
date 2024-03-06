import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Router from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<HelmetProvider>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</HelmetProvider>
		</LocalizationProvider>
	);
}

export default App;
