const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(cors());

// allows us access to req.body
app.use(express.json());

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
