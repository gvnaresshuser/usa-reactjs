import StudentCard from "./StudentCard";

function App() {
  const student = {
    name: "Naresh",
    age: 30, //"30" - error: Type 'string' is not assignable to type 'number'.
    course: "React + TypeScript",
    experience: "Beginner",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
            React + TypeScript
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Student Profile
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
            A simple React component demonstrating TypeScript interfaces, props,
            JSX, and Tailwind CSS.
          </p>
        </div>

        {/* Profile Area */}
        <div className="flex justify-center">
          <StudentCard student={student} />
        </div>

        {/* Learning Topics */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
            <div className="text-2xl">🔷</div>
            <p className="mt-2 font-semibold text-white">TypeScript</p>
            <p className="mt-1 text-sm text-slate-400">Type safety</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
            <div className="text-2xl">🧩</div>
            <p className="mt-2 font-semibold text-white">Interface</p>
            <p className="mt-1 text-sm text-slate-400">Object structure</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
            <div className="text-2xl">📦</div>
            <p className="mt-2 font-semibold text-white">Props</p>
            <p className="mt-1 text-sm text-slate-400">
              Pass data to components
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
            <div className="text-2xl">🎨</div>
            <p className="mt-2 font-semibold text-white">Tailwind CSS</p>
            <p className="mt-1 text-sm text-slate-400">Modern styling</p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-sm text-slate-500">
          Built with React, TypeScript & Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;
/*
The purpose of this interface is to define the structure (shape) of a student object.
interface Student {
  name: string;
  age: number;
  course: string;
  experience: string;
}

Think of it as a blueprint/contract for a Student object.
Without the interface
You could write:
const student = {
  name: "Naresh",
  age: 30,
  course: "React + TypeScript",
  experience: "Beginner",
};

But TypeScript doesn't have a named definition called Student that you can reuse.
With the interface
You can say:
const student: Student = {
  name: "Naresh",
  age: 30,
  course: "React + TypeScript",
  experience: "Beginner",
};

Now TypeScript checks the object:
Student
  │
  ├── name       → string
  ├── age        → number
  ├── course     → string
  └── experience → string

If someone writes:
const student: Student = {
  name: "Naresh",
  age: "30",              // ❌
  course: "React",
  experience: "Beginner",
};

TypeScript reports an error because age must be a number.
*/
