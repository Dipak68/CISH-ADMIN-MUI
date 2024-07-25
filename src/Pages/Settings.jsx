import { Box, Card, CardContent } from "@mui/material";
import React from "react";
import Sidenav from "../Components/Sidenav";
import Navbar from "../Components/Navbar";
import Lists from "../settings/List";

const Settings = () => {
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Card>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Lists />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Settings;
