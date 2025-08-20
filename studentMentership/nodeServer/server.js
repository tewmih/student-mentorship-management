const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
// app.use(); // allow cross-origin requests

const PORT = 3000;
app.get("/test", (req, res) => {
  res.json({ message: "Welcome to the Student API" });
});

// Route to get all students
app.get("/students", (req, res) => {
  fs.readFile("./students.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read students file" });
    }
    res.json(JSON.parse(data));
  });
});
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
