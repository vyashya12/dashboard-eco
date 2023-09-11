import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar, Stack } from "@mui/material";
// hooks
// components
import NavSection from "../navsection/NavSection";
import "./SideNav.css";
//
import navConfig from "./config";
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

SideNav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function SideNav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  let userData = {};
  if (localStorage.hasOwnProperty("user")) {
    userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
  }
  let userName = userData.name;

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 5, display: "inline-flex" }}>
        <Box
          component="img"
          src={require("../../images/exabLogo.png")}
          sx={{ width: 40, height: 40, cursor: "pointer" }}
        />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar
              src={`https://ui-avatars.com/api/?name=${userName}&size=128&background=0D8ABC&color=fff`}
              alt="Account"
            />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {userName}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              ></Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative" }}
        >
          <Box
            component="img"
            src={require("../../images/exabBanner.png")}
            sx={{ width: 100, position: "absolute", top: -50 }}
          />
        </Stack>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: "#F2F2FF",
            borderRightStyle: "dashed",
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
