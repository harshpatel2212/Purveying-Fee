import {
  InputLabel,
  Alert,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";

const CreateOutlet = () => {
  const { data: ngoData } = useGlobalContext();
  const [data, setData] = useState({
    nameDish: "",
    contactNo: "",
    dishPrice: "",
    description: "",
    address: "",
    state: "Select",
    city: "Select",
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
  }, [data]);

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

  const createOutlet = (e) => {
    e.preventDefault();

    let body = {
      ...data,
      ngoId: ngoData.ngo._id,
      ngoName: ngoData.ngo.ngoName,
    };
    fetch(server + "/create_outlet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setSuccess(true);
          setData({
            nameDish: "",
            dishPrice: "",
            contactNo: "",
            description: "",
            address: "",
            state: "Select",
            city: "Select",
          });
          setError(false);
        } else {
          setError(response.error);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container spacing={5} style={{ padding: "2rem 10rem", }}>
      <Grid item md={12}>
        <Typography variant="h4" textAlign="center">
          Add your Outlet
        </Typography>
      </Grid>

      {/* success alert  */}
      {success && (
        <Grid item md={12}>
          <Alert severity="success">Outlet created successfully!</Alert>
        </Grid>
      )}

      {/* error alert */}
      {error && (
        <Grid item md={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      {/* DishName */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="Dish name"
          variant="outlined"
          name="nameDish"
          value={data.nameDish}
          onChange={updateValues}
        />
      </Grid>

      {/* Dish Price */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="Dish Price"
          variant="outlined"
          name="dishPrice"
          value={data.dishPrice}
          onChange={updateValues}
        />
      </Grid>

      {/* Contact No. */}
      <Grid item md={12}>
        <TextField
          fullWidth
          label="Contact Number"
          variant="outlined"
          name="contactNo"
          value={data.contactNo}
          onChange={updateValues}
        />
      </Grid>

      {/* Desc */}
      <Grid item md={12}>
        <TextField
          fullWidth
          multiline
          label="Description"
          variant="outlined"
          name="description"
          value={data.description}
          onChange={updateValues}
        />
      </Grid>

      {/* Address */}
      <Grid item md={12}>
        <TextField
          fullWidth
          multiline
          label="Address"
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

      {/* Submit */}
      <Grid item md={12} textAlign="center">
        <Button variant="contained" onClick={createOutlet}>
          Create Outlet
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateOutlet;
