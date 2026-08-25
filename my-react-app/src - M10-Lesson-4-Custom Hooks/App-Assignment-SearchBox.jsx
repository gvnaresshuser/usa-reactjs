import React, { useState } from "react";
import useDebounce from "./hooks/useDebounce";
import './App.css';

//ASSIGNMENT - Create a search box that uses the useDebounce hook to delay the search input processing by 1 second.

function App() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 1000); // 1 second delay

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Search Box with Debounce</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <p>
        <strong>Immediate Value:</strong> {text}
      </p>
      <p>
        <strong>Debounced Value:</strong> {debouncedText}
      </p>
    </div>
  );
}

export default App;
