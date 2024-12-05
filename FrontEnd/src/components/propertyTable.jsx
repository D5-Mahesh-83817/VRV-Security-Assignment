import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProperties, deleteProperty } from "../services/property";
import { toast } from "react-toastify";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function PropertyTable() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const result = await getProperties(token);
        if (result.status === "success") {
          setProperties(result.data || []);
        } else {
          toast.error("Failed to fetch properties data");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("An error occurred while fetching properties");
      }
    };

    fetchProperties();
  }, [token]);

  const handleDelete = async (propertyId) => {
    if (role !== "Admin") {
      toast.error(
        "Restricted action: You do not have permission to delete records."
      );
      return;
    }

    try {
      const result = await deleteProperty(propertyId);
      if (result.status === "success") {
        setProperties(
          properties.filter((property) => property.id !== propertyId)
        );
        toast.success("Property deleted successfully.");
      } else {
        toast.error(result.message || "Failed to delete property.");
      }
    } catch (error) {
      toast.error("Error deleting property.");
    }
  };

  return (
    <div className="container">
      <Table className="shadow-lg border border-gray-300 ">
        <TableHead sx={{ backgroundColor: "#002839" }}>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Address
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Rent
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Property Type
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Contact Number
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Manager Assigned
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Edit
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property, index) => (
            <TableRow
              key={property.id}
              className="hover:bg-gray-100"
              sx={{
                backgroundColor: index % 2 === 0 ? "#eaf9ff" : "transparent",
              }}
            >
              <TableCell sx={{ textAlign: "center" }}>
                {property.title}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {property.address}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {property.rent}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {property.propertyType}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {property.contactNo}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {property.managerId ? "Yes" : "No"}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: "0.6rem",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    borderColor: "#ff9800",
                    color: "#fff",
                    backgroundColor: "#ff9800",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#ff9800",
                    },
                  }}
                  onClick={() =>
                    navigate(`/admin/property/edit/${property.id}`, {
                      state: { property },
                    })
                  }
                >
                  Update
                </Button>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  sx={{
                    padding: "0.6rem",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    borderColor: "#f44336",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#f44336",
                    },
                  }}
                  onClick={() => handleDelete(property.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop: "1rem",
          padding: "1rem",
          fontSize: "1rem",
          fontWeight: "bold",
          backgroundColor: "#ff9800",
          color: "#fff",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#e68900",
          },
        }}
        onClick={() => navigate("/admin/property/add")}
      >
        Add New Property
      </Button>
    </div>
  );
}

export default PropertyTable;
