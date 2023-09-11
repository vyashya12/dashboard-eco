import React, { useEffect } from "react";
import SideNav from "../components/sidenav/SideNav";
import { Helmet } from "react-helmet-async";
import Header from "../components/header/Header";
import {
  Card,
  CardContent,
  Container,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function BackupStatus() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.hasOwnProperty("token")) {
      navigate("/404", { replace: true });
    }
  });
  const StyledRoot = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
  });
  return (
    <>
      <Helmet>
        <title> Backup Status | Monitoring Dashboard </title>
      </Helmet>
      <StyledRoot>
        <SideNav />
        <Header />
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <Typography variant="h4">Backup Status</Typography>

          <Card elevation={3} style={{ width: "30%", marginTop: 20 }}>
            <CardContent>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Device1" />
                  <Switch defaultChecked />
                </ListItemButton>
              </ListItem>
            </CardContent>
          </Card>
        </Container>
      </StyledRoot>
    </>
  );
}

export default BackupStatus;
