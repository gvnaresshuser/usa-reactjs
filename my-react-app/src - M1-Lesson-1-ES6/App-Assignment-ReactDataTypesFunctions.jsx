//App-Assignment-ReactDataTypesFunctions.jsx

// src/App.jsx
import React from "react";
import "./App.css";

// Task 3: Props & Reusability
const Welcome = ({ username }) => {
  return <h2>Hello, {username}! Welcome to React.</h2>;
};

// Task 1 & 2
const StudentInfo = () => {
  // Primitive data types
  const studentName = "John Doe"; // string
  const studentAge = 20; // number
  const isEnrolled = true; // boolean

  // Non-primitive data types
  const subjects = ["Math", "Science", "History"]; // array
  const student = {
    id: 101,
    name: "John Doe",
    email: "john.doe@example.com",
  }; // object

  // Functions
  const sayHello = () => {
    alert("Hello, Student!");
  };

  const showMessage = (msg) => {
    console.log("Message: " + msg);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Student Information</h1>

      {/* String & Number */}
      <p>
        <strong>Name:</strong> {studentName}
      </p>
      <p>
        <strong>Age:</strong> {studentAge}
      </p>

      {/* Boolean (conditional rendering) */}
      <p>
        <strong>Status:</strong> {isEnrolled ? "Enrolled" : "Not Enrolled"}
      </p>

      {/* Array */}
      <p>
        <strong>Subjects:</strong>
      </p>
      <ul>
        {subjects.map((sub, index) => (
          <li key={index}>{sub}</li>
        ))}
      </ul>

      {/* Object */}
      <p>
        <strong>Email:</strong> {student.email}
      </p>

      {/* Functions */}
      <button onClick={sayHello}>Say Hello</button>
      <button onClick={() => showMessage("Welcome to React")}>
        Show Message
      </button>
    </div>
  );
};

function App() {
  return (
    <div>
      <StudentInfo />

      <hr />

      <h1>Welcome Component Demo</h1>
      <Welcome username="Alice" />
      <Welcome username="Bob" />
    </div>
  );
}

export default App;
