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
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";
import { TimePicker } from "@mui/x-date-pickers";

const CreateClass = () => {
  const { data: ngoData } = useGlobalContext();
  const [data, setData] = useState({
    name: "",
    contactNo: "",
    description: "",
    address: "",
    tagField: "Select",
    startDate: Date.now(),
    endDate: Date.now(),
    time: Date.now(),
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

  const createClass = (e) => {
    e.preventDefault();

    let body = {
      ...data,
      ngoId: ngoData.ngo._id,
      ngoName: ngoData.ngo.ngoName,
    };

    fetch(server + "/create_class", {
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
            name: "",
            contactNo: "",
            description: "",
            address: "",
            tagField: "Select",
            startDate: Date.now(),
            endDate: Date.now(),
            time: Date.now(),
            city: "Select",
            state: "Select",
          });
          setError(false);
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
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center">
          Add Classes
        </Typography>
      </Grid>

      {/* success alert  */}
      {success && (
        <Grid item md={12}>
          <Alert severity="success">Class created successfully!</Alert>
        </Grid>
      )}

      {/* error alert */}
      {error && (
        <Grid item md={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      {/* class name */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="Name of Classes"
          variant="outlined"
          name="name"
          value={data.name}
          onChange={updateValues}
        />
      </Grid>

      {/* contact */}
      <Grid item md={6}>
        <TextField
          fullWidth
          label="Contact Number"
          variant="outlined"
          name="contactNo"
          value={data.contactNo}
          onChange={updateValues}
        />
      </Grid>

      {/* class desc */}
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

      {/* address */}
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

      {/* start date */}
      <Grid item md={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            name="startDate"
            views={["year", "month", "day"]}
            value={data.startDate}
            onChange={(newValue) => {
              setData({ ...data, startDate: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>

      {/* End date */}
      <Grid item md={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            name="endData"
            views={["year", "month", "day"]}
            value={data.endDate}
            onChange={(newValue) => {
              setData({ ...data, endDate: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>

      {/* start time */}
      <Grid item md={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={data.time}
            onChange={(newValue) => {
              setData({ ...data, time: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>

      {/* tags */}
      <Grid item md={4}>
        <FormControl fullWidth>
          <InputLabel id="tags">Field</InputLabel>
          <Select
            labelId="tags"
            value={data.tagField}
            label="tags"
            name="tagField"
            onChange={updateValues}
          >
            <MenuItem value={"Select"}>Select</MenuItem>
            <MenuItem value={"Computers/IT"}>Computers/IT</MenuItem>
            <MenuItem value={"Schooling"}>Schooling</MenuItem>
            <MenuItem value={"Language"}>Language</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* State */}
      <Grid item md={4}>
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
      <Grid item md={4}>
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

      {/* submit button */}
      <Grid item md={12} textAlign="center">
        <Button variant="contained" onClick={createClass}>
          Create Class
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateClass;
