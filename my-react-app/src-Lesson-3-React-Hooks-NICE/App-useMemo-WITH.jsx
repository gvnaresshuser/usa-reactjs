import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0);

  function cubeNum(num) {
    console.log("Calculation Done!");
    return Math.pow(num, 3);
  }

  //const result = cubeNum(number);//WHEN WE CLICK COUNTER++ BUTTON AS THE COUNTER CHANGES IT RE-RENDERS THE COMPONENT
  //SO cubeNum FUNCTION IS CALLED ALWAYS..TO AVOID THIS WE USE useMemo

  //SYNTAX OF useMemo - useMemo(cb,[dependencies])
  //const result = useMemo(() => { return cubeNum(number); }, [number]);
  const result = useMemo(() => cubeNum(number), [number]); //cubeNum FUNCTION WILL EXECUTE ONLY WHEN number GETS CHANGED
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useMemo Hook
          </h1>
        </div>
        <input
          style={{ border: "1px solid green", textAlign: "center" }}
          type="number"
          vlaue={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <h1>Cube of the number:{result}</h1>
        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          Counter++
        </button>
        <h1>Counter:{counter}</h1>
      </section>
    </>
  );
}

export default App;
