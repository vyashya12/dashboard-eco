import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SideNav from "../components/sidenav/SideNav";
import Header from "../components/header/Header";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
  styled,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import QuickFilteringGrid from "../components/quickFilteringGrid/QuickFilteringGrid";
import { useNavigate } from "react-router-dom";

function ServerDetails() {
  const location = useLocation();
  const [serverData, setServerData] = useState([]);
  const [usableData, setUsableData] = useState([]);

  const navigate = useNavigate();

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
      .then((data) => dataFilter(data))
      .then((data) => setServerData(data));
  }, []);

  const dataFilter = (data) => {
    let filtered = data;
    if (location.state.mode === "Disk Space under 10%") {
      filtered = data.filter((item) => item.PercentFree <= 10);
      setUsableData(filtered);
    } else if (location.state.mode === "Disk Space under 20%") {
      filtered = data.filter(
        (item) => item.PercentFree <= 20 && item.PercentFree > 10
      );
      setUsableData(filtered);
    } else if (location.state.mode === "RAM under 20%") {
      filtered = data.filter(
        (item) =>
          ((item.TotalMemory - item.UsedMemory) / item.TotalMemory) * 100 <= 20
      );
      setUsableData(filtered);
    } else if (location.state.mode === "RAM under 30%") {
      filtered = data.filter(
        (item) =>
          ((item.TotalMemory - item.UsedMemory) / item.TotalMemory) * 100 <=
            30 &&
          ((item.TotalMemory - item.UsedMemory) / item.TotalMemory) * 100 > 20
      );
      setUsableData(filtered);
    } else if (location.state.mode === "above 30 Virtual Machines") {
      filtered = data.filter(
        (item) =>
          item.OnlineVPS + item.OfflineVPS >= 30 &&
          item.OnlineVPS + item.OfflineVPS < 40
      );
      setUsableData(filtered);
    } else if (location.state.mode === "above 40 Virtual Machines") {
      filtered = data.filter((item) => item.OnlineVPS + item.OfflineVPS >= 40);
      setUsableData(filtered);
    }
  };

  const StyledRoot = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
  });
  return (
    <>
      <Helmet>
        <title> Server Details | Monitoring Dashboard </title>
      </Helmet>
      <StyledRoot>
        <SideNav />
        <Header />
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <Typography sx={{ mb: 3 }} variant="h5">
            Server Details
          </Typography>
          {usableData.length ? (
            <>
              {/* <Button size="small" onClick={() => navigate("/dashboard")}>
                Return
              </Button> */}
              <QuickFilteringGrid data={usableData} />
            </>
          ) : (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  No data Available
                </Typography>
                <Typography variant="h5" component="div">
                  Not found Server with {location.state.mode}
                </Typography>
                <Typography variant="body2">
                  Navigate to Dashboard Page using button bellow
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/dashboard")}>
                  Return
                </Button>
              </CardActions>
            </Card>
          )}
        </Container>
      </StyledRoot>
    </>
  );
}

export default ServerDetails;
