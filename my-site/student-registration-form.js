console.log("JavaScript Loaded Successfully");
// Button Click Event
function showMessage() {
  console.log("Button Clicked Successfully!");
  alert("Welcome to JavaScript!");
}

// Form Submit Event

document
  .getElementById("studentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    console.clear();

    console.log("========= STUDENT DETAILS =========");

    console.log("Student Name :", document.getElementById("studentName").value);
    console.log("Father Name  :", document.getElementById("fatherName").value);
    console.log("Mother Name  :", document.getElementById("motherName").value);
    console.log("Email        :", document.getElementById("email").value);
    console.log("Mobile       :", document.getElementById("mobile").value);
    console.log("Password     :", document.getElementById("password").value);
    console.log("DOB          :", document.getElementById("dob").value);
    console.log("Age          :", document.getElementById("age").value);
    console.log(
      "Qualification:",
      document.getElementById("qualification").value,
    );
    console.log("College      :", document.getElementById("college").value);
    console.log("Year Passing :", document.getElementById("yop").value);
    console.log("Percentage   :", document.getElementById("percentage").value);
    console.log("Address      :", document.getElementById("address").value);
    console.log("-----------------------------------");

    // Gender

    let gender = document.querySelector('input[name="gender"]:checked');

    if (gender) {
      console.log("Gender       :", gender.value);
    } else {
      console.log("Gender       : Not Selected");
    }

    // Courses

    let courses = document.querySelectorAll('input[name="course"]:checked');
    let selectedCourses = [];

    courses.forEach(function (course) {
      selectedCourses.push(course.value);
    });

    console.log("Courses      :", selectedCourses);

    // Batch

    let batch = document.querySelector('input[name="batch"]:checked');

    if (batch) {
      console.log("Preferred Batch :", batch.value);
    } else {
      console.log("Preferred Batch : Not Selected");
    }

    console.log("-----------------------------------");
    console.log("Registration Completed Successfully.");
    alert("Student Registered Successfully!");
  });
