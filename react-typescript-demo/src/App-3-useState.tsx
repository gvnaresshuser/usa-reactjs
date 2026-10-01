import Counter from "./Counter";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
            Exercise 02 • React + TypeScript
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Counter Application
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Learn how React state, events, TypeScript, and component-based
            architecture work together.
          </p>
        </div>

        {/* Counter */}
        <div className="flex justify-center">
          <Counter />
        </div>

        {/* Concepts */}
        <div className="mt-12">
          <h2 className="mb-6 text-center text-xl font-bold text-white">
            Concepts Covered
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
              <div className="text-2xl">⚛️</div>
              <p className="mt-2 font-semibold text-white">useState</p>
              <p className="mt-1 text-sm text-slate-400">Manage state</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
              <div className="text-2xl">🔷</div>
              <p className="mt-2 font-semibold text-white">TypeScript</p>
              <p className="mt-1 text-sm text-slate-400">Type safety</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
              <div className="text-2xl">🖱️</div>
              <p className="mt-2 font-semibold text-white">Events</p>
              <p className="mt-1 text-sm text-slate-400">Handle clicks</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
              <div className="text-2xl">🔄</div>
              <p className="mt-2 font-semibold text-white">Rendering</p>
              <p className="mt-1 text-sm text-slate-400">UI updates</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
              <div className="text-2xl">🧩</div>
              <p className="mt-2 font-semibold text-white">Components</p>
              <p className="mt-1 text-sm text-slate-400">Reusable UI</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-sm text-slate-500">
          React + TypeScript • Learning by Building
        </p>
      </div>
    </div>
  );
}

export default App;

/*
The main teaching code
I would pause at these three lines when teaching students:
const [count, setCount] = useState<number>(0);

Explain:
count
  ↓
Current state value

setCount
  ↓
Function used to change the state

number
  ↓
TypeScript says count must be a number

0
  ↓
Initial value

Then:
setCount(count + 1);

changes the state.
React then re-renders the component, so:
<p>{count}</p>

displays the new value.
Complete flow
User clicks + Increase
        ↓
   increment()
        ↓
setCount(count + 1)
        ↓
   State changes
        ↓
 React re-renders
        ↓
     {count}
        ↓
 Updated UI
*/
