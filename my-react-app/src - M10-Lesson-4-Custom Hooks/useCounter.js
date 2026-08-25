import { useState, useRef } from 'react';

function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    const initialRef = useRef(initialValue); // ✅ This always holds the original value


    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    //const reset = () => setCount(initialValue);
    const reset = () => setCount(initialRef.current); // ✅ use the ref, not the param directly


    return { count, increment, decrement, reset };
}

export default useCounter;
