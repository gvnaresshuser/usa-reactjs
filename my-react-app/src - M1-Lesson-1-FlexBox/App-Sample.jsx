import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import './grid1.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="container">
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

        <div class="row">
          <div class="col col-sm-12 col-md-12 col-lg-12">
            <div class="box">Column 1</div>
          </div>         
        </div>

        <div class="row">
          <div class="col col-sm-12 col-md-6 col-lg-6">
            <div class="box">Column 1</div>
          </div>
          <div class="col col-sm-12 col-md-6 col-lg-6">
            <div class="box">Column 1</div>
          </div>
        </div>

        <div class="row">
          <div class="col col-sm-3 col-md-6 col-lg-6">
            <div class="box">Column 1</div>
          </div>
          <div class="col col-sm-3 col-md-6 col-lg-6">
            <div class="box">Column 1</div>
          </div>
          <div class="col col-sm-3 col-md-6 col-lg-6">
            <div class="box">Column 1</div>
          </div>
          <div class="col col-sm-3 col-md-6 col-lg-6">
            <div class="box">Column 1</div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
