import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";
import thali from "../images/thali.png";
import { useNavigate } from "react-router-dom";

const ShowOutlets = () => {
  const navigate = useNavigate();
  const { data: ngoData } = useGlobalContext();
  const [error, setError] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(ngoData)
    if (Object.keys(ngoData.ngo) > 0) {
      navigate("/ngo-dashboard");
    }
    fetch(
      server + `/search_outlet?city=${ngoData.city}&state=${ngoData.state}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
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
  }, [ngoData]);

  return (
    <>
      <Grid
        container
        spacing={5}
        sx={{
          padding: {md: "2rem 10rem", xs: "1rem 3rem"}
        }}
      >
        {/* title */}
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center">
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
          <Grid key={outlet._id} item xs={12} md={4}>
            <Card variant="outlined" sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="180rem"
                width="180rem"
                image={thali}
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
