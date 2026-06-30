//App-TemplateLiterals.jsx

import React from "react";
import "./App.css";

function App() {
  // Initial user array
  const users = [
    {
      id: 1,
      email: `user@example.com`,
    },
  ];

  // Add another user using template literals
  const newId = 2;
  const newEmail = `user${newId}@example.com`;

  users.push({
    id: newId,
    email: `${newEmail}`, //BACKTICKS USED HERE NOT SINGLE QUOTES
  });

  // Add another user again
  const anotherId = 3;
  const anotherEmail = `user${anotherId}@example.com`;

  users.push({
    id: anotherId,
    email: `${anotherEmail}`,
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>React JS - Template Literals</h1>

      <h2>User List</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {users.map((user) => (
          <li key={user.id}>
            <strong>ID:</strong> {user.id} <br />
            <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
