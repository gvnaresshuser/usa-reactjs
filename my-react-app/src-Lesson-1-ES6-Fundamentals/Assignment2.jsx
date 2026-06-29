/*
Create a function using rest operator to multiply numbers
Create an object and destructure 3 properties
Use spread operator to merge 2 arrays
Create async function with setTimeout
*/
import React from "react";
export default function Assignment2() {

    // 🔹 1. Multiply using Rest Operator
    const multiply = (...nums) => {
        return nums.reduce((acc, curr) => acc * curr, 1);
    };

    // 🔹 2. Object Destructuring
    const student = {
        name: "Naresh",
        age: 25,
        city: "Hyderabad",
        course: "React JS"
    };

    const { name, age, city } = student;

    // 🔹 3. Spread Operator (Merge Arrays)
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const mergedArray = [...arr1, ...arr2];

    // 🔹 4. Async Function with setTimeout
    const fetchData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Data loaded successfully 🎉");
            }, 1000);
        });
    };

    const handleAsync = async () => {
        const result = await fetchData();
        alert(result);
    };

    return (
        <div className="p-5 space-y-4">
            <h1 className="text-2xl font-bold text-blue-600">
                Assignment 2 - ES6 Practice
            </h1>

            {/* Multiply */}
            <p className="text-green-600 font-semibold">
                Multiply (2,3,4): {multiply(2, 3, 4)}
            </p>

            {/* Destructuring */}
            <p>
                Name: {name}, Age: {age}, City: {city}
            </p>

            {/* Spread */}
            <p>
                Merged Array: {mergedArray.join(", ")}
            </p>

            {/* Async */}
            <button
                onClick={handleAsync}
                className="bg-purple-500 text-white px-4 py-2 rounded"
            >
                Test Async Function
            </button>
        </div>
    );
}