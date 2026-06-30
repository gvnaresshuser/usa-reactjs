// All-in-one.jsx

import React from "react";
import { add } from "./utils"; // Named import with {}
import minus from "./utils"; // Default import without {}
import UserCardProps from "./UserCardProps";

function App() {
  //========== PROPS OBJECT ===========
  // User object
  const user = {
    name: "Alice",
    age: 25,
  };

  // Arrow function with ternary operator
  const getAgeStatus = (age) => (age >= 18 ? "Adult" : "Minor");
  //========== PROPS OBJECT ===========
  // ============================
  // let and const
  // ============================
  let city = "Hyderabad";
  city = "Bengaluru";

  const trainer = "GV Naressh";

  // ============================
  // Arrow Function
  // ============================
  const square = (num) => num * num;

  // ============================
  // Template Literals
  // ============================
  const message = `Hello ${trainer}.Welcome to ${city}!`;
  const message1 = `Hello ${trainer}.
This is for testing.
Welcome to ${city}!`;

  // ============================
  // Destructuring - Array
  // ============================
  const colors = ["Red", "Green", "Blue"];

  const [firstColor, secondColor, thirdColor] = colors;

  // ============================
  // Destructuring - Object
  // ============================
  const student = {
    name: "John",
    age: 22,
    course: "ReactJS",
  };

  const { name, age, course } = student;

  // ============================
  // Spread Operator
  // ============================
  const numbers = [10, 20, 30];

  const newNumbers = [...numbers, 40, 50];

  const employee = {
    id: 101,
    designation: "Developer",
  };

  const newEmployee = {
    ...employee,
    salary: 75000,
  };

  // ============================
  // Rest Operator
  // ============================
  const total = (...nums) => {
    return nums.reduce((sum, num) => sum + num, 0);
  };

  // ============================
  // Promise
  // ============================
  const promiseExample = () => {
    //RESOLVE
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promise Completed Successfully");
      }, 1000);
    });

    promise.then((result) => {
      alert(result);
    });
  };
  //----------------------------
  /*   const promiseExample = () => {//REJECT
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Something went wrong!");
      }, 1000);
    });

    promise
      .then((result) => {
        alert(result);
      })
      .catch((error) => {
        alert(error);
      });
  }; */
  //--------------------------------
  /* const promiseExample = () => {
    //RESOLVE / REJECT
    const promise = new Promise((resolve, reject) => {
      const isSuccess = true; // Change to false

      setTimeout(() => {
        if (isSuccess) {
          resolve("Promise Completed Successfully");
        } else {
          reject("Promise Failed!");
        }
      }, 1000);
    });

    promise
      .then((result) => {
        alert(result);
      })
      .catch((error) => {
        alert(error);
      });
  }; */
  //------------------------------

  // ============================
  // Async / Await
  // ============================
  const asyncExample = async () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data received using Async/Await");
      }, 1000);
    });

    const result = await promise;

    alert(result);
  };

  return (
    <div style={{ margin: "30px" }}>
      <h1>ES6 Features in React</h1>

      <h2>let & const</h2>
      <p>City : {city}</p>
      <p>Trainer : {trainer}</p>

      <h2>Arrow Function</h2>
      <p>Square of 8 : {square(8)}</p>

      <h2>Template Literals</h2>
      <p>{message}</p>

      <h2>Destructuring - Array</h2>
      <p>{firstColor}</p>
      <p>{secondColor}</p>
      <p>{thirdColor}</p>

      <h2>Destructuring - Object</h2>
      <p>Name : {name}</p>
      <p>Age : {age}</p>
      <p>Course : {course}</p>

      <h2>Spread Operator</h2>
      <p>{JSON.stringify(newNumbers)}</p>
      <p>{JSON.stringify(newEmployee, null, 2)}</p>

      <h2>Rest Operator</h2>
      <p>Total : {total(10, 20, 30, 40, 50)}</p>

      <h2>Modules (Import/Export)</h2>
      <p>10 + 20 = {add(10, 20)}</p>
      <p>10 - 20 = {minus(10, 20)}</p>

      <h2>Promises</h2>
      <button onClick={promiseExample}>Run Promise Example</button>

      <br />
      <br />

      <h2>Async / Await</h2>
      <button onClick={asyncExample}>Run Async/Await Example</button>
      <p style={{ whiteSpace: "pre-line" }}>{message1}</p>

      <p>UserCardProps</p>
      <UserCardProps user={user} ageStatus={getAgeStatus(user.age)} />
    </div>
  );
}

export default App;
