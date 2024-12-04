const express = require("express");
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");

const router = express.Router();

// Route to register a user
router.post("/register", (request, response) => {
  const { firstName, lastName, email, password, phone, role } = request.body; // Added role
  const statement = `
    INSERT INTO user (firstName, lastName, email, password, phoneNumber, role) 
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  const encryptedPassword = String(crypto.SHA256(password));
  db.pool.execute(
    statement,
    [firstName, lastName, email, encryptedPassword, phone, role], // Added role to values
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// Route to login a user
router.post("/login", (request, response) => {
  const { email, password } = request.body;
  const statement = `
    SELECT id, firstName, lastName, phoneNumber, isDeleted, role 
    FROM user 
    WHERE email = ? AND password = ?;
  `;
  const encryptedPassword = String(crypto.SHA256(password));
  db.pool.query(statement, [email, encryptedPassword], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else {
      if (users.length === 0) {
        response.send(utils.createErrorResult("User does not exist"));
      } else {
        const user = users[0];
        if (user.isDeleted) {
          response.send(utils.createErrorResult("Your account is closed"));
        } else {
          // Create the payload with role
          const payload = { id: user.id, role: user.role }; // Added role to payload
          const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });
          const userData = {
            token,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role, // Added role in response
          };
          response.send(utils.createSuccessResult(userData));
        }
      }
    }
  });
});

router.get("/", (request, response) => {
  const statement = `
    SELECT id, firstName, lastName, email, phoneNumber, role, isDeleted 
    FROM user 
    WHERE isDeleted = 0;
  `;

  db.pool.query(statement, (error, users) => {
    if (error) {
      console.error("Database query failed:", error);
      response.status(500).send({ status: "error", message: error.message });
    } else {
      console.log("Query successful:", users);
      response.send(utils.createResult(null, users));
    }
  });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;

  // Validate inputs
  if (!firstName || !lastName || !email || !phoneNumber) {
    return res
      .status(400)
      .send({ status: "error", message: "All fields are required" });
  }

  const statement = `
    UPDATE user 
    SET firstName = ?, lastName = ?, email = ?, phoneNumber = ? 
    WHERE id = ?;
  `;

  db.pool.query(
    statement,
    [firstName, lastName, email, phoneNumber, id],
    (error, result) => {
      if (error) {
        console.error("Error updating user:", error);
        res
          .status(500)
          .send({ status: "error", message: "Failed to update user" });
      } else if (result.affectedRows === 0) {
        res.status(404).send({ status: "error", message: "User not found" });
      } else {
        res.send({ status: "success", message: "User updated successfully" });
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log("5");

  const statement = `DELETE FROM user WHERE id = ?`;

  db.pool.query(statement, [id], (error, result) => {
    if (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .send({ status: "error", message: "Failed to delete user" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ status: "error", message: "User not found" });
    } else {
      res.send({ status: "success", message: "User deleted successfully" });
    }
  });
});

module.exports = router;
