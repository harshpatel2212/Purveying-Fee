import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";

const ShowOutlets = () => {
  const { data } = useGlobalContext();
  const [error, setError] = useState(false);
  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    console.log(data);
    fetch(server + `/search_outlet?city=${data.city}&state=${data.state}`, {
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
        spacing={5}
        style={{
          padding: "2rem 10rem",
        }}
      ></Grid>
      {outlets.map((outlet) => (
        <Grid item xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={outlet.nameDish} subheader={outlet.dishPrice} />
            <CardMedia
              component="img"
              height="194"
              image="images/pov.jpeg"
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
    </>
  );
};

export default ShowOutlets;
