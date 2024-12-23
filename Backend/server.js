"use strict";
// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// Set up express app
const app = express();
const port = 5500;

// Set up temporary folder for storing data
const tempFolder = path.join(__dirname, "temp");
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder); // Create the folder if it doesn't exist
}

// Path to store registration, feedback, and question data
const dataFilePath = path.join(tempFolder, "registrationData.json");
const feedbackFilePath = path.join(tempFolder, "feedbackData.json");
const questionFilePath = path.join(tempFolder, "questionData.json");

// Middleware to enable CORS and parse incoming JSON requests
app.use(cors());
app.use(bodyParser.json());

//************************
// REGISTRATION FORM
//************************

// POST route to handle registration
app.post("/register", (req, res) => {
  const { fullName, email, source } = req.body;

  // Prepare the registration data
  const registrationData = {
    fullName,
    email,
    source,
    timestamp: new Date().toISOString(),
  };

  // Read existing data from the registration JSON file
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    let storedData = [];

    if (!err && data) {
      storedData = JSON.parse(data); // Parse existing data
    }

    // Append new registration data
    storedData.push(registrationData);

    // Write the updated data back to the file
    fs.writeFile(
      dataFilePath,
      JSON.stringify(storedData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error saving registration data:", err);
          return res.status(500).json({
            message: "There was an error saving your registration data.",
          });
        }

        // Respond with success
        res.status(200).json({ message: "Registration successful!" });
      }
    );
  });
});

//************************
// FEEDBACK FORM
//************************

// POST route for feedback
app.post("/feedback", (req, res) => {
  const { name, email, feedback } = req.body;

  // Prepare the feedback data
  const feedbackData = {
    name,
    email,
    feedback,
    timestamp: new Date().toISOString(),
  };

  // Read existing data from the feedback JSON file
  fs.readFile(feedbackFilePath, "utf8", (err, data) => {
    let storedData = [];

    if (!err && data) {
      storedData = JSON.parse(data); // Parse existing data
    }

    // Append new feedback data
    storedData.push(feedbackData);

    // Write the updated data back to the file
    fs.writeFile(
      feedbackFilePath,
      JSON.stringify(storedData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error saving feedback data:", err);
          return res.status(500).json({
            message: "There was an error saving your feedback.",
          });
        }

        // Respond with success
        res.status(200).json({ message: "Feedback submitted successfully!" });
      }
    );
  });
});

//************************
// QUESTION FORM
//************************

// POST route for questions
app.post("/question", (req, res) => {
  const { question } = req.body;

  // Prepare the question data
  const questionData = {
    question,
    timestamp: new Date().toISOString(),
  };

  // Read existing data from the question JSON file
  fs.readFile(questionFilePath, "utf8", (err, data) => {
    let storedData = [];

    if (!err && data) {
      storedData = JSON.parse(data); // Parse existing data
    }

    // Append new question data
    storedData.push(questionData);

    // Write the updated data back to the file
    fs.writeFile(
      questionFilePath,
      JSON.stringify(storedData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error saving question data:", err);
          return res.status(500).json({
            message: "There was an error saving your question.",
          });
        }

        // Respond with success
        res.status(200).json({ message: "Question submitted successfully!" });
      }
    );
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
