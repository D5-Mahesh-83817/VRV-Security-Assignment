import axios from "axios";
import config from "../config";

export async function register(
  firstName,
  lastName,
  email,
  phone,
  password,
  role
) {
  const body = {
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
  };

  const response = await axios.post(`${config.url}/user/register`, body);

  return response.data;
}

export async function login(email, password) {
  const body = {
    email,
    password,
  };

  const response = await axios.post(`${config.url}/user/login`, body);

  return response.data;
}

export async function getAllUsers(token) {
  try {
    const response = await axios.get(`${config.url}/user/`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { status: "error", message: "Failed to fetch user data" };
  }
}
export const updateUser = async (token, user) => {
  try {
    const response = await axios.put(
      `${config.url}/user/update/${user.id}`,
      user,
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return { status: "error", message: "Failed to update user" };
  }
};

export const deleteUser = async (token, userId) => {
  try {
    const response = await axios.delete(`${config.url}/user/delete/${userId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return { status: "error", message: "Failed to delete user" };
  }
};
