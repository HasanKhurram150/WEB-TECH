// index.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (if you have an HTML form on the frontend)
app.use(express.static("public"));

// Route to handle form submission
app.post("/register", (req, res) => {
  const { fullName, email, source } = req.body;

  if (!fullName || !email || !source) {
    return res.status(400).send("All fields are required.");
  }

  // Example: Save to a JSON file (you can connect to a database here)
  const formData = { fullName, email, source };

  fs.readFile("data.json", (err, data) => {
    let jsonData = [];
    if (!err && data) {
      jsonData = JSON.parse(data);
    }

    jsonData.push(formData);

    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving data.");
      }

      // Optionally, send an email or perform other actions

      res.status(200).send("Registration successful!");
    });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
