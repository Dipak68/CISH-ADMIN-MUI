import React from "react";
import Sidenav from "../Components/Sidenav";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import "../DashBoard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccordionDash from "../Components/AccordionDash";
import BarChart from "../Charts/BarChart";

import CountUp from 'react-countup';

const Home = () => {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack spacing={2} direction={"row"}>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 150 }}
                    className="gradient"
                  >
                    <CardContent>
                      <div className="iconstyle">
                        <CreditCardIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        $<CountUp delay={0.4} end={500} duration={0.6} />
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Earnings
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 150 }}
                    className="gradientlight"
                  >
                    <CardContent>
                      <div className="iconstyle">
                        <LocalMallIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                         $<CountUp delay={0.4} end={900} duration={0.6} />
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card className="gradientlight">
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">$203k</span>
                        <br />
                        <span className="pricesubtitle">Tatal Incom</span>
                      </div>
                    </Stack>
                  </Card>
                  <Card>
                    <Stack spacing={2} direction="row">
                      <div className="iconstyleblack">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">$203k</span>
                        <br />
                        <span className="pricesubtitle">Tatal Incom</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>

            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: 70 + "vh" }}>
                  <CardContent>
                    <BarChart/>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={4}>
                <Card sx={{ height: 70 + "vh" }}>
                  <CardContent>
                    <div className="paddingall">
                      <span className="pricetitle">Popular Products</span>
                    </div>
                    <Box height={10}/>
                    <AccordionDash />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;
