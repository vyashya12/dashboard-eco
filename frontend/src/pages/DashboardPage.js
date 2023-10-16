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
      if (server.PercentFree) {
        let splitPercentages = server.PercentFree.split(",");
        if (splitPercentages.length > 1) {
          for (const onePercentage of splitPercentages) {
            if (
              parseInt(onePercentage.slice(0, -1)) <= 20 &&
              parseInt(onePercentage.slice(0, -1)) > 10
            ) {
              stats.disk20 += 1;
            } else if (parseInt(onePercentage.slice(0, -1)) <= 10) {
              stats.disk10 += 1;
            }
          }
        } else {
          if (
            parseInt(splitPercentages) <= 20 &&
            parseInt(splitPercentages) > 10
          ) {
            stats.disk20 += 1;
          } else if (parseInt(splitPercentages) <= 10) {
            stats.disk10 += 1;
          }
        }
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
      let splitTMem = server.TotalMemory.split(",");
      let splitUMem = server.UsedMemory.split(",");
      if (splitTMem.length > 1) {
        splitTMem = splitTMem.slice(0, -1);
        splitUMem = splitUMem.slice(0, -1);
        for (let i = 0; i < splitTMem.length; i++) {
          splitTMem = parseInt(splitTMem[i].slice(0, -3));
          splitUMem = parseInt(splitUMem[i].slice(0, -3));

          if (((splitTMem - splitUMem) / splitTMem) * 100 < 20) {
            stats.Ram20 += 1;
          }
          if (
            ((splitTMem - splitUMem) / splitTMem) * 100 <= 30 &&
            ((splitTMem - splitUMem) / splitTMem) * 100 > 20
          ) {
            stats.Ram30 += 1;
          }
        }
      } else {
        splitTMem = parseInt(splitTMem[0].slice(0, -3));
        splitUMem = parseInt(splitUMem[0].slice(0, -3));
        if (((splitTMem - splitUMem) / splitTMem) * 100 < 20) {
          stats.Ram20 += 1;
        }
        if (
          ((splitTMem - splitUMem) / splitTMem) * 100 <= 30 &&
          ((splitTMem - splitUMem) / splitTMem) * 100 > 20
        ) {
          stats.Ram30 += 1;
        }
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
