import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  Box,
  Grid,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { toast } from "react-toastify";
import { updateUser } from "../services/user";

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

function EditUserForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(state.user || {});
  const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser(token, user);
    if (result.status === "success") {
      toast.success("User updated successfully", {
        className: "custom-toast custom-toast-success",
        bodyClassName: "custom-toast-body",
      });
      navigate("/admin");
    } else {
      toast.error(result.message || "Failed to update user", {
        className: "custom-toast custom-toast-error",
        bodyClassName: "custom-toast-body",
      });
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
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              backgroundColor: "#002839",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                color: "#f0f9f9",
                fontFamily: "'Pacifico', sans-serif",
                paddingBottom: "2rem",
                letterSpacing: "1px",
              }}
            >
              Edit User
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  name="firstName"
                  value={user.firstName || ""}
                  onChange={handleChange}
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
                  label="Last Name"
                  name="lastName"
                  value={user.lastName || ""}
                  onChange={handleChange}
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
                  label="Email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
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
                  label="Phone"
                  name="phoneNumber"
                  value={user.phoneNumber || ""}
                  onChange={handleChange}
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
                  select
                  variant="outlined"
                  label="Role"
                  name="role"
                  value={user.role || ""}
                  onChange={handleChange}
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
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} container justifyContent="center" spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
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
                    Save Changes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate("/admin")}
                    sx={{
                      padding: "0.8rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#ff9800",
                      borderColor: "#ff9800",
                      "&:hover": {
                        backgroundColor: "#ff9800",
                        color: "#fff",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default EditUserForm;
