import React from "react";

function App() {
    // 1. onClick
    const handleClick = () => {
        alert("Welcome to React Events!");
        console.log("Button was clicked");
    };

    // 2. onChange
    const handleChange = (e) => {
        const upper = e.target.value.toUpperCase();
        console.log("Input in uppercase:", upper);
    };

    // 3. onMouseOver
    const handleMouseOver = () => {
        console.log("Mouse entered");
    };
    const handleMouseOut = () => {
        console.log("Mouse left");
    };

    // 4. onKeyDown
    const handleKeyDown = (e) => {
        console.log("Key pressed:", e.key);
        if (e.key === " ") {
            alert("You pressed SPACE!");
        }
    };

    // 5. onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const age = Number(formData.get("age"));

        alert(`Hi ${name}, age ${age}`);
        if (age < 18) {
            console.log("Minor detected");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Segoe UI" }}>
            <h2>React Events (Modified)</h2>

            {/* 1. onClick */}
            <button onClick={handleClick} style={{ marginBottom: "10px" }}>
                Click Me
            </button>

            {/* 2. onChange */}
            <input
                type="text"
                onChange={handleChange}
                placeholder="Type here"
                style={{ marginBottom: "10px", display: "block" }}
            />

            {/* 3. onMouseOver */}
            <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={{
                    padding: "10px",
                    backgroundColor: "#eee",
                    marginBottom: "10px",
                    textAlign: "center",
                }}
            >
                Hover on me
            </div>

            {/* 4. onKeyDown */}
            <input
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Press a key"
                style={{ marginBottom: "10px", display: "block" }}
            />

            {/* 5. onSubmit */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    style={{ marginBottom: "10px", display: "block" }}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Your age"
                    style={{ marginBottom: "10px", display: "block" }}
                />
                <button type="submit">Submit</button>
            </form>

            {/* 6. Touch Events */}
            <div
                onTouchStart={() => console.log("Finger down")}
                onTouchMove={() => console.log("Finger moving")}
                onTouchEnd={() => console.log("Finger lifted")}
                style={{
                    padding: "20px",
                    backgroundColor: "#ffeeba",
                    textAlign: "center",
                    marginTop: "15px",
                }}
            >
                Touch me on mobile
            </div>
        </div>
    );
}

export default App;
