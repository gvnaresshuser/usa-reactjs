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

            <div className="mb-9 mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                <img className="size-12 shrink-0" src="/logo1.svg" alt="ChitChat Logo" />
                <div>
                    <div className="text-xl font-medium text-black dark:text-white">ChitChat</div>
                    <p className="text-gray-500 dark:text-gray-400">You have a new message!</p>
                </div>
            </div>

            <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img
                            className="h-48 w-full object-cover md:h-full md:w-48"
                            src="/test.png"
                            alt="Modern building architecture"
                        />
                    </div>
                    <div className="p-8">
                        <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Company retreats</div>
                        <a href="#" className="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
                            Incredible accommodation for your team
                        </a>
                        <p className="mt-2 text-gray-500">
                            Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of
                            places to do just that.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <h1 className="mt-4 text-3xl font-bold text-center mb-8 text-red-800">Product List</h1>

                <h1 className="text-3xl font-bold underline text-fuchsia-500">
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

            <div className="mt-9 mb-9 mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                <img className="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0" src="/logo.jpg" alt="" />
                <div className="space-y-2 text-center sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg font-semibold text-black">Erin Lindford</p>
                        <p className="font-medium text-gray-500">Product Engineer</p>
                    </div>
                    <button
                        className="
          rounded-full 
          py-1.5 
          px-4 
          border 
          border-purple-400 
          text-purple-600 
          hover:border-transparent 
          hover:bg-purple-600 
          hover:text-white 
          active:bg-purple-700">
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
