import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Dashboard",
    icon: "material-symbols:query-stats-rounded",
    path: "/dashboard",
  },
  {
    label: "Server",
    icon: "solar:server-bold",
    path: "/servers",
  },
  {
    label: "Backup Status",
    path: "/backup",
    icon: "material-symbols:backup-outline-rounded",
  },
  {
    label: "Logout",
    icon: "material-symbols:logout",
    path: "/logout",
  },
];
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  let userData = {};
  if (localStorage.hasOwnProperty("user")) {
    userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
  }
  let userName = userData.name;
  let email = userData.email;

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          src={`https://ui-avatars.com/api/?name=${userName}&size=128&background=0D8ABC&color=fff`}
          alt="photoURL"
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <Link
              key={option.label}
              to={option.path}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </Link>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />
      </Popover>
    </>
  );
}
