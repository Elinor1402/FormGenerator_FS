import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar-container">
        <Typography variant="h6" className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            Best4Me
          </Link>
        </Typography>
        <div className="nav-items">
          <Button color="inherit" className="nav-item">
            <Link to="/admin" className="nav-links">
              Admin
            </Link>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
