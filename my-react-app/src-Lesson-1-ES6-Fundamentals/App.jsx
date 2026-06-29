import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
//import './App.css'

import ES6Demo from "./ES6Demo";
import Assignment1 from "./Assignment1";
import Assignment2 from "./Assignment2";
import JavaScriptConcepts from "./JavaScriptConcepts";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>          
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            JavaScript (ES6+) Fundamentals
          </h1>
          <p className="mt-2 text-sm sm:text-base text-yellow-100">
            let • const • Arrow Functions • Destructuring • Async/Await
          </p>
        </div>
      {/* <ES6Demo /> */}
        {/*  <Assignment1 />  */}
          {/* <Assignment2 /> */}
        <div style={{ width: "100%", marginTop: "2rem" ,display: "flex", justifyContent: "center"}}>
          <JavaScriptConcepts />
        </div>
      </section>
    </>
  )
}

export default App
