import React from 'react';
import './App.css';
import UserCard from './UserCard.jsx';
import { add } from './utils.js';

//CALLING Person CLASS FROM utils.js
import { Person } from './utils.js';
import UserCardAssignment from './UserCardAssignment.jsx';
const user = new Person("Bob");
console.log(user.greet()); // Hello, Bob
//CALLING Person CLASS FROM utils.js

// Array and map (ES6)
const users = [
  { name: 'Alice', age: 17 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 },
  { name: 'Tom', age: 15 },
];

// Arrow function & ternary operator (ES6)
const getAgeStatus = age => age >= 18 ? 'Adult' : 'Minor';

//const getAgeStatus = (age) => age >= 18 ? 'Adult' : 'Minor';
//const getAgeStatus = (age,another) => age >= 18 ? 'Adult' : 'Minor';

function App() {
  //const App = () => {
  return (
    <div style={{ marginLeft: '60px' }}>
      <h1>ES6 in React</h1>
      <p>hello</p>
      <p>15 + 13 = {add(15, 13)}</p>
      {/* <ul>
      {users.map((user, index) => (
        <li key={index} >{user.name}-{user.age}</li>
      ))}
      </ul> */}

      {/*  {users.map((user, index) => (
        <UserCard key={index} user={user} ageStatus={getAgeStatus(user.age)} /> 
      ))} */}

      {users.map((user, index) => (
        <UserCardAssignment key={index} user={user} ageStatus={getAgeStatus(user.age)} />
      ))}
    </div>
  );
};

export default App;
