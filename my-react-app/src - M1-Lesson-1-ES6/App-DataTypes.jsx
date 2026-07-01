import React from 'react';
import './App.css';
//============= SASSY CSS ===================
//import './App.scss';
//SASSY CSS
//npm install -D sass-embedded
//============= SASSY CSS ===================

// Sample function to be used as a prop
const greetUser = () => {
  alert('Hello, welcome to React!');
};

function App() {
  // Primitive data types
  const name = "React Learner";         // string
  const age = 21;                       // number
  const isLoggedIn = false;             // boolean

  // Non-primitive data types
  const hobbies = ["Coding", "Reading", "Gaming"]; // array
  /*   hobbies.push("Hiking"); // Adding a new hobby
    hobbies[4] = "Traveling"; // Modifying an existing hobby
    //hobbies = ["Coding", "Reading", "Gaming"]; // Reassigning the array is not allowed as it's a constant
   */
  const user = {                       // object
    id: 1,
    email: "user@example.com",
    password: "securepassword"
  };

  const users = [
    { id: 1, name: "Alice", email: "user@example.com" },
    { id: 2, name: "Bob", email: "user1@example.com" }
  ];
  console.log(users);
  console.log(user);

  // Function type
  const handleClick = () => {
    console.log("Button clicked!");
  };

  const handleClickParams = (a) => {
    console.log("Button clicked! " + a);
  };


  // JSX (ReactNode) as a variable
  const welcomeMessage = <h2>Welcome to React JS!</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      <h1>React JS Data Types Demo</h1>

      {/* String */}
      <p><strong>Name:</strong> {name}</p>

      {/* Number */}
      <p><strong>Age:</strong> {age}</p>

      {/* Boolean (used in conditional rendering) */}
      <p>
        <strong>Status:</strong> {isLoggedIn ? "Logged In" : "Guest"}
      </p>

      {/* Array (using map) */}
      <p><strong>Hobbies:</strong></p>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <p><strong>Users:</strong></p>
      <ul>
        {users.map((x, index) => (
          <li key={index}>{x.id}-{x.name}-{x.email}</li>
        ))}
      </ul>

      {/* Object */}
      <p><strong>User Email:</strong> {user.password}</p>


      {/* Function */}
      <button onClick={handleClick}>Click Me</button>
      <button onClick={() => handleClick()}>Click Me 1</button>
      <button onClick={() => handleClickParams(20000)}>Click Me 2</button>

      {/* <button onClick={handleClickParams(200)}>Click Me</button> */}

      {/* JSX element as variable */}
      <div>{welcomeMessage}</div>

      {isLoggedIn && <p>Welcome back, {name}!</p>}

      {/* External function passed */}
      <button onClick={greetUser} style={{ marginTop: "10px" }}>
        Greet
      </button>
      <div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
