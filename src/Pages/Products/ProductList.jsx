import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Modal,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { db } from "../../firebase-config";
import { useAppStore } from "../../appStore";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProductsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [camid, setCamid] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const empCollectionRef = collection(db, "cameraList");

  const fetchCameras = useCallback(async () => {
    try {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching data: ", error);
      Swal.fire("Error", "Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  }, [setRows]);

  useEffect(() => {
    fetchCameras();
  }, [fetchCameras]);

  const getCam = useCallback(async () => {
    setLoading(true);
    await fetchCameras();
  }, [fetchCameras]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteCam = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    try {
      const userDoc = doc(db, "cameraList", id);
      await deleteDoc(userDoc);
      Swal.fire("Deleted!", "Your Camera has been deleted.", "success");
      getCam();
    } catch (error) {
      console.error("Error deleting data: ", error);
      Swal.fire("Error", "Failed to delete data", "error");
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getCam();
    }
  };

  const editCam = (id, name, location, status) => {
    setCamid({ id, name, location, status });
    handleEditOpen();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddProduct closeEvent={handleClose} />
        </Box>
      </Modal>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditProduct closeEvent={handleEditClose} cid={camid} />
        </Box>
      </Modal>

      <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Products List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(v)}
            getOptionLabel={(row) => row.location || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Products" />
            )}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={handleOpen}
          >
            Add
          </Button>
        </Stack>
        <Box height={10} />
        {loading ? (
          <>
            <Skeleton variant="rectangular" width={"100%"} height={30} />
            <Box height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Box height={20} />
          </>
        ) : (
          <>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Name
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Location
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Status
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.location}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                editCam(row.id, row.name, row.location, row.status)
                              }
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteCam(row.id)}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </>
  );
}
