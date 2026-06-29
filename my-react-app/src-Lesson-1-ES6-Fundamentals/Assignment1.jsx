/*
🧪 Mini Assignment
👉 Modify:
sum(1,2,3,4)
👉 To:
Multiply numbers
Find max number
*/
import React from "react";

export default function Assignment1() {

    // 🔹 Multiply Function
    const multiply = (...nums) => {
        return nums.reduce((acc, curr) => acc * curr, 1);
    };

    // 🔹 Find Max Function
    const findMax = (...nums) => {
        return nums.reduce((max, curr) => {
            return curr > max ? curr : max;
        }, nums[0]);
    };

    // Test Data
    const numbers = [1, 2, 3, 4];

    return (
        <div className="p-5 space-y-4">
            <h1 className="text-2xl font-bold text-blue-600">
                Mini Assignment - ES6 Practice
            </h1>

            <p className="text-lg">
                Numbers: {numbers.join(", ")}
            </p>

            <p className="text-green-600 font-semibold">
                Multiply Result: {multiply(...numbers)}
            </p>

            <p className="text-purple-600 font-semibold">
                Max Number: {findMax(...numbers)}
            </p>

            {/* Optional Buttons for Testing */}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={() => alert("Multiply: " + multiply(...numbers))}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Test Multiply
                </button>

                <button
                    onClick={() => alert("Max: " + findMax(...numbers))}
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                    Test Max
                </button>
            </div>
        </div>
    );
}