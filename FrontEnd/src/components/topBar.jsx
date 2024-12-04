import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import "@fontsource/pacifico";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const name = sessionStorage.getItem("name");
  const role = sessionStorage.getItem("role");

  const onLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ff9800",
        padding: "0.5rem 1rem",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Project Name */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Pacifico', cursive",
            color: "#002839",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          RBAC Project
        </Typography>

        {/* Welcome Message */}
        <Box>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "#002839",
              marginRight: "1rem",
              fontSize: "20px",
            }}
          >
            Welcome,{" "}
            <span className="text-yellow-400 font-semibold">{name}</span> (
            {role})
          </Typography>
        </Box>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="contained"
          sx={{
            backgroundColor: "#002839",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#004d6b" },
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
