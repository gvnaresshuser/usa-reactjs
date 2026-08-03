import React, { useState, useEffect } from "react";

//USE EFFECT HOOK EXAMPLE
// This component demonstrates a simple timer using the useEffect hook
const Timer = () => {
  const [count, setCount] = useState(0);

  // Event handler to increment count
  const incrementCount = () => {
    //setCount(count + 1);//RISKY'
    setCount((prevCount) => prevCount + 1); // safer way to update state based on previous value
  };

  //-----------------1111111111111111------------------------
  /*
    Runs:
        ✅ Initial render
        ✅ Every state change
        ✅ Every prop change
        ✅ Every re-render
    */
  useEffect(() => {
    console.log("useEffect called : " + count);
    //}, []);
  });

  //------------------22222222222222-----------------------

  // useEffect runs after the component renders
  /* useEffect(() => {
        console.log('Component mounted or count updated');
        const timer = setInterval(() => {            
            setCount(prevCount => prevCount + 1);
        }, 1000);

        // Cleanup function
        return () => {
            clearInterval(timer);
            console.log('Timer cleared');
        };
        }, []);  */ //--> 1.Runs only once on mount because the dependency array is empty
  //}, [count]); //--> 2.Runs after the initial render and whenever 'count' changes.
  //});//--> 3.uns after every render (usually avoid unless needed). (not recommended)
  //-------------------------------------------------------------------
  //------------------33333333333333333333-----------------------
  /*  useEffect(() => {
    console.log("Effect");

    const timer = setInterval(() => {
      console.log("Timer running...");
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      console.log("Cleanup");
      clearInterval(timer);
    };
  }, [count]); */
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
/*
You can add these comments:

useEffect(() => {
  console.log("useEffect called: " + count);

  // Runs after EVERY render:
  // - Initial render (component mount)
  // - Every state update
  // - Every prop update
  // - Any re-render
});

If you use an empty dependency array:

useEffect(() => {
  console.log("useEffect called: " + count);

  // Runs ONLY ONCE after the initial render (component mount).
  // Does NOT run again on state or prop changes.
}, []);

For completeness, here are the three common useEffect patterns:

1. No dependency array
useEffect(() => {
  console.log("Runs after every render.");
});

Runs:

✅ Initial render
✅ Every state change
✅ Every prop change
✅ Every re-render
2. Empty dependency array
useEffect(() => {
  console.log("Runs only once.");
}, []);

Runs:

✅ Initial render only
3. Specific dependency
useEffect(() => {
  console.log("Count changed:", count);
}, [count]);

Runs:

✅ Initial render
✅ Whenever count changes
❌ Does not run if other state variables change

This third pattern is the one you'll use most often in real-world 
React applications because it lets you run side effects only when the 
relevant state or props change.
*/
/*
//------------------333333333333333-----------------------
*/
