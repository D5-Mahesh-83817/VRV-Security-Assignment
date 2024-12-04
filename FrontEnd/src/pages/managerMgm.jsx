import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const ManagerManagement = () => {
  const [managers, setManagers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const managersData = await fetch("/api/managers").then((res) =>
        res.json()
      );
      const propertiesData = await fetch("/api/properties").then((res) =>
        res.json()
      );
      setManagers(managersData);
      setProperties(propertiesData);
    };
    fetchData();
  }, []);

  const assignManager = (managerId) => {
    console.log(
      "Assign Manager ID:",
      managerId,
      "to Property ID:",
      selectedProperty
    );
  };

  return (
    <div>
      <h1>Manager Management</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {managers.map((manager) => (
            <TableRow key={manager.id}>
              <TableCell>{manager.id}</TableCell>
              <TableCell>{manager.name}</TableCell>
              <TableCell>
                <Select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Property
                  </MenuItem>
                  {properties.map((property) => (
                    <MenuItem key={property.id} value={property.id}>
                      {property.name}
                    </MenuItem>
                  ))}
                </Select>
                <Button onClick={() => assignManager(manager.id)}>
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagerManagement;
