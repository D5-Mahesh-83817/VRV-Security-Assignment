import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../services/user";
import { toast } from "react-toastify";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function UserTable() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        toast.error("You are not authorized. Please login.");
        navigate("/login");
        return;
      }

      const result = await getAllUsers(token);
      if (result.status === "success") {
        setUsers(result.data);
      } else {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUsers();
  }, [token, navigate]);

  const handleDelete = async (userId) => {
    if (role !== "Admin") {
      toast.error(
        "Restricted action: You do not have permission to delete records."
      );
      return;
    }

    const result = await deleteUser(token, userId);

    if (result.status === "success") {
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  };

  const toggleStatus = async (userId, isActive) => {
    const newStatus = !isActive;
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: newStatus } : user
      )
    );
    toast.success(
      `User ${newStatus ? "activated" : "deactivated"} successfully.`
    );
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
              ID
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              First Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Last Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Phone
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Role
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Status
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
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-100"
              sx={{
                backgroundColor: index % 2 === 0 ? "#eaf9ff" : "transparent",
              }}
            >
              <TableCell sx={{ textAlign: "center" }}>{user.id}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {user.firstName}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {user.lastName}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {user.phoneNumber}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>{user.role}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color={user.isActive ? "error" : "success"}
                  fullWidth
                  sx={{
                    padding: "0.6rem",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    borderColor: "#002839",
                    backgroundColor: user.isActive ? "#ff9800" : "#002839",
                    color: user.isActive ? "#002839" : "#ff9800",
                    "&:hover": {
                      backgroundColor: user.isActive ? "#f44336" : "#006a4e",
                      color: "#fff",
                    },
                  }}
                  onClick={() => toggleStatus(user.id, user.isActive)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </Button>
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
                    navigate(`/edit/${user.id}`, { state: { user } })
                  }
                >
                  Edit
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
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;
