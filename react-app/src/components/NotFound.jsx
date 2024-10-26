import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../images/notfound.PNG";
import "./NotFound.css"; // Import the CSS file

//This is the page when user enter invalid url
function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      {/* <Navbar /> */}
      <Box className="not-found-container">
        <img src={NotFoundImage} alt="Not Found" className="not-found-image" />

        <Typography variant="h4" className="not-found-title">
          404 - Page Not Found
        </Typography>

        <Typography variant="body1" className="not-found-text">
          This page was not found. You may have mistyped the address or the page
          may have moved.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          className="not-found-button"
          onClick={() => navigate("/")}
        >
          Back to Home Page
        </Button>
      </Box>
    </>
  );
}

export default NotFound;
