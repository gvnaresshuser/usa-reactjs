import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  /*  
  const count1: number = 10;
  const count: number = "10";
 */
  const increment = (): void => {
    setCount(count + 1);
    //setCount("Hello"); //Argument of type 'string' is not assignable to parameter of type 'SetStateAction<number>'.
  };

  const decrement = (): void => {
    setCount(count - 1);
  };

  const reset = (): void => {
    setCount(0);
  };

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-8 py-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur">
            🔢
          </div>

          <h2 className="text-2xl font-bold text-white">Counter</h2>

          <p className="mt-2 text-sm text-indigo-100">
            React state with TypeScript
          </p>
        </div>

        {/* Counter Body */}
        <div className="p-8">
          {/* Count Display */}
          <div className="mb-8 rounded-2xl bg-slate-50 p-8 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
              Current Count
            </p>

            <p className="mt-3 text-7xl font-extrabold text-slate-800">
              {count}
            </p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={decrement}
              className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-red-600 hover:shadow-lg active:scale-95"
            >
              − Decrease
            </button>

            <button
              onClick={increment}
              className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-600 hover:shadow-lg active:scale-95"
            >
              + Increase
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={reset}
            className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95"
          >
            Reset Counter
          </button>

          {/* TypeScript Explanation */}
          <div className="mt-8 rounded-xl bg-indigo-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
              TypeScript
            </p>

            <code className="mt-2 block text-sm font-medium text-indigo-800">
              useState&lt;number&gt;(0)
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
/*
Using your Counter.tsx, the easiest demonstration is to intentionally give useState<number> a string value.
1. Normal code — no error
const [count, setCount] = useState<number>(0);

Here TypeScript understands:
count → number

So this is valid:
setCount(10);

2. Intentionally create a type error
Change:
const [count, setCount] = useState<number>(0);

to:
const [count, setCount] = useState<number>(0);

setCount("Hello");

You should see an error similar to:
Argument of type 'string' is not assignable
to parameter of type 'SetStateAction<number>'.

This is a perfect classroom demonstration.
Explain:
useState<number>
       ↓
count must be a number
       ↓
setCount() must receive a number
       ↓
setCount("Hello")
       ↓
❌ TypeScript Error

3. Another very simple demonstration
Add this inside Counter.tsx:
const count: number = 10;

This is correct.
Now intentionally change it to:
const count: number = "10";

TypeScript immediately reports:
Type 'string' is not assignable to type 'number'.

You can then explain:
"10"       → string ❌
10         → number ✅

Even though JavaScript allows:
const count = "10";

TypeScript says:
You told me this variable must be a number, but you are giving me a string.
*/
