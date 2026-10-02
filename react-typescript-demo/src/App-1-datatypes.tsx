import type { ChangeEvent, ReactNode } from "react";
import { useState } from "react";

// --------------------------------------------------
// 1. INTERFACE
// --------------------------------------------------

interface Student {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  skills: string[];
  address?: string; // Optional property
}

// --------------------------------------------------
// 2. TYPE
// --------------------------------------------------

type Status = "Active" | "Inactive" | "Pending";

type ButtonVariant = "primary" | "secondary" | "success" | "danger";

interface ButtonProps {
  label: string;
  variant: ButtonVariant;
  onClick: () => void;
}

function Button({ label, variant, onClick }: ButtonProps) {
  const styles: Record<ButtonVariant, string> = {
    primary: "bg-indigo-600 hover:bg-indigo-700",
    secondary: "bg-slate-600 hover:bg-slate-700",
    success: "bg-emerald-600 hover:bg-emerald-700",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-6 py-3 font-semibold text-white transition ${styles[variant]}`}
    >
      {label}
    </button>
  );
}

// --------------------------------------------------
// 3. FUNCTION TYPE
// --------------------------------------------------

type GreetingFunction = (name: string) => string;

// --------------------------------------------------
// 4. REACTNODE
// --------------------------------------------------

interface CardProps {
  title: string;
  children: ReactNode;
}

// Reusable Card component
function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-slate-200">
      <h2 className="mb-4 text-lg font-bold text-slate-800">{title}</h2>
      {children}
    </div>
  );
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

function App() {
  // ------------------------------------------------
  // STRING
  // ------------------------------------------------

  const trainerName: string = "GV Naressh";

  // ------------------------------------------------
  // NUMBER
  // ------------------------------------------------

  const experience: number = 15;

  // ------------------------------------------------
  // BOOLEAN
  // ------------------------------------------------

  const isTrainer: boolean = true;

  // ------------------------------------------------
  // ARRAY
  // ------------------------------------------------

  const technologies: string[] = [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
  ];

  // ------------------------------------------------
  // OBJECT + INTERFACE
  // ------------------------------------------------

  const student: Student = {
    id: 101,
    name: "Rahul",
    age: 22,
    isActive: true,
    skills: ["React", "TypeScript"],
    // address is optional
    //address: "123 Main St, Anytown, USA",
  };

  // ------------------------------------------------
  // UNION TYPE
  // ------------------------------------------------

  const status: Status = "Active";

  // ------------------------------------------------
  // FUNCTION TYPE
  // ------------------------------------------------

  const greetStudent: GreetingFunction = (name) => {
    return `Hello, ${name}!`;
  };

  // ------------------------------------------------
  // EVENT TYPE
  // ------------------------------------------------

  const [name, setName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleSubmit = (): void => {
    alert(`Hello ${name || "Student"}!`);
  };

  // ------------------------------------------------
  // REACTNODE
  // ------------------------------------------------

  const welcomeMessage: ReactNode = (
    <span className="font-semibold text-indigo-600">
      Welcome to TypeScript with React!
    </span>
  );

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            React + TypeScript
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            TypeScript Data Types Demo
          </h1>

          <p className="mt-3 text-slate-600">
            Practical examples of commonly used TypeScript types in React
          </p>
        </div>

        {/* Datatypes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* STRING */}
          <Card title="1. String">
            <p className="text-sm text-slate-500">TypeScript type</p>

            <p className="mt-2 text-xl font-semibold text-indigo-600">
              {trainerName}
            </p>

            <code className="mt-3 block rounded-lg bg-slate-100 p-3 text-sm">
              const trainerName: string = "GV Naressh";
            </code>
          </Card>

          {/* NUMBER */}
          <Card title="2. Number">
            <p className="text-sm text-slate-500">Years of experience</p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {experience}+
            </p>

            <code className="mt-3 block rounded-lg bg-slate-100 p-3 text-sm">
              const experience: number = 15;
            </code>
          </Card>

          {/* BOOLEAN */}
          <Card title="3. Boolean">
            <p className="text-sm text-slate-500">Is trainer?</p>

            <p className="mt-2 text-xl font-semibold">
              {isTrainer ? (
                <span className="text-emerald-600">true ✓</span>
              ) : (
                <span className="text-red-600">false</span>
              )}
            </p>

            <code className="mt-3 block rounded-lg bg-slate-100 p-3 text-sm">
              const isTrainer: boolean = true;
            </code>
          </Card>

          {/* ARRAY */}
          <Card title="4. Array">
            <p className="mb-3 text-sm text-slate-500">Technologies</p>

            <div className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
                >
                  {technology}
                </span>
              ))}
            </div>

            <code className="mt-4 block rounded-lg bg-slate-100 p-3 text-sm">
              string[]
            </code>
          </Card>

          {/* OBJECT + INTERFACE */}
          <Card title="5. Object + Interface">
            <div className="space-y-2 text-sm">
              <p>
                <strong>ID:</strong> {student.id}
              </p>

              <p>
                <strong>Name:</strong> {student.name}
              </p>

              <p>
                <strong>Age:</strong> {student.age}
              </p>

              <p>
                <strong>Active:</strong> {student.isActive ? "Yes" : "No"}
              </p>

              <p>
                <strong>Skills:</strong> {student.skills.join(", ")}
              </p>
            </div>

            <code className="mt-4 block rounded-lg bg-slate-100 p-3 text-sm">
              Student
            </code>
          </Card>

          {/* UNION */}
          <Card title="6. Union Type">
            <p className="text-sm text-slate-500">Student status</p>

            <span className="mt-3 inline-block rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">
              {status}
            </span>

            <code className="mt-4 block rounded-lg bg-slate-100 p-3 text-sm">
              "Active" | "Inactive" | "Pending"
            </code>
          </Card>

          {/* OPTIONAL PROPERTY */}
          <Card title="7. Optional Property">
            <p className="text-sm text-slate-500">Address is optional</p>

            <p className="mt-3 font-medium text-slate-700">
              {student.address ?? "Address not provided"}
            </p>

            <code className="mt-4 block rounded-lg bg-slate-100 p-3 text-sm">
              address?: string
            </code>
          </Card>

          {/* FUNCTION TYPE */}
          <Card title="8. Function Type">
            <p className="text-sm text-slate-500">Function returns a string</p>

            <p className="mt-3 font-semibold text-purple-600">
              {greetStudent("Rahul")}
            </p>

            <code className="mt-4 block rounded-lg bg-slate-100 p-3 text-sm">
              (name: string) =&gt; string
            </code>
          </Card>

          {/* REACTNODE */}
          <Card title="9. ReactNode">
            <p className="text-sm text-slate-500">
              ReactNode can represent React content
            </p>

            <div className="mt-4 rounded-lg bg-indigo-50 p-4">
              {welcomeMessage}
            </div>

            <code className="mt-4 block rounded-lg bg-slate-100 p-3 text-sm">
              ReactNode
            </code>
          </Card>
        </div>

        {/* EVENT TYPES */}
        <div className="mt-6">
          <Card title="10. Event Type">
            <p className="mb-4 text-sm text-slate-500">
              ChangeEvent&lt;HTMLInputElement&gt; provides the correct
              TypeScript type for an input change event.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                onClick={handleSubmit}
                className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Say Hello
              </button>

              <Button
                label="Say Hai"
                variant="success"
                onClick={handleSubmit}
              />
            </div>

            {name && (
              <p className="mt-4 text-slate-700">
                You entered:{" "}
                <span className="font-bold text-indigo-600">{name}</span>
              </p>
            )}

            <code className="mt-4 block rounded-lg bg-slate-100 p-3 text-sm">
              ChangeEvent&lt;HTMLInputElement&gt;
            </code>
          </Card>
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-center text-sm text-slate-500">
          React + TypeScript • Learning by Building
        </div>
      </div>
    </div>
  );
}

export default App;
/*
{student.address ?? "Address not provided"}
Use student.address if it has a value; otherwise use "Address not provided" 
when the value is null or undefined.
*/
/*
What does ReactNode mean?
Think of ReactNode as:
"Anything that React can render."

const a: ReactNode = "Hello";
const b: ReactNode = 100;
const c: ReactNode = <h1>Hello</h1>;
const d: ReactNode = <button>Click Me</button>;
const e: ReactNode = null;

ReactNode is significant because it tells TypeScript that a variable can hold 
something that React can render.

Why would we use it?
It becomes especially useful when creating reusable React components.

interface CardProps {
  title: string;
  children: ReactNode;
}

   Pasted markdown
This means:
title must be a string, but children can be any valid React content.

So all of these are valid:
<Card title="Student">
  <p>Rahul</p>
</Card>

<Card title="Message">
  <strong>Hello!</strong>
</Card>

<Card title="Information">
  <div>
    <h3>React</h3>
    <p>TypeScript</p>
  </div>
</Card>
*/
