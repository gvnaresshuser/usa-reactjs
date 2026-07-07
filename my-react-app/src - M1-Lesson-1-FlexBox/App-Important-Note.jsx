import React from "react";
import "./index.css"; // Make sure Tailwind is configured here
import banner from './assets/1.jpg';
import banner2 from './assets/2.jpg';
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";

const images = [img1, img2, img3, img4];
const globalDivStyle = `
  div {
    border: 1px solid navy;
  }
`;
function App() {
  return (
    <>
      {/*  <style>{globalDivStyle}</style> */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">

        {/* 🔵 Row 1: Banner */}
        <div className="mb-8 text-center">
          <div className="inline-block border-4 border-purple-500 rounded-lg px-4 py-1 sm:px-6 sm:py-2 
                bg-red-200
                sm:bg-green-200
                md:bg-blue-200
                lg:bg-orange-200
                shadow-lg mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
              Legendary Website
            </h2>
          </div>
          <img
            src={banner}
            alt="Banner"
            className="w-full h-[300px] object-cover rounded-lg shadow-md mt-4"
          />
        </div>

        {/* 🔵 Row 2: Image and Text Side by Side */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="flex-1 text-center">
            <img
              src={banner2}
              alt="Side"
              className="mx-auto max-w-xs rounded-lg shadow"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-semibold mb-2 text-gray-800">Our Guarantee</h3>
            <p className="italic text-center text-gray-500 mb-4">
              This is a description section where you can put some text about the image or the content. It adjusts on all screen sizes.
            </p>
            <div className="bg-gray-100 p-4 rounded shadow">
              <p>
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
              </p>
            </div>
          </div>
        </div>

        {/* 🔵 Row 3: Four Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {images.map((image, index) => {
            const colors = ["bg-gray-100", "bg-indigo-100", "bg-yellow-100", "bg-lime-100"];
            const bgClass = colors[index % colors.length];

            return (
              <div key={index} className={`rounded-xl shadow-md ${bgClass} p-4 text-center`}>
                <img
                  src={image}
                  alt={`Card ${index + 1}`}
                  className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-white shadow-md mb-4"
                />
                <h5 className="text-lg font-bold mb-1">Image {index + 1}</h5>
                <p className="text-gray-600 mb-3">Some professional content related to image {index + 1}.</p>
                <div className="flex justify-center gap-2 mb-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">View</button>
                  <button className="px-3 py-1 bg-yellow-400 text-white rounded text-sm hover:bg-yellow-500">Edit</button>
                </div>
                <div className="text-yellow-500">
                  {[1, 2, 3, 4, 5].map(star => <span key={star}>&#9733;</span>)}
                </div>
              </div>
            );
          })}
        </div>

        {/* 🔵 Row 4: Footer */}
        <footer className="text-center py-4 bg-gray-800 text-white rounded">
          © 2025 5datainc.com. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default App;
/*
TAILWIND CSS INSTALLATION
FOLLOW SETTINGS FROM TAILWIND VITE TAB
https://tailwindcss.com/docs/installation/using-vite
npm install tailwindcss @tailwindcss/vite

E:\MURALI\REACT-JS-TRAINING\my-react-app>npm install tailwindcss @tailwindcss/vite
added 22 packages, and audited 561 packages in 12s
92 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities

*/
/*
Default Tailwind CSS breakpoints:
| Prefix | Min Width |
| ------ | --------- |
| `sm`   | `640px`   |
| `md`   | `768px`   |
| `lg`   | `1024px`  |
| `xl`   | `1280px`  |
| `2xl`  | `1536px`  |
*/