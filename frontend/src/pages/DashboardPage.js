import React, { useEffect } from "react";
import SideNav from "../components/sidenav/SideNav";
import { Helmet } from "react-helmet-async";
import Header from "../components/header/Header";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.hasOwnProperty("token")) {
      navigate("/404", { replace: true });
    }
  });

  return (
    <>
      <Helmet>
        <title> Dashboard | Monitoring Dashboard </title>
      </Helmet>
      <StyledRoot>
        <SideNav />
        <Header />
      </StyledRoot>
    </>
  );
}

export default DashboardPage;
