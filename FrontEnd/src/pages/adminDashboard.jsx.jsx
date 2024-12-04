import React, { useState } from "react";
import { Box } from "@mui/material";
import TopBar from "../components/topBar";
import NavigationBar from "../components/navbar";
import UserTable from "../components/userTable";
import PropertyTable from "../components/propertyTable";
import ComingSoonPage from "../components/commingSoon";

const AdminDashboard = () => {
  const [activeContent, setActiveContent] = useState("user");

  const handleNavigation = (tabKey) => {
    setActiveContent(tabKey);
  };

  return (
    <div>
      <TopBar />
      <NavigationBar onNavigate={handleNavigation} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {activeContent === "user" && <UserTable />}
        {activeContent === "property" && <PropertyTable />}
        {activeContent === "stats" && <ComingSoonPage />}
        {activeContent === "manager" && <ComingSoonPage />}
      </Box>
    </div>
  );
};

export default AdminDashboard;
