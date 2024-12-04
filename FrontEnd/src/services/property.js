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
  const response = await axios.get(`${config.url}/property/details/${id}`, {
    headers: {
      token: token,
    },
  });
  return response.data;
}

// Add a new property
export async function addProperty(
  title,
  details,
  contactName,
  contactNo,
  address,
  rent,
  propertyType,
  managerId,
  profileImage
) {
  const token = sessionStorage.getItem("token");

  const body = {
    title,
    details,
    rent,
    address,
    contactNo,
    contactName,
    isLakeView: 0,
    isTV: 1,
    isAC: 1,
    isWifi: 1,
    isMiniBar: 0,
    isBreakfast: 1,
    isParking: 1,
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    propertyType,
    managerId,
    profileImage,
  };

  const response = await axios.post(`${config.url}/property`, body, {
    headers: {
      token,
    },
  });
  return response.data;
}

// Update a property
export async function updateProperty(
  id,
  title,
  details,
  contactName,
  contactNumber,
  address,
  rent,
  propertyType,
  managerId,
  profileImage,
  features
) {
  const token = sessionStorage.getItem("token");

  const body = {
    title,
    details,
    rent,
    address,
    contactNo: contactNumber,
    contactName,
    isLakeView: features?.isLakeView || 0,
    isTV: features?.isTV || 0,
    isAC: features?.isAC || 0,
    isWifi: features?.isWifi || 0,
    isMiniBar: features?.isMiniBar || 0,
    isBreakfast: features?.isBreakfast || 0,
    isParking: features?.isParking || 0,
    guests: features?.guests || 1,
    bedrooms: features?.bedrooms || 1,
    beds: features?.beds || 1,
    bathrooms: features?.bathrooms || 1,
    propertyType,
    managerId,
    profileImage,
  };

  const response = await axios.put(`${config.url}/property/${id}`, body, {
    headers: {
      token,
    },
  });
  return response.data;
}

// Delete a property
export async function deleteProperty(id) {
  const token = sessionStorage.getItem("token");
  const response = await axios.delete(`${config.url}/property/${id}`, {
    headers: {
      token,
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
        token,
      },
    }
  );
  return response.data;
}
