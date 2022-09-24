import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";

const Login = () => {
  const { updateData } = useGlobalContext();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateValues = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });

    setError(null);
  };

  const login = (e) => {
    e.preventDefault();

    fetch(server + "/login", {
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
          localStorage.setItem("ngo", JSON.stringify(response.data));
          updateData({ authenticated: true, ngo: response.ngo });
          navigate("/ngo-dashboard");
        } else {
          setError(response.error);
        }
      })
      .catch((error) => console.log(error));
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
        <Typography variant="h6" textAlign="center">
          Login as a NGO
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

      {/* email */}
      <Grid item md={12}>
        <TextField
          fullWidth
          label="Email of NGO"
          variant="outlined"
          name="email"
          value={data.email}
          onChange={updateValues}
        />
      </Grid>

      {/* password */}
      <Grid item md={12}>
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

      {/* submit button */}
      <Grid item md={12} textAlign="center">
        <Button variant="contained" onClick={login} fullWidth>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
