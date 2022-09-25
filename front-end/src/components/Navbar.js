import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const { data, updateData } = useGlobalContext();
  const navigate = useNavigate();
  const [navState, setNavState] = useState(0);

  useEffect(() => {
    if (Object.keys(data.ngo).length > 0) {
      setNavState(1);
    } else if (data.city) {
      setNavState(2);
    }
  }, [data]);

  const logOut = () => {
    localStorage.clear();
    updateData({
      authenticated: false,
      city: "",
      state: "",
      ngo: {},
    });
    setNavState(0);
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {navState === 1 && (
              <>
                <Link
                  to="/ngo-dashboard"
                  style={{ color: "#fff", marginRight: "1rem" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-class"
                  style={{ color: "#fff", marginRight: "1rem" }}
                >
                  Add Classes
                </Link>
                <Link
                  to="/create-outlet"
                  style={{ color: "#fff", marginRight: "1rem" }}
                >
                  Add Food Outlet
                </Link>
              </>
            )}
            {navState === 2 && (
              <>
                <Link
                  to="/show-classes"
                  style={{ color: "#fff", marginRight: "1rem" }}
                >
                  Classes
                </Link>
                <Link
                  to="/show-outlets"
                  style={{ color: "#fff", marginRight: "1rem" }}
                >
                  Food Outlet
                </Link>
              </>
            )}
          </Typography>

          {navState !== 0 && (
            <Button color="inherit" onClick={logOut}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
