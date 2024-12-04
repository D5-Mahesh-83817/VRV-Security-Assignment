import React from "react";
import TopBar from "../components/topBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProperties } from "../services/property";
import { toast } from "react-toastify";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
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
  return (
    <div>
      <TopBar />
      <div className="p-4">
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
                  Owner Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  Book Now
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property, index) => (
                <TableRow
                  key={property.id}
                  className="hover:bg-gray-100"
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? "#eaf9ff" : "transparent",
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
                    {property.contactName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff9800",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#e68900",
                        },
                      }}
                      onClick={() =>
                        navigate(`/user/property/book/${property.id}`)
                      }
                    >
                      Book Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
