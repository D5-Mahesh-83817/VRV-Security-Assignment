import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnauthorizedAccessPage = () => {
  const navigate = useNavigate();

  const handleGoBackHome = () => {
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    if (role === "Manager") {
      navigate("/manager");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
      <Box
        sx={{
          textAlign: "center",
          p: 5,
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Pacifico', cursive",
            fontSize: "4rem",
          }}
        >
          Unauthorized Access
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Pacifico', cursive",
            color: "#333",
            mt: 2,
            fontSize: "1.5rem",
          }}
        >
          Oops! You don't have permission to view this page.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            fontSize: "1.2rem",
            fontWeight: "bold",
            backgroundColor: "#f44336",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
          onClick={handleGoBackHome}
        >
          Go Back Home
        </Button>
      </Box>
    </div>
  );
};

export default UnauthorizedAccessPage;
