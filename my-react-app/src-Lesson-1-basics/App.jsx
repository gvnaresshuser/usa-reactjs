import { useState, useEffect } from "react";

function FunctionalComponentLifecycleDemo() {
  console.log("1. Component Function Executed");

  const [count, setCount] = useState(0);

  // Equivalent to componentDidMount()
  useEffect(() => {
    console.log("2. Component Mounted");

    return () => {
      console.log("6. Component Will Unmount");
    };
  }, []);

  // Equivalent to componentDidUpdate()
  useEffect(() => {
    if (count !== 0) {
      console.log("5. Component Updated");
    }
  }, [count]);

  console.log("3. Rendering UI");

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Functional Component Lifecycle</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default FunctionalComponentLifecycleDemo;
