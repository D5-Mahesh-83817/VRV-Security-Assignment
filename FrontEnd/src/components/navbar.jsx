import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff9800",
    },
    background: {
      default: "#002839",
    },
  },
});

const NavigationBar = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("user");

  const tabs = [
    { label: "User Management", key: "user" },
    { label: "Property Management", key: "property" },
    { label: "Manager Management", key: "manager" },
    { label: "Statistics", key: "stats" },
  ];

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    onNavigate(tabKey);
  };

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#002839",
            borderRadius: "26px",
            padding: "0.5rem",
            overflow: "hidden",
            marginTop: "14px",
          }}
        >
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              sx={{
                flex: 1,
                color: activeTab === tab.key ? "#ffffff" : "#b0c4cc",
                backgroundColor:
                  activeTab === tab.key ? "#ff9800" : "transparent",
                borderRadius: "26px",
                padding: "0.5rem 1rem",
                fontWeight: activeTab === tab.key ? "bold" : "normal",
                fontSize: "1rem",
                textTransform: "capitalize",
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  backgroundColor:
                    activeTab === tab.key ? "#e68900" : "#00444f",
                  color: "#ffffff",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: activeTab === tab.key ? "#ffffff" : "#b0c4cc",
                }}
              >
                {tab.label}
              </Typography>
            </Button>
          ))}
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default NavigationBar;
