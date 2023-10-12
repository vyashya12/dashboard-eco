import React, { useEffect, useState } from "react";
import SideNav from "../components/sidenav/SideNav";
import { Helmet } from "react-helmet-async";
import Header from "../components/header/Header";
import { Container, Typography, styled } from "@mui/material";
import QuickFilteringGrid from "../components/quickFilteringGrid/QuickFilteringGrid";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});
function ServerPage() {
  const [serverData, setServerData] = useState([]);

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
      .then((data) => setServerData(data));
  }, []);
  return (
    <>
      <Helmet>
        <title> Servers | Monitoring Dashboard </title>
      </Helmet>
      <StyledRoot>
        <SideNav />
        <Header />
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <Typography sx={{ mb: 3 }} variant="h4">
            All Servers
          </Typography>
          {serverData.length ? <QuickFilteringGrid data={serverData} /> : null}
        </Container>
      </StyledRoot>
    </>
  );
}

export default ServerPage;
