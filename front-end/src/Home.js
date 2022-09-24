import React from "react";
import bgimage from "./images/pov.jpeg";
import Grid from "@mui/material/Grid";
import "./Home.css";
import { Divider, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Grid container spacing={2} className="main-container">
        <Grid item xs={12}>
          <h1>Purveying F.E.E</h1>
        </Grid>
        <Grid item className="for-user" xs={6}>
          <h2>Are you Looking for some Help?</h2>
          <div className="user-container">
            <Autocomplete
              className="input-fields"
              disablePortal
              id="state-select"
              // options={top100Films}
              fullWidth
              renderInput={(params) => <TextField {...params} label="State" />}
            />
            <Autocomplete
              className="input-fields"
              disablePortal
              id="city-select"
              // options={top100Films}
              fullWidth
              renderInput={(params) => <TextField {...params} label="City" />}
            />
          </div>
        </Grid>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Grid item className="for-ngo" xs>
          <Grid container spacing={2} className="ngo-container">
            <Grid item xs={12}>
              <h2>Are you a NGO?</h2>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" xs={6}>
                <Link to="/ngo-register">Register Here!</Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="p">Already have an account?</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">
                <Link to="ngo-login">Sign In</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
