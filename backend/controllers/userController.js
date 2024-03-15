const { body, validationResult } = require("express-validator");
const { Pool } = require("pg");
const asyncHandler = require("express-async-handler");

const pool = new Pool();

exports.add_user_post = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    // Insert the user into the database
    const client = await pool.connect();
    const queryText =
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING user_id";
    const { rows } = await client.query(queryText, [username, password, email]);
    const userId = rows[0].user_id;

    // Release the client back to the pool
    client.release();

    res.status(201).json({ userId, message: "User added successfully" });
  }),
];
