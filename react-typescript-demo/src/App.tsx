import type { ReactNode } from "react";

interface CardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

function Card({ title, icon, children }: CardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Card Header */}
      <div className="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl text-indigo-600">
          {icon}
        </div>

        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>

      {/* Card Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
            <span>⚛️</span>
            React + TypeScript
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Understanding ReactNode
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
            A reusable Card component that accepts different types of React
            content through the{" "}
            <code className="text-indigo-300">children</code> prop.
          </p>
        </div>

        {/* ReactNode Explanation */}
        <div className="mb-8 rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-3xl">
              🧩
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
                ReactNode
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                Anything that React can render can be passed as children.
              </p>

              <code className="mt-2 block text-sm text-indigo-300">
                children: ReactNode;
              </code>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <Card title="Student Information" icon="👨‍🎓">
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Name
                </p>

                <p className="mt-1 text-lg font-bold text-slate-800">Naresh</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Course
                </p>

                <p className="mt-1 text-lg font-bold text-slate-800">
                  React + TypeScript
                </p>
              </div>
            </div>
          </Card>

          {/* Card 2 */}
          <Card title="Skills" icon="🚀">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                React
              </span>

              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                TypeScript
              </span>

              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                JavaScript
              </span>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Vite
              </span>
            </div>
          </Card>

          {/* Card 3 */}
          <Card title="Message" icon="💬">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-5">
              <p className="mb-4 text-slate-600">
                Welcome to the world of
                <span className="font-bold text-indigo-600">
                  {" "}
                  React + TypeScript!
                </span>
              </p>

              <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                onClick={()=> alert("Let's start learning React + TypeScript!")}>
                Start Learning 🚀
              </button>
            </div>
          </Card>

          {/* Card 4 */}
          <Card title="ReactNode Demo" icon="🧩">
            <div className="space-y-4">
              <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50 p-4">
                <p className="text-sm text-slate-500">ReactNode can contain:</p>

                <div className="mt-3 space-y-2 text-sm font-medium text-slate-700">
                  <p>✅ Text</p>
                  <p>✅ JSX Elements</p>
                  <p>✅ Components</p>
                  <p>✅ Lists</p>
                  <p>✅ Buttons</p>
                </div>
              </div>

              <code className="block rounded-xl bg-slate-900 p-4 text-sm text-indigo-300">
                children: ReactNode;
              </code>
            </div>
          </Card>
        </div>

        {/* Flow */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-center text-xl font-bold text-white">
            How ReactNode Works
          </h2>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center md:flex-row">
            <div className="rounded-2xl bg-white/10 px-6 py-4">
              <p className="text-sm text-slate-400">Card Component</p>

              <code className="mt-1 block text-indigo-300">
                children: ReactNode
              </code>
            </div>

            <div className="text-2xl text-indigo-400">→</div>

            <div className="rounded-2xl bg-white/10 px-6 py-4">
              <p className="text-sm text-slate-400">Different Content</p>

              <p className="mt-1 text-white">JSX • Text • Button • List</p>
            </div>

            <div className="text-2xl text-indigo-400">→</div>

            <div className="rounded-2xl bg-white/10 px-6 py-4">
              <p className="text-sm text-slate-400">React Renders</p>

              <p className="mt-1 font-semibold text-green-400">Beautiful UI</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-sm text-slate-500">
          React + TypeScript • ReactNode • children • Reusable Components
        </p>
      </div>
    </div>
  );
}

export default App;
