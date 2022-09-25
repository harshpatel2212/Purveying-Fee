import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { server } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";
import courses from "../images/courses.png";
import { useNavigate } from "react-router-dom";

const ShowClasses = () => {
  const navigate = useNavigate();
  const { data: ngoData } = useGlobalContext();
  const [error, setError] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(ngoData.ngo) > 0) {
      navigate("/ngo-dashboard");
    }
    fetch(
      server + `/search_classes?city=${ngoData.city}&state=${ngoData.state}`,
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
          setClasses(response.data);
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

        {classes.map((c) => (
          <Grid key={c} item xs={4}>
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
    </>
  );
};

export default ShowClasses;
