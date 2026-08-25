
import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';


function App() {
  //THOUGHT THIS IS FIRST - WE CAN SEE IN THE CONSOLE LOG THAT THIS - Message from useLayoutEffect - COMES FIRS
  useEffect(()=>{//3333333333333 - called
    console.log("Message from useEffect!");//SECOND THIS IS PRINTED IN CONSOLE
  },[]);
  useLayoutEffect(() => {//111111111111 - called
    console.log("Message from useLayoutEffect!");//FIRST THIS IS PRINTED IN CONSOLE
  }, []);
 
  return (//22222222222222222 - called
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useLayoutEffect Hook
          </h1>
          <h2>Test Message</h2>
          {Array(40000).fill('').map((item,index)=>(
            <li key={index}>{Math.pow(Math.random(),10)}</li>
            ))}
        </div>
       
      </section>
    </>
  );
}

export default App;
