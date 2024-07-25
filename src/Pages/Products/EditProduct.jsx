import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../../firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";

const EditProduct = ({ cid, closeEvent }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "cameraList");

  useEffect(() => {
    if (cid) {
      console.log("CID:" + cid.id);
      setName(cid.name);
      setLocation(cid.location);
      setStatus(cid.status);
    }
  }, [cid]);

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const locationChange = (event) => {
    setLocation(event.target.value);
  };

  const statusChange = (event) => {
    setStatus(event.target.value);
  };

  const addCam = async () => {
    const userDoc = doc(db, "cameraList", cid.id);
    const newFields = {
      name: name,
      location: location,
      status: status,
    };
    await updateDoc(userDoc, newFields);
    getCam();
    closeEvent();
    Swal.fire("Submitted!", "Your Camera Has been Updated", "success");
  };

  const getCam = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Product
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
            id="outlined-basic"
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
            id="outlined-basic"
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
            id="outlined-basic"
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

export default EditProduct;
