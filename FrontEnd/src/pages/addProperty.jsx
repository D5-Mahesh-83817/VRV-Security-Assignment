import { useState } from "react";
import { addProperty } from "../services/property";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Grid,
  Button,
  MenuItem,
  Typography,
  ThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff9800",
    },
    background: {
      default: "#eaf9ff",
    },
  },
});

function AddProperty() {
  const [title, setTitle] = useState("");
  const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [rent, setRent] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const navigate = useNavigate();

  const addNewProperty = async () => {
    const result = await addProperty(
      title,
      contactName,
      contactNumber,
      address,
      rent,
      propertyType
    );
    if (result["status"] === "success") {
      toast.success("Property added successfully!");
      navigate("/home");
    } else {
      toast.error(result["error"]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#002839",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              color: "#f0f9f9",
              fontFamily: "'Pacifico', sans-serif",
              paddingBottom: "2rem",
              letterSpacing: "1px",
            }}
          >
            Add Property
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#ccc" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Contact Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#ccc" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Contact Number"
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#ccc" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#ccc" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Rent"
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#ccc" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Property Type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                select
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#ccc" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                  },
                }}
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={addNewProperty}
                fullWidth
                sx={{
                  padding: "0.8rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  backgroundColor: "#ff9800",
                  color: "#002839",
                  "&:hover": {
                    backgroundColor: "#e68900",
                    color: "#fff",
                  },
                }}
              >
                Add Property
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AddProperty;
