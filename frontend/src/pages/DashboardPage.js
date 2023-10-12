import React, { useEffect, useState } from "react";
import SideNav from "../components/sidenav/SideNav";
import { Helmet } from "react-helmet-async";
import Header from "../components/header/Header";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

const color = red[100];

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

function DashboardPage() {
  const [serverData, setServerData] = useState([]);
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState({
    disk10: 0,
    disk20: 0,
    Ram20: 0,
    Ram30: 0,
    VM30: 0,
    VM40: 0,
  });
  const navigate = useNavigate();

  let statsChecker = (data) => {
    for (const server of data) {
      if (server.PercentFree <= 20 && server.PercentFree > 10) {
        stats.disk20 += 1;
      }
      if (server.PercentFree <= 10) {
        stats.disk10 += 1;
      }
      if (
        server.OnlineVPS + server.OfflineVPS >= 30 &&
        server.OnlineVPS + server.OfflineVPS < 40
      ) {
        stats.VM30 += 1;
      }
      if (server.OnlineVPS + server.OfflineVPS >= 40) {
        stats.VM40 += 1;
      }
      if (
        ((server.TotalMemory - server.UsedMemory) / server.TotalMemory) * 100 <
        20
      ) {
        stats.Ram20 += 1;
      }
      if (
        ((server.TotalMemory - server.UsedMemory) / server.TotalMemory) * 100 <=
          30 &&
        ((server.TotalMemory - server.UsedMemory) / server.TotalMemory) * 100 >
          20
      ) {
        stats.Ram30 += 1;
      }
    }
    setReady(true);
  };

  useEffect(() => {
    if (!localStorage.hasOwnProperty("token")) {
      navigate("/404", { replace: true });
    }

    fetch(`${process.env.REACT_APP_URL}api/servers/`, {
      headers: { "x-access-token": token },
    })
      .then((data) => data.json())
      .then((data) => statsChecker(data));
  }, []);

  let token = {};
  if (localStorage.hasOwnProperty("token")) {
    token = localStorage.getItem("token");
  }

  const modeSender = (mode) => {
    navigate("/serverdetails", { state: { mode: mode } });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Monitoring Dashboard </title>
      </Helmet>
      <StyledRoot>
        <SideNav />
        <Header />
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <Typography variant="h5">Hi, Welcome back</Typography>

          {ready ? (
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={3}>
                <Paper
                  square={false}
                  elevation={3}
                  sx={{
                    bgcolor: color,
                    height: 150,
                    padding: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Disk Size 10%
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{ flex: 1, justifyContent: "space-between", mt: 10 }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {stats.disk10}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => modeSender("Disk Space under 10%")}
                    >
                      <ArrowForwardIosIcon />
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper
                  square={false}
                  elevation={3}
                  sx={{
                    bgcolor: "lightgoldenrodyellow",
                    height: 150,
                    padding: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Disk Size 20%
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{ flex: 1, justifyContent: "space-between", mt: 10 }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {stats.disk20}
                    </Typography>
                    <Button
                      onClick={() => modeSender("Disk Space under 20%")}
                      variant="outlined"
                      sx={{
                        color: "#ffc400",
                        borderColor: "#ffc400",
                        "&:hover": {
                          backgroundColor: "#ffff8d",
                          borderColor: "#ffab00",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper
                  square={false}
                  elevation={3}
                  sx={{ bgcolor: color, height: 150, padding: 2 }}
                >
                  <Typography variant="h5" gutterBottom>
                    Free Ram 20%
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{ flex: 1, justifyContent: "space-between", mt: 10 }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {stats.Ram20}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => modeSender("RAM under 20%")}
                    >
                      <ArrowForwardIosIcon />
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper
                  square={false}
                  elevation={3}
                  sx={{
                    bgcolor: "lightgoldenrodyellow",
                    height: 150,
                    padding: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Free Ram 30%
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{ flex: 1, justifyContent: "space-between", mt: 10 }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {stats.Ram30}
                    </Typography>
                    <Button
                      onClick={() => modeSender("RAM under 30%")}
                      variant="outlined"
                      sx={{
                        color: "#ffc400",
                        borderColor: "#ffc400",
                        "&:hover": {
                          backgroundColor: "#ffff8d",
                          borderColor: "#ffab00",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  square={false}
                  elevation={3}
                  sx={{
                    bgcolor: "lightgoldenrodyellow",
                    height: 150,
                    padding: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    30 VM Count
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{ flex: 1, justifyContent: "space-between", mt: 10 }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {stats.VM30}
                    </Typography>
                    <Button
                      onClick={() => modeSender("above 30 Virtual Machines")}
                      variant="outlined"
                      sx={{
                        color: "#ffc400",
                        borderColor: "#ffc400",
                        "&:hover": {
                          backgroundColor: "#ffff8d",
                          borderColor: "#ffab00",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  square={false}
                  elevation={3}
                  sx={{
                    bgcolor: color,
                    height: 150,
                    padding: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    40 VM Count
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{ flex: 1, justifyContent: "space-between", mt: 10 }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {stats.VM40}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => modeSender("above 40 Virtual Machines")}
                    >
                      <ArrowForwardIosIcon />
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          ) : null}
        </Container>
      </StyledRoot>
    </>
  );
}

export default DashboardPage;
