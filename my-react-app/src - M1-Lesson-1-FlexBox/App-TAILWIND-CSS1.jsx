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
// App.jsx
import React from "react";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Product List</h1>

                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>

                {/* Card */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <img
                            src="https://img.freepik.com/premium-photo/art-nature-peacock-feathers-luxurious-glow_1073664-4126.jpg?w=360"
                            alt="Product"
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Product Title</h3>
                        <p className="text-gray-600 mb-4">This is a brief product description.</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-green-600">$19.99</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Repeat cards as needed */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <img
                            src="https://images.stockcake.com/public/5/7/b/57babc99-824f-48d3-b4ca-3eec4995399d_large/vibrant-peacock-feather-stockcake.jpg"
                            alt="Product"
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Another Product</h3>
                        <p className="text-gray-600 mb-4">Short description goes here.</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-green-600">$29.99</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Add more cards if needed */}
                </div>
            </div>
        </div>
    );
}

export default App;
