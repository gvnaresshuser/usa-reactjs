import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//import './grid1.css';

//>npm install bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      {/*  <div class="container">
        <div class="row">
          <div class="col col-sm-12 col-md-6 col-lg-4">
            <div class="box">Column 1</div>
          </div>
          <div class="col col-sm-12 col-md-6 col-lg-4">
            <div class="box">Column 2</div>
          </div>
          <div class="col col-sm-12 col-md-12 col-lg-4">
            <div class="box">Column 3</div>
          </div>
        </div>
      </div> */}

      {/* USING BOOTSTRAP CLASS FROM 
      npm install bootstrap@5.3.7 & 
      import 'bootstrap/dist/css/bootstrap.min.css';*/}
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="p-3 border bg-success text-uppercase text-white">Column 1</div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="p-3 border bg-light">Column 2</div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="p-3 border bg-light">Column 3</div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default App;
