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
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { server } from "./constants";
import { useGlobalContext } from "./context/GlobalContext";
// import pov from "./images/pov.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const { data: ngoData, updateData } = useGlobalContext();
  const [data, setData] = useState({
    city: "Select",
    state: "Select",
  });

  const [error, setError] = useState(false);
  const [locations, setLocations] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (Object.keys(ngoData.ngo) > 0) {
      navigate("/ngo-dashboard");
    } else if (ngoData.city) {
      navigate("/show-outlets");
    }

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

          response.data.filter((loc) => {
            if (!obj[loc.state]) {
              obj[loc.state] = 1;
              arr.push(loc.state);
            }
            return loc.state;
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
    localStorage.setItem("state", data.state);
    localStorage.setItem("city", data.city);
    navigate("/show-outlets");
    // navigate("/show-classes");

    // localStorage.clear();
  };

  return (
    <>
      <Grid container textAlign="center">
        {/* Heading title */}
        <Grid item xs={12}>
          {/* <img src={pov} alt="Purveying F.E.E"></img> */}
          <h1>Purveying F.E.E</h1>
        </Grid>

        {/* user side */}
        <Grid item md={6} xs={12}>
          <Grid container spacing={2} className="user-container">
            <Grid item xs={12}>
              <h2>Are you Looking for some Help?</h2>
            </Grid>

            {/* error alert */}
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            {/* State */}
            <Grid item xs={12} m="1rem 5rem">
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
            <Grid item xs={12} m="1rem 5rem">
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

            {/* button */}
            <Grid item xs={6} textAlign="center" m={0}>
              <Button variant="contained" onClick={go}>
                Go
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* NGO Side */}
        <Divider orientation="vertical" flexItem variant="middle" />
        <Grid item xs>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Are you a NGO?</h2>
            </Grid>
            <Login />
            <Grid item xs={12}>
              <Typography variant="p">
                Don't have an Account? <Link to="/ngo-register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
