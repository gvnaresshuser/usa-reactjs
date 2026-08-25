import React, { useState } from 'react';

// Custom hook for storing and retrieving data from local storage
function useLocalStorage(key, initialValue) {
    // Retrieve stored value from local storage or use initialValue if not present
    const storedValue = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialValue;

    // State to hold the current value
    const [value, setValue] = useState(storedValue);

    const updateValue = (newValue) => {
        setValue(prev => {
            const valueToStore = newValue instanceof Function ? newValue(prev) : newValue;
            localStorage.setItem(key, JSON.stringify(valueToStore));
            return valueToStore;
        });
    };

    return [value, updateValue];
}

// Example usage of the custom hook
function Counter() {
    const [value, updateValue] = useLocalStorage('count', 0);

    const increment = () => {
        //updateValue(prev => prev + 1);
        updateValue(value + 1);//RISKY
    };

    return (
        <div>
            <h2>Counter: {value}</h2>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default Counter;
