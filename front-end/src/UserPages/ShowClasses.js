import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";

const ShowClasses = () => {
  const { data } = useGlobalContext();
  const [error, setError] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    console.log(data);
    fetch(server + `/search_classes?city=${data.city}&state=${data.state}`, {
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

  return (
    <>
      <Grid
        container
        spacing={5}
        style={{
          padding: "2rem 10rem",
        }}
      ></Grid>
      {classes.map((classes) => (
        <Grid item xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title={classes.description}
              subheader={classes.tagField}
            />
            <CardMedia
              component="img"
              height="194"
              image="images/pov.jpeg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {classes.ngoName}, {classes.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact Info: {classes.contactNo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Date: {classes.startDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                End Date: {classes.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Time: {classes.time}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default ShowClasses;
