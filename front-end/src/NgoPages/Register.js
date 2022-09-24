import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../constants";

const Register = () => {
  const [data, setData] = useState({
    ngoName: "",
    headName: "",
    email: "",
    contact: "",
    websiteLink: "",
    address: "",
    password: "",
    confirmPassword: "",
    city: "Select",
    state: "Select",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const registerNgo = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Password and Confirm Password did not match!");
      return;
    }

    fetch(server + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setSuccess(true);
          setData({
            ngoName: "",
            headName: "",
            email: "",
            contact: "",
            websiteLink: "",
            address: "",
            password: "",
            confirmPassword: "",
            city: "Select",
            state: "Select",
          });
        } else {
          setError(response.error);
          setSuccess(false);
        }
      });
  };

  return (
    <Grid
      container
      spacing={5}
      style={{
        padding: "2rem 10rem",
      }}
    >
      {/* title */}
      <Grid item md={12}>
        <Typography variant="h4" textAlign="center">
          Register your NGO
        </Typography>
      </Grid>

      {/* success alert  */}
      {success && (
        <Grid item md={12}>
          <Alert severity="success">
            NGO registered successfully. Move to{" "}
            <Link to="/ngo-login"> Login</Link>
          </Alert>
        </Grid>
      )}

      {/* error alert */}
      {error && (
        <Grid item md={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      {/* Ngo name */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="Name of NGO"
          variant="outlined"
          name="ngoName"
          value={data.ngoName}
          onChange={updateValues}
        />
      </Grid>

      {/* Head name */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="Name of NGO Lead"
          variant="outlined"
          name="headName"
          value={data.headName}
          onChange={updateValues}
        />
      </Grid>

      {/* email */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="Email of NGO"
          variant="outlined"
          name="email"
          value={data.email}
          onChange={updateValues}
        />
      </Grid>

      {/* contact */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="NGO Contact Number"
          variant="outlined"
          name="contact"
          value={data.contact}
          onChange={updateValues}
        />
      </Grid>

      {/* website link */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="NGO's Website Link"
          variant="outlined"
          name="websiteLink"
          value={data.websiteLink}
          onChange={updateValues}
        />
      </Grid>

      {/* address */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="NGO's Address"
          variant="outlined"
          name="address"
          value={data.address}
          onChange={updateValues}
        />
      </Grid>

      {/* State */}
      <Grid item md={6}>
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

      {/* password */}
      <Grid item md={6}>
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          value={data.password}
          onChange={updateValues}
        />
      </Grid>

      {/* confirm password */}
      <Grid item md={6}>
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={updateValues}
        />
      </Grid>

      {/* submit button */}
      <Grid item md={12} textAlign="center">
        <Button variant="contained" onClick={registerNgo}>
          Register NGO
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
