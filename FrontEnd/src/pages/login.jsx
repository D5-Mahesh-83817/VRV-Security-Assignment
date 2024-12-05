import React, { useState } from "react";
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
} from "@mui/material";
import "@fontsource/pacifico";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/user";

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

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async () => {
    if (!email) {
      toast.warning("Please enter your email", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else if (!password) {
      toast.warning("Please enter your password", {
        className: "custom-toast custom-toast-warning",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    } else {
      try {
        const result = await login(email, password);
        if (result.status === "success") {
          const { token, name, role, isActive } = result.data;

          if (!isActive) {
            toast.error("Your account is inactive. Please contact support.", {
              className: "custom-toast custom-toast-error",
              bodyClassName: "custom-toast-body",
            });
            return;
          }

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("isActive", isActive);

          if (role === "Admin") {
            navigate("/admin");
          } else if (role === "Manager") {
            navigate("/manager");
          } else {
            navigate("/home");
          }

          toast.success(`Welcome, ${name}`, {
            className: "custom-toast custom-toast-success",
            bodyClassName: "custom-toast-body",
          });
        } else {
          toast.error("Invalid email or password", {
            className: "custom-toast custom-toast-error",
            bodyClassName: "custom-toast-body",
          });
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", {
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
        <Container component="main" maxWidth="xs">
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
              Login
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address"
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onLogin}
                  sx={{
                    padding: "0.8rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    backgroundColor: "#ff9800",
                    color: "#002839",
                    "&:hover": {
                      backgroundColor: "#e68900",
                      color: "#ffffff",
                    },
                  }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: "#fff" }}
                >
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    style={{ color: "#ff9800", textDecoration: "none" }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginUser;
