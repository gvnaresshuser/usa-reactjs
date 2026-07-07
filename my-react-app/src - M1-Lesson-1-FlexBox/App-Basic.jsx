import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './grid.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="row">
        <div className="col col-6"><div className="box">Column 1</div></div>
        <div className="col col-4"><div className="box">Column 2</div></div>
        <div className="col col-6"><div className="box">Column 3</div></div>
      </div>

    </>
  );
}

export default App;
