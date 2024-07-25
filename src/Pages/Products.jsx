import React from "react";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";
import Sidenav from "../Components/Sidenav";
import ProductsList from "./Products/ProductList";


const Products = () => {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <ProductsList/>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Products;
