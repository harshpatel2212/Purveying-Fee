import * as React from "react";
import { Grid, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";
import pov from "../images/courses.png";


const ShowClasses = () => {
  const { data } = useGlobalContext();
  const [error, setError] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

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

<Grid item xs={12}>
          <Typography variant="h5" textAlign="center">
            Classes near you
          </Typography>
        </Grid>

        {loading && (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              Loading...
            </Typography>
          </Grid>
        )}

        {classes.map((classes) => (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ maxWidth: 345 }}>
              <CardHeader
                title={classes.description}
                subheader={classes.tagField}
              />
              <CardMedia
                component="img"
                height="194"
                image={pov}
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
      </Grid>
    </>
  );
};

export default ShowClasses;
