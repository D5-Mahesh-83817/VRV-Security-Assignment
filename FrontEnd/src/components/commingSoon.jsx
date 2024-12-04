import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ComingSoonPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
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
            color: "#ff9800",
          }}
        >
          Coming Soon
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
          Something exciting is on the way. Stay tuned!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            fontSize: "1.2rem",
            fontWeight: "bold",
            backgroundColor: "#ff9800",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#e68900",
            },
          }}
        >
          Notify Me
        </Button>
      </Box>
    </div>
  );
};

export default ComingSoonPage;
