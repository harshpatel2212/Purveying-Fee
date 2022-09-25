import * as React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";
import courses from "../images/courses.png";
import thali from "../images/thali.png";

const NgoDashboard = () => {
  const { data } = useGlobalContext();
  const [error, setError] = useState(false);
  const [classes, setClasses] = useState([]);
  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    console.log(data);
    fetch(server + `/search_classes?ngoId=${data.ngo._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          console.log(response.data);
          setClasses(response.data);
          setError(false);
        } else {
          setError(response.error);
        }
      })
      .catch((error) => console.log(error));
  }, [data]);

  useEffect(() => {
    console.log(data);
    fetch(server + `/search_outlet?ngoId=${data.ngo._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          console.log(response.data);
          setOutlets(response.data);
          setError(false);
        } else {
          setError(response.error);
        }
      })
      .catch((error) => console.log(error));
  }, [data]);

  return (
    <>
      <Grid
        container
        style={{
          padding: "2rem 3rem",
        }}
      >
        <Grid item xs={6}>
          <Typography textAlign="center" variant="h4">
            Classes By Us
          </Typography>
          <Grid
            container
            spacing={5}
            style={{
              padding: "2rem 5rem",
            }}
          >
            {classes.map((c) => (
              <Grid item xs={6}>
                <Card variant="outlined" sx={{ maxWidth: 345 }}>
                  <CardHeader title={c.description} subheader={c.tagField} />
                  <CardMedia
                    component="img"
                    height="194"
                    image={courses}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {c.ngoName}, {c.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Contact Info: {c.contactNo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start Date: {c.startDate.split("T")[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      End Date: {c.endDate.split("T")[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time: {c.time}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Grid item xs>
          <Typography textAlign="center" variant="h4">
            Outlets By Us
          </Typography>
          <Grid
            container
            spacing={5}
            style={{
              padding: "2rem 5rem",
            }}
          >
            {outlets.map((outlet) => (
              <Grid item xs={6}>
                <Card variant="outlined" sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title={outlet.nameDish}
                    subheader={outlet.dishPrice}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={thali}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {outlet.ngoName}, {outlet.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {outlet.contactNo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {outlet.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NgoDashboard;
