import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProperty, getPropertyDetails } from "../services/property";
import { toast } from "react-toastify";
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

function EditProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState({
    title: "",
    contactName: "",
    address: "",
    contactNumber: "",
    rent: "",
    propertyType: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await getPropertyDetails(id);
        setProperty(data);
      } catch (error) {
        toast.error("Error fetching property details");
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const updateExistingProperty = async () => {
    if (
      !property.title ||
      !property.contactName ||
      !property.address ||
      !property.contactNumber ||
      !property.rent ||
      !property.propertyType
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await updateProperty(id, property);
      if (result.status === "success") {
        toast.success("Property updated successfully!");
        navigate("/propertyTable");
      } else {
        toast.error(result.error || "Error updating property");
      }
    } catch (error) {
      toast.error("An error occurred while updating the property");
      console.error("Error updating property:", error);
    } finally {
      setLoading(false);
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
            Edit Property
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Title"
                value={property.title}
                onChange={(e) =>
                  setProperty({ ...property, title: e.target.value })
                }
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
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
                value={property.contactName}
                onChange={(e) =>
                  setProperty({ ...property, contactName: e.target.value })
                }
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
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
                value={property.contactNumber}
                onChange={(e) =>
                  setProperty({ ...property, contactNumber: e.target.value })
                }
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
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
                value={property.address}
                onChange={(e) =>
                  setProperty({ ...property, address: e.target.value })
                }
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
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
                value={property.rent}
                onChange={(e) =>
                  setProperty({ ...property, rent: e.target.value })
                }
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
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
                value={property.propertyType}
                onChange={(e) =>
                  setProperty({ ...property, propertyType: e.target.value })
                }
                select
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#ccc" } }}
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
                onClick={updateExistingProperty}
                fullWidth
                disabled={loading}
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
                {loading ? "Updating..." : "Update Property"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default EditProperty;
