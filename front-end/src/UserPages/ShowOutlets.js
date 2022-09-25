import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";
import pov from "../images/thali.png";

const ShowOutlets = () => {
  const { data } = useGlobalContext();
  const [error, setError] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
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
      >
        {/* title */}
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
            Food Outlets near you
          </Typography>
        </Grid>

        {loading && (
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center">
              Loading...
            </Typography>
          </Grid>
        )}

        {/* outlets */}
        {outlets.map((outlet) => (
          <Grid item md={4}>
            <Card variant="outlined" sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="194"
                image={pov}
                alt="Paella dish"
              />
              <CardHeader
                title={outlet.nameDish}
                subheader={"Price:" + outlet.dishPrice}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Address: {outlet.ngoName}, {outlet.address}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Contact: {outlet.contactNo}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  About: {outlet.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ShowOutlets;
