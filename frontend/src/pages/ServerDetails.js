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
    fetch(`${process.env.REACT_APP_URL}api/servers/`, {
      headers: { "x-access-token": token },
    })
      .then((data) => data.json())
      .then((data) => dataFilter(data))
      .then((data) => setServerData(data));
  }, []);

  const dataFilter = (data) => {
    let filtered = data;
    let arrayObj = [];
    if (location.state.mode === "Disk Space under 10%") {
      data.forEach((item) => {
        let splitPercentages = item.PercentFree.split(",");
        console.log(splitPercentages);
        if (splitPercentages.length > 1) {
          splitPercentages.forEach((percentage) => {
            console.log(parseInt(percentage.slice(0, -1)));
            if (parseInt(percentage.slice(0, -1)) <= 10) {
              const objExists = arrayObj.some((obj) => obj.id === item.id);

              if (!objExists) {
                arrayObj.push(item);
              }
            }
          });
        } else {
          if (parseInt(splitPercentages[0].slice(0, -1)) <= 10) {
            console.log(splitPercentages[0].slice(0, -1));
            const objExists = arrayObj.some((obj) => obj.id === item.id);

            if (!objExists) {
              arrayObj.push(item);
            }
          }
        }
      });
    } else if (location.state.mode === "Disk Space under 20%") {
      data.forEach((item) => {
        let splitPercentages = item.PercentFree.split(",");
        if (splitPercentages.length > 1) {
          splitPercentages = splitPercentages.slice(0, -1);
          splitPercentages.forEach((percentage) => {
            if (
              parseInt(percentage.slice(0, -1)) <= 20 &&
              parseInt(percentage.slice(0, -1)) > 10
            ) {
              const objExists = arrayObj.some((obj) => obj.id === item.id);

              if (!objExists) {
                arrayObj.push(item);
              }
            }
          });
        } else {
          if (
            parseInt(item.PercentFree.slice(0, -1)) <= 20 &&
            parseInt(item.PercentFree.slice(0, -1)) > 10
          ) {
            const objExists = arrayObj.some((obj) => obj.id === item.id);

            if (!objExists) {
              arrayObj.push(item);
            }
          }
        }
      });
    } else if (location.state.mode === "RAM under 20%") {
      // filtered = data.filter(
      //   (item) =>
      //     ((item.TotalMemory - item.UsedMemory) / item.TotalMemory) * 100 <= 20
      // );
      data.forEach((item) => {
        let splitTotMem = item.TotalMemory.split(",");
        let splitUseMem = item.UsedMemory.split(",");
        if (splitTotMem.length > 1) {
          splitTotMem = splitTotMem.slice(0, -1);
          splitUseMem = splitTotMem.slice(0, -1);
          splitTotMem.forEach((totMem, i) => {
            if (((totMem - splitUseMem[i]) / totMem) * 100 <= 20) {
              const objExists = arrayObj.some((obj) => obj.id === item.id);

              if (!objExists) {
                arrayObj.push(item);
              }
            }
          });
        } else {
          if (
            ((parseInt(splitTotMem[0].slice(0, -3)) -
              parseInt(splitUseMem[0].slice(0, -3))) /
              parseInt(splitTotMem[0].slice(0, -3))) *
              100 <=
            20
          ) {
            const objExists = arrayObj.some((obj) => obj.id === item.id);

            if (!objExists) {
              arrayObj.push(item);
            }
          }
        }
      });
    } else if (location.state.mode === "RAM under 30%") {
      // filtered = data.filter(
      //   (item) =>
      //     ((item.TotalMemory - item.UsedMemory) / item.TotalMemory) * 100 <=
      //       30 &&
      //     ((item.TotalMemory - item.UsedMemory) / item.TotalMemory) * 100 > 20
      // );
      data.forEach((item) => {
        let splitTotMem = item.TotalMemory.split(",");
        let splitUseMem = item.UsedMemory.split(",");
        if (splitTotMem.length > 1) {
          splitTotMem = splitTotMem.slice(0, -1);
          splitUseMem = splitTotMem.slice(0, -1);
          splitTotMem.forEach((totMem, i) => {
            if (
              ((totMem - splitUseMem[i]) / totMem) * 100 <= 30 &&
              ((totMem - splitUseMem[i]) / totMem) * 100 > 20
            ) {
              const objExists = arrayObj.some((obj) => obj.id === item.id);

              if (!objExists) {
                arrayObj.push(item);
              }
            }
          });
        } else {
          if (
            ((parseInt(splitTotMem[0].slice(0, -3)) -
              parseInt(splitUseMem[0].slice(0, -3))) /
              parseInt(splitTotMem[0].slice(0, -3))) *
              100 <=
              30 &&
            ((parseInt(splitTotMem[0].slice(0, -3)) -
              parseInt(splitUseMem[0].slice(0, -3))) /
              parseInt(splitTotMem[0].slice(0, -3))) *
              100 >
              20
          ) {
            const objExists = arrayObj.some((obj) => obj.id === item.id);
            if (!objExists) {
              arrayObj.push(item);
            }
          }
        }
      });
    } else if (location.state.mode === "above 30 Virtual Machines") {
      filtered = data.filter(
        (item) =>
          item.OnlineVPS + item.OfflineVPS >= 30 &&
          item.OnlineVPS + item.OfflineVPS < 40
      );
      arrayObj = filtered;
    } else if (location.state.mode === "above 40 Virtual Machines") {
      filtered = data.filter((item) => item.OnlineVPS + item.OfflineVPS >= 40);
      arrayObj = filtered;
    }
    setUsableData(arrayObj);
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
