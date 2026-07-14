import React, { useState, useEffect } from 'react';

//USE EFFECT HOOK EXAMPLE
// This component demonstrates a simple timer using the useEffect hook
const Timer = () => {
    const [count, setCount] = useState(0);

    // Event handler to increment count
    const incrementCount = () => {
        //setCount(count + 1);//RISKY'
        setCount(prevCount => prevCount + 1); // safer way to update state based on previous value
    };

    //-----------------1111111111111111------------------------
   /*  useEffect(() => {
        console.log('useEffect called : ' + count);       
    //}, []);
    }, [count]); */

    //------------------22222222222222-----------------------

    // useEffect runs after the component renders
    useEffect(() => {
        console.log('Component mounted or count updated');

        const timer = setInterval(() => {            
            setCount(prevCount => prevCount + 1);
        }, 1000);

        // Cleanup function
        return () => {
            clearInterval(timer);
            console.log('Timer cleared');
        };
        }, []); //--> 1.Runs only once on mount because the dependency array is empty
    //}, [count]); //--> 2.Runs on specific state change
    //});//--> 3.Run on every render (not recommended) 
    //-------------------------------------------------------------------
    return (
        <div>
            <h2>Timer: {count} seconds</h2>
            <button onClick={incrementCount}>Increment</button>
        </div>
    );
};

export default Timer;
/*
setInterval and clearInterval are built-in JavaScript functions — 
they come out of the box with the browser (and Node.js), not React.

🔹 What is setInterval?
setInterval is a built-in JavaScript function that repeatedly executes a function 
after a specified time interval (in milliseconds).
*/
