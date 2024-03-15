const { body, validationResult } = require("express-validator");
const { Pool } = require("pg");
const asyncHandler = require("express-async-handler");

const pool = new Pool();

exports.add_goal_post = [
  body("goalName").trim().notEmpty().withMessage("Goal name is required"),
  body("goalDescription")
    .trim()
    .notEmpty()
    .withMessage("Goal description is required"),
  body("targetValue").isNumeric().withMessage("Target value must be a number"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;
    const { goalName, goalDescription, targetValue } = req.body;

    // Insert the goal into the database
    const client = await pool.connect();
    const queryText =
      "INSERT INTO goals (goal_name, goal_description, target_value) VALUES ($1, $2, $3) RETURNING goal_id";
    const { rows } = await client.query(queryText, [
      goalName,
      goalDescription,
      targetValue,
    ]);
    const goalId = rows[0].goal_id;

    // Associate the goal with the user
    await client.query(
      "INSERT INTO user_goals (user_id, goal_id) VALUES ($1, $2)",
      [userId, goalId]
    );

    // Release the client back to the pool
    client.release();

    res.status(201).json({ message: "Goal added successfully" });
  }),
];
