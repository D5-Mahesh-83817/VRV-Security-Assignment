import axios from "axios";
import config from "../config";

// Get all properties
export async function getProperties() {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(`${config.url}/property/`, {
    headers: {
      token: token,
    },
  });

  return response.data;
}

// Get property details by ID
export async function getPropertyDetails(id) {
  const token = sessionStorage.getItem("token");
  console.log(1);
  const response = await axios.get(`${config.url}/property/details/${id}`, {
    headers: {
      token: token,
    },
  });
  console.log(response.data);
  return response.data;
}

//add new property
export async function addProperty(
  title,
  contactName,
  contactNo,
  address,
  rent,
  propertyType
) {
  const token = sessionStorage.getItem("token");

  const body = {
    title,
    details: "",
    address,
    contactNo,
    contactName,
    isLakeView: 0,
    isTV: 0,
    isAC: 0,
    isWifi: 0,
    isMiniBar: 0,
    isBreakfast: 0,
    isParking: 0,
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    rent,
    propertyType,
  };

  try {
    const response = await axios.post(`${config.url}/property/`, body, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding property:", error.message);
    throw error;
  }
}

// Update a property
export async function updateProperty(token, property) {
  // console.log(id, title, contactName, contactNo, address, rent, propertyType);

  const response = await axios.put(
    `${config.url}/property/${property.id}`,
    property,
    {
      headers: {
        token: token,
      },
    }
  );
  console.log(response.data);
  return response.data;
}

// Delete a property
export async function deleteProperty(id) {
  const token = sessionStorage.getItem("token");
  const response = await axios.delete(`${config.url}/property/${id}`, {
    headers: {
      token: token,
    },
  });
  return response.data;
}

// Assign a manager to a property
export async function assignManager(propertyId, managerId) {
  const token = sessionStorage.getItem("token");

  const body = {
    managerId,
  };

  const response = await axios.put(
    `${config.url}/property/assign-manager/${propertyId}`,
    body,
    {
      headers: {
        token: token,
      },
    }
  );
  return response.data;
}
