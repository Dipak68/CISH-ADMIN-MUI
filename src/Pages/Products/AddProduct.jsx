import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {db} from "../../firebase-config"
import {collection,addDoc,getDocs} from "firebase/firestore"
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";
 

const AddProduct = ({ closeEvent }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  // const [rows, setRows] = useState([]);
  const setRows = useAppStore((state)=>state.setRows)
  const [status, setStatus] = useState("");
  const empCollectionRef = collection(db, "cameraList");

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const locationChange = (event) => {
    setLocation(event.target.value);
  };

  const statusChange = (event) => {
    setStatus(event.target.value);
  };

  const addCam = async() => {
    await addDoc(empCollectionRef,{
      name:name,
      location:location,
      status:status

    });
    getCam()
    closeEvent()
    Swal.fire("Submitted!","Your Camera Has been Added","success")
  };

  const getCam = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Product
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-baisc"
            label="Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={nameChange}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-baisc"
            label="Location"
            variant="outlined"
            size="small"
            value={location}
            onChange={locationChange}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-baisc"
            label="Status"
            variant="outlined"
            size="small"
            value={status}
            onChange={statusChange}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            <Button variant="contained" onClick={addCam}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};

export default AddProduct;
