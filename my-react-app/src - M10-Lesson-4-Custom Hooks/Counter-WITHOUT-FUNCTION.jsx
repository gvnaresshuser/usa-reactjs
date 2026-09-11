import React, { useState } from "react";

//WITHOUT-FUNCTION

// Custom hook for storing and retrieving data from local storage
function useLocalStorage(key, initialValue) {
  // Retrieve stored value from local storage or use initialValue if not present
  const storedValue = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : initialValue;

  // State to hold the current value
  const [value, setValue] = useState(storedValue);

  // Update local storage and state whenever the value changes
  /*   const updateValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }; */
  const updateValue = (newValue) => {
    setValue((prev) => {
      const valueToStore =
        newValue instanceof Function ? newValue(prev) : newValue;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  //setCount(prev => prev + 1);
  //setCount(count + 1);//RISKY

  return [value, updateValue];
}

// Example usage of the custom hook
function Counter() {
  const [count, setCount] = useLocalStorage("count", 0);
  //with simple useState
  //const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
    //setCount(count + 1);//RISKY
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
/*
             newValue
                |
        ┌───────┴────────┐
        |                |
    Is function?       Not function
        |                |
       YES               NO
        |                |
 newValue(prev)       newValue
        |                |
        └───────┬────────┘
                ↓
          valueToStore
                ↓
          localStorage

So the key reason is:

We check whether the caller gave us a value or an updater function, 
so our custom setter can support both React-style forms.          
*/
