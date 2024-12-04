import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/user";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  Link as MuiLink,
  MenuItem,
} from "@mui/material";
import "@fontsource/pacifico";
import { toast } from "react-toastify";

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

function RegisterUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const onRegister = async () => {
    if (firstName.length === 0) {
      toast.warning("Please enter your first name", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else if (lastName.length === 0) {
      toast.warning("Please enter your last name", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else if (email.length === 0) {
      toast.warning("Please enter your email", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else if (phone.length === 0) {
      toast.warning("Please enter your phone number", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else if (phone.length !== 10) {
      toast.error("The phone number must be exactly 10 digits", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
      });
    } else if (password.length === 0) {
      toast.warning("Please enter your password", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else if (confirmPassword.length === 0) {
      toast.warning("Please re-enter your password", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else if (password !== confirmPassword) {
      toast.error("Password does not match", {
        className: "custom-toast custom-toast-error",
        bodyClassName: "custom-toast-body",
      });
    } else if (role.length === 0) {
      toast.warning("Please select a role", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else {
      const result = await register(
        firstName,
        lastName,
        email,
        phone,
        password,
        role
      );
      if (result["status"] === "success") {
        toast.success("Successfully registered a user", {
          className: "custom-toast custom-toast-success",
          bodyClassName: "custom-toast-body",
        });
        navigate("/login");
      } else {
        toast.error("Failed to register the user", {
          className: "custom-toast custom-toast-error",
          bodyClassName: "custom-toast-body",
        });
      }
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
              Register
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: "1rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                  onClick={onRegister}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              align="center"
              sx={{ paddingTop: "1rem" }}
            >
              Already have an account?{" "}
              <MuiLink component={Link} to="/login" color="inherit">
                Login here
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterUser;
