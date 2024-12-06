const express = require("express");
const db = require("../db");
const utils = require("../utils");
const router = express.Router();

// Add a new property
router.post("/", (request, response) => {
  const {
    title,
    details,
    address,
    contactNo,
    contactName,
    isLakeView,
    isTV,
    isAC,
    isWifi,
    isMiniBar,
    isBreakfast,
    isParking,
    guests,
    bedrooms,
    beds,
    bathrooms,
    rent,
    propertyType,
  } = request.body;

  const query = `
    INSERT INTO property (
      title, details, address, contactNo, contactName, isLakeView, isTV, 
      isAC, isWifi, isMiniBar, isBreakfast, isParking, guests, bedrooms, 
      beds, bathrooms, rent, propertyType
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  db.pool.execute(
    query,
    [
      title,
      details,
      address,
      contactNo,
      contactName,
      isLakeView,
      isTV,
      isAC,
      isWifi,
      isMiniBar,
      isBreakfast,
      isParking,
      guests,
      bedrooms,
      beds,
      bathrooms,
      rent,
      propertyType,
    ],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// Get all properties
router.get("/", (request, response) => {
  const query = `
    SELECT id, title, details, address, rent, propertyType, 
           managerId, contactNo, contactName
    FROM property;
  `;
  db.pool.query(query, (error, properties) => {
    response.send(utils.createResult(error, properties));
  });
});

// Get property details by ID
router.get("/details/:id", (request, response) => {
  const { id } = request.params;
  const query = `SELECT * FROM property WHERE id = ?;`;
  db.pool.query(query, [id], (error, properties) => {
    response.send(utils.createResult(error, properties[0]));
  });
});

// Update a property
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { title, address, contactNo, contactName, rent, propertyType } =
    request.body;
  console.log(title, address, contactNo, contactName, rent, propertyType);
  console.log(typeof rent, typeof contactNo, typeof propertyType);
  const query = `
    UPDATE property 
    SET title = ?, address = ?, contactNo = ?, contactName = ?, 
         rent = ?, propertyType = ?
    WHERE id = ?;
  `;
  db.pool.execute(
    query,
    [title, address, contactNo, contactName, rent, propertyType, id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// Delete a property
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  const query = `DELETE FROM property WHERE id = ?;`;
  db.pool.execute(query, [id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// Assign a manager to a property
router.put("/assign-manager/:id", (request, response) => {
  const { id } = request.params;
  const { managerId } = request.body;

  const query = `UPDATE property SET managerId = ? WHERE id = ?;`;
  db.pool.execute(query, [managerId, id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
