import React from "react";

export default function ES6Demo() {

    // 1️⃣ let vs const
    let age = 25;
    age = 30; // ✅ allowed

    const name = "Naresh";
    // name = "John"; ❌ not allowed

    // 2️⃣ Arrow Function
    const greet = (user) => {
        return `Hello ${user}`;
    };

    // 3️⃣ Template Literals
    const message = `My name is ${name} and I am ${age} years old`;

    // 4️⃣ Destructuring
    const person = {
        city: "Hyderabad",
        country: "India",
    };

    const { city, country } = person;

    const numbers = [10, 20, 30];
    const [first, second] = numbers;

    // 5️⃣ Spread Operator
    const arr1 = [1, 2];
    const arr2 = [...arr1, 3, 4];

    const obj1 = { a: 1 };
    const obj2 = { ...obj1, b: 2 };

    // 6️⃣ Rest Operator
    const sum = (...nums) => {
        return nums.reduce((acc, curr) => acc + curr, 0);
    };

    // 7️⃣ Promise + Async/Await
    const fetchData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Data fetched successfully!");
            }, 1000);
        });
    };

    const handleAsync = async () => {
        const data = await fetchData();
        alert(data);
    };

    return (
        <div className="p-5 space-y-4">
            <h1 className="text-2xl font-bold text-blue-600">
                ES6 Concepts Demo
            </h1>

            <p>{message}</p>

            <p>City: {city}, Country: {country}</p>

            <p>First: {first}, Second: {second}</p>

            <p>Array Spread: {arr2.join(", ")}</p>

            <p>Object Spread: {JSON.stringify(obj2)}</p>

            <p>Sum (Rest Operator): {sum(1, 2, 3, 4)}</p>

            <button
                onClick={handleAsync}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Fetch Data (Async/Await)
            </button>
        </div>
    );
}