import React from "react";
import "./App.css";

//App-Html-ReactJS-Events.jsx

//https://www.w3schools.com/tags/ref_eventattributes.asp

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };
  const handleChange = (e) => {
    console.log(e);
    console.log("Input changed:", e.target.value);
  };
  const handleMouseOver = () => console.log("Mouse over!");
  const handleKeyDown = (e) => console.log("Key pressed:", e.key);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e); // Logs the value as user types
    //FormData is a built-in JavaScript object that makes it easy to collect form data
    //and send it to a server,
    // Option 1: Using FormData
    const formData = new FormData(e.target);
    const name = formData.get("name"); // "name" is input's name attribute
    const age = formData.get("age"); // "age" is input's name attribute
    console.log("Input value using FormData:", name, age);
    //-----------------------
    const user1 = {
      name: formData.get("name"),
      age: formData.get("age"),
    };

    console.log(user1);
    //-----------------------
    const formData1 = new FormData(e.target);
    const user2 = Object.fromEntries(formData1.entries());
    console.log(user2);
    //-----------------------

    // Option 2: Using e.target.elements
    const name2 = e.target.elements.name.value;
    const age2 = e.target.elements.age.value;
    console.log("Input value using elements:", name2, age2);

    //alert(`Hello, ${name}`);
    //-------------- Loop thru all elements in the form -------------------
    console.log(e);
    const elements = e.target.elements;
    const formDataNew = {};

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (el.name) {
        formDataNew[el.name] = el.value;
      }
    }
    console.log("Form Data:", formDataNew);
    //alert(JSON.stringify(formDataNew, null, 2));
    console.log(JSON.stringify(formDataNew));
    console.log(JSON.stringify(formDataNew, null, 2));
    /*
    JSON.stringify(formDataNew, null, 2)
    formDataNew → The object being converted to JSON.
    null → Don't filter or modify any properties. Include them all.
    2 → Indent each level by 2 spaces.
    */
    const student = {
      name: "John",
      age: 22,
      city: "Hyderabad",
    };

    const json = JSON.stringify(
      student,
      (key, value) => {
        if (key === "age") {
          return 25; // Modify age
        }
        return value;
      },
      2,
    );

    console.log(json);
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f4f7fa",
        borderRadius: "12px",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        margin: "40px auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>React Events Demo</h2>

      {/* onClick */}
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Click Me
      </button>

      {/* onChange */}
      <input
        type="text"
        onChange={handleChange}
        placeholder="Type something"
        style={{
          padding: "10px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "6px",
          marginBottom: "15px",
        }}
      />

      {/* onMouseOver */}
      <div
        onMouseOver={handleMouseOver}
        style={{
          padding: "10px",
          backgroundColor: "#e9ecef",
          borderRadius: "6px",
          marginBottom: "15px",
          textAlign: "center",
          cursor: "default",
        }}
      >
        Hover over this text
      </div>

      {/* onKeyDown */}
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Press a key"
        style={{
          padding: "10px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "6px",
          marginBottom: "15px",
        }}
      />

      {/* onSubmit */}
      <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        />
        <input
          type="number"
          name="age"
          placeholder="Your age"
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      <div
        onTouchStart={() => console.log("Touch started")}
        onTouchMove={() => console.log("Touch moving")}
        onTouchEnd={() => console.log("Touch ended")}
        style={{
          padding: "20px",
          backgroundColor: "#ffeeba",
          textAlign: "center",
          borderRadius: "6px",
          marginTop: "15px",
          border: "1px solid #f0ad4e",
        }}
      >
        Touch this area on a mobile device
      </div>
    </div>
  );
}

export default App;
/*
FormData:
---------
//https://developer.mozilla.org/en-US/docs/Web/API/FormData
It’s a special object built into the browser.
Doesn’t look like a plain JS object — you use methods to read it:
.get(name) → get a single field
.getAll(name) → get multiple values (checkboxes, multi-selects)
.entries() → iterate over all fields
Commonly used for:
Sending form data via fetch/axios (body: formData)
Uploading files

https://www.w3schools.com/jsref/prop_pushbutton_type.asp
*/
