import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
//🔹 Tailwind equivalent

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      {/* 🔹 Simplest Tailwind version (like Bootstrap grid) */}
      <div className="container mx-auto mt-4 px-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="p-3 border bg-gray-100 text-center">Column 1</div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="p-3 border bg-gray-100 text-center">Column 2</div>
          </div>
          <div className="col-span-12 md:col-span-12 lg:col-span-4">
            <div className="p-3 border bg-gray-100 text-center">Column 3</div>
          </div>
        </div>
      </div>


      {/*  🔹 Tailwind equivalent */}

      {/*  <div className="container mx-auto mt-4 px-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 border bg-gray-100 text-center">Column 1</div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 border bg-gray-100 text-center">Column 2</div>
          </div>
          <div className="w-full md:w-full lg:w-1/3 px-2 mb-4">
            <div className="p-3 border bg-gray-100 text-center">Column 3</div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default App;
