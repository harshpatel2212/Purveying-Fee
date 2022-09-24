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
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    city: "",
    state: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateValues = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });

    setError(null);
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
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
        <Button variant="contained">Register NGO</Button>
      </Grid>
    </Grid>
  );
};

export default Register;
