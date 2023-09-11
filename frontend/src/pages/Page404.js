import React from "react";
import { Link as RouterLink } from "react-router-dom";
//mui
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: "12px",
}));

function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | Monitoring Dashboard </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={require("../images/notfound.png")}
            alt="Page Not Found"
            sx={{
              height: 260,
              mx: "auto",
              my: { xs: 5, sm: 5 },
              borderRadius: "30px",
            }}
          />

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}

export default Page404;
