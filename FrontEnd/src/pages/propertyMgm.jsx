import React, { useState } from "react";

const PropertyManagement = () => {
  const [categories, setCategories] = useState([]);
  const [propertyName, setPropertyName] = useState("");
  const [category, setCategory] = useState("");

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const addProperty = () => {
    console.log("Property Name:", propertyName, "Category:", category);
  };

  return (
    <div>
      <h1>Property Management</h1>
      <input
        type="text"
        placeholder="New Category"
        onKeyDown={(e) => e.key === "Enter" && addCategory(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Property Name"
        value={propertyName}
        onChange={(e) => setPropertyName(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={addProperty}>Add Property</button>
    </div>
  );
};

export default PropertyManagement;
