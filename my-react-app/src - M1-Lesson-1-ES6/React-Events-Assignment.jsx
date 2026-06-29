import React, { useState } from "react";
import "./App.css";

function App() {
    // state for click counter
    const [count, setCount] = useState(0);

    // state for form inputs
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        agree: false,
    });

    // 1. Button click counter
    const handleCounterClick = () => {
        setCount(count + 1);
    };

    // 2. Input validation
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            if (name === "name" && value.length > 10) {
                alert("Maximum 10 characters allowed");
                return;
            }
            setFormData({ ...formData, [name]: value });
        }

        console.log(`${name} changed:`, value);
    };

    // 3. MouseOver color change
    const [hovered, setHovered] = useState(false);

    // 4. Key Press Logger
    const handleKeyDown = (e) => {
        console.log("Key pressed:", e.key);
        if (e.key === "Enter") {
            alert("Enter key pressed!");
        }
    };

    // 5. Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            `Form Submitted:\nName: ${formData.name}\nAge: ${formData.age}\nEmail: ${formData.email}\nAgree: ${formData.agree}`
        );

        console.log("Form Data:", formData);

        // reset form
        setFormData({ name: "", age: "", email: "", agree: false });
    };

    // 6. Mobile touch events
    const [touchActive, setTouchActive] = useState(false);

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
            <h2 style={{ textAlign: "center", color: "#333" }}>
                React Events Assignment
            </h2>

            {/* 1. Button Click Counter */}
            <button
                onClick={handleCounterClick}
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
                Click Counter ({count})
            </button>

            {/* 2. Input Validation */}
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type your name (max 10 chars)"
                style={{
                    padding: "10px",
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    marginBottom: "15px",
                }}
            />

            {/* 3. MouseOver */}
            <div
                onMouseOver={() => setHovered(true)}
                onMouseOut={() => setHovered(false)}
                style={{
                    padding: "10px",
                    backgroundColor: hovered ? "#90ee90" : "#e9ecef",
                    borderRadius: "6px",
                    marginBottom: "15px",
                    textAlign: "center",
                    cursor: "default",
                }}
            >
                Hover over this text
            </div>

            {/* 4. Key Press Logger */}
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

            {/* 5. Form with email and checkbox */}
            <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Your age"
                    style={{
                        padding: "10px",
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        marginBottom: "10px",
                    }}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    style={{
                        padding: "10px",
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        marginBottom: "10px",
                    }}
                />
                <label style={{ display: "block", marginBottom: "10px" }}>
                    <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        style={{ marginRight: "5px" }}
                    />
                    I agree to the terms
                </label>
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

            {/* 6. Touch Events */}
            <div
                onTouchStart={() => {
                    setTouchActive(true);
                    console.log("Touch started");
                }}
                onTouchMove={() => console.log("Touch moving")}
                onTouchEnd={() => {
                    setTouchActive(false);
                    console.log("Touch ended");
                }}
                style={{
                    padding: "20px",
                    backgroundColor: touchActive ? "#ffb347" : "#ffeeba",
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
