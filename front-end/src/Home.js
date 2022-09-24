import Login from "./NgoPages/Login";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./Home.css";
import {
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { server } from "./constants";
import { useGlobalContext } from "./context/GlobalContext";

const Home = () => {
  const navigate = useNavigate();
  const { updateData } = useGlobalContext();
  const [data, setData] = useState({
    city: "Select",
    state: "Select",
  });

  const [error, setError] = useState(false);
  const [locations, setLocations] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(server + "/get_locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          let obj = {};
          let arr = [];

          response.data.map((loc) => {
            if (obj[loc.state]) {
              // console.log("exists");
            } else {
              obj[loc.state] = 1;
              arr.push(loc.state);
            }
          });

          setStates(arr);

          setLocations(response.data);
        } else {
          setError(response.error);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const updateValues = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      let cityArr = locations.filter((loc) => loc.state === value);
      setCities(cityArr);
      setData({ ...data, city: "Select", [name]: value });
    } else {
      setData({ ...data, [name]: value });
    }

    setError(null);
  };

  const go = (e) => {
    e.preventDefault();

    updateData(data);
    navigate("/show-outlets");

    localStorage.clear();
  };

  return (
    <>
      <Grid container spacing={2} className="main-container">
        <Grid item xs={12}>
          <h1>Purveying F.E.E</h1>
        </Grid>
        <Grid item className="for-user" xs={6} textAlign="center">
          <Grid item xs={12}>
            <Typography variant="h4" textAlign="center">
              Are you Looking for some Help?
            </Typography>
          </Grid>

          {/* State */}
          <Grid
            item
            md={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl fullWidth>
              <InputLabel id="state">State</InputLabel>
              <Select
                labelId="state"
                value={data.state}
                label="State"
                name="state"
                onChange={updateValues}
              >
                <MenuItem value={"Select"}>Select</MenuItem>
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* city */}
          <Grid item md={6}>
            <FormControl fullWidth>
              <InputLabel id="city">City</InputLabel>
              <Select
                labelId="city"
                value={data.city}
                label="City"
                name="city"
                onChange={updateValues}
              >
                <MenuItem value={"Select"}>Select</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city.city} value={city.city}>
                    {city.city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <Button variant="contained" onClick={go}>
              Go
            </Button>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Grid item className="for-ngo" xs>
          <Grid container spacing={2} className="ngo-container">
            <Grid item md={12}>
              <h2>Are you a NGO?</h2>
            </Grid>
            <Login />
            <Grid item md={12}>
              <Typography variant="p">
                Don't have an Account?
                <Link>Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
