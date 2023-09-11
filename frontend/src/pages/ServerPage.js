import React from "react";
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
  return (
    <>
      <Helmet>
        <title> Servers | Monitoring Dashboard </title>
      </Helmet>
      <StyledRoot>
        <SideNav />
        <Header />
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
          <QuickFilteringGrid />
        </Container>
      </StyledRoot>
    </>
  );
}

export default ServerPage;
