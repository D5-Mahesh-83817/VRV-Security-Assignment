import React from "react";
import TopBar from "../components/topBar";
import PropertyTable from "../components/propertyTable";

const ManagerDashboard = () => {
  return (
    <div>
      <TopBar />
      <div className="p-4">
        <PropertyTable />
      </div>
    </div>
  );
};

export default ManagerDashboard;
