"use strict";

// YEAR
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
console.log(currentYear);
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/

// Detect the scroll event and add a class to the navbar
window.onscroll = function () {
  var header = document.querySelector(".header");

  // Check if the page has been scrolled down
  if (window.scrollY > 0) {
    header.classList.add("scrolled"); // Add 'scrolled' class if scrolled
  } else {
    header.classList.remove("scrolled"); // Remove 'scrolled' class if at the top
  }
};
// TRANSITION TO ANsWER
// Select all question buttons
// const questionButtons = document.querySelectorAll(".question");

// // Add a click event listener to each question button
// questionButtons.forEach((button) => {
//   button.addEventListener("click", function () {
//     // Find the corresponding answer within the same faq-item
//     const answer = this.nextElementSibling;

//     // Toggle the 'show' class on the answer
//     if (answer.classList.contains("show")) {
//       answer.classList.remove("show");
//     } else {
//       answer.classList.add("show");
//     }
//   });
// });
// Select all question buttons
const questionButtons = document.querySelectorAll(".question");

// Add a click event listener to each question button
questionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Find the corresponding answer within the same faq-item
    const answer = this.nextElementSibling;
    const icon = this.querySelector("ion-icon");

    // Toggle the 'show' class on the answer and update the icon
    const isVisible = answer.classList.toggle("show");
    icon.setAttribute("name", isVisible ? "remove-outline" : "add-outline");
  });
});

//*************************************
// REGISTRATION FORM
//*************************************

// Get references to form elements
const form = document.getElementById("registration-form");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const sourceSelect = document.getElementById("select-where");

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form from submitting the traditional way

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const source = sourceSelect.value;

  // Data to send to the backend
  const data = { fullName, email, source };

  try {
    // Send data to backend API using Axios
    const response = await axios.post("http://localhost:5500/register", data);
    if (response.status === 200) {
      alert("Registration Successful");
      form.reset(); // Reset the form fields
    } else {
      alert("Error: " + response.data.message);
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("There was an error with your registration.");
  }
});

//*************************************
// FEEDBACK FORM
//*************************************

// Get references to form elements
// Declare constants for form and input elements
const feedbackForm = document.getElementById("feedback-form");
const nameInput = document.getElementById("name");
const feedbackEmail = document.getElementById("feedback-email");
const feedbackInput = document.getElementById("feedback");

// Handle form submission
feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Retrieve values from input fields
  const name = nameInput.value;
  const email = feedbackEmail.value;
  const feedback = feedbackInput.value;

  // Prepare the data to send to the backend
  const data = { name, email, feedback };

  try {
    // Send the data to the backend API using Axios
    const response = await axios.post("http://localhost:5500/feedback", data);

    // Check the response status and alert the user accordingly
    if (response.status === 200) {
      alert("Feedback Submitted Successfully");
      feedbackForm.reset(); // Reset the form fields after successful submission
    } else {
      alert("Error: " + response.data.message);
    }
  } catch (error) {
    console.error("Error during feedback submission:", error);
    alert("There was an error with your submission.");
  }
});

//*************************************
// QUESTIONS
//*************************************

const questionInput = document.getElementById("help-form");

helpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = questionInput.value;

  const data = { question };

  try {
    // Send the data to the backend API using Axios
    const response = await axios.post("http://localhost:5500/feedback", data);

    // Check the response status and alert the user accordingly
    if (response.status === 200) {
      alert("Feedback Submitted Successfully");
      feedbackForm.reset(); // Reset the form fields after successful submission
    } else {
      alert("Error: " + response.data.message);
    }
  } catch (error) {
    console.error("Error during feedback submission:", error);
    alert("There was an error with your submission.");
  }
});
