import { useState } from "react";
import type { ChangeEvent, MouseEvent, ReactNode } from "react";

/* ---------------------------------
   1. Interface
---------------------------------- */

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: Status;
  skills: string[];
  phone?: string; // Optional property
}

/* ---------------------------------
   2. Type
---------------------------------- */

type UserRole = "Admin" | "Trainer" | "Student";

type Status = "Active" | "Inactive";

/* ---------------------------------
   3. Object + Interface
---------------------------------- */

const users: User[] = [
  {
    id: 1,
    name: "Naresh",
    email: "naresh@example.com",
    age: 30,
    status: "Inactive",
    skills: ["React", "TypeScript", "JavaScript"],
    phone: "9876543210",
  },
  {
    id: 2,
    name: "Ravi",
    email: "ravi@example.com",
    age: 28,
    status: "Inactive",
    skills: ["Node.js", "Express", "PostgreSQL"],
  },
];

/* ---------------------------------
   4. Function Type
---------------------------------- */

type UserFilter = (user: User) => boolean;

const isActiveUser: UserFilter = (user) => {
  return user.status === "Active";
};

/* ---------------------------------
   5. ReactNode
---------------------------------- */

interface CardProps {
  title: string;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-bold text-slate-800">{title}</h2>

      {children}
    </div>
  );
}

/* ---------------------------------
   6. Main Component
---------------------------------- */

function App() {
  /* ---------------------------------
     Union Type
  ---------------------------------- */

  const [selectedRole, setSelectedRole] = useState<UserRole>("Student");

  /* ---------------------------------
     Event Type
  ---------------------------------- */

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
  };

  /* ---------------------------------
     Mouse Event Type
  ---------------------------------- */

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log("Button clicked");
    console.log(event.currentTarget);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
            Exercise 03 • React + TypeScript
          </div>

          <h1 className="text-4xl font-extrabold text-white">User List</h1>

          <p className="mt-3 text-slate-400">
            TypeScript types, interfaces, unions, functions, events and
            ReactNode
          </p>
        </div>

        {/* Search */}

        <Card title="Search Users">
          <input
            type="text"
            placeholder="Search users..."
            onChange={handleSearch}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </Card>

        {/* Users */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {users.map((user) => (
            <Card key={user.id} title={user.name}>
              {/* String */}

              <p className="text-slate-500">{user.email}</p>

              {/* Number */}

              <p className="mt-3 text-slate-700">
                <strong>Age:</strong> {user.age}
              </p>

              {/* Boolean + Union */}

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    user.status === "Active"
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }
                >
                  {user.status}
                </span>
              </p>

              {/* Array */}

              <div className="mt-4">
                <p className="mb-2 font-semibold text-slate-700">Skills</p>

                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optional Property */}

              {user.phone && (
                <p className="mt-4 text-slate-600">
                  <strong>Phone:</strong> {user.phone}
                </p>
              )}
            </Card>
          ))}
        </div>

        {/* Union Type Demo */}

        <div className="mt-8">
          <Card title="Union Type">
            <p className="mb-4 text-slate-600">
              Selected Role:
              <strong className="ml-2 text-indigo-600">{selectedRole}</strong>
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedRole("Admin")}
                className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white"
              >
                Admin
              </button>

              <button
                onClick={() => setSelectedRole("Trainer")}
                className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white"
              >
                Trainer
              </button>

              <button
                onClick={() => setSelectedRole("Student")}
                className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white"
              >
                Student
              </button>
            </div>
          </Card>
        </div>

        {/* Function Type */}

        <div className="mt-8">
          <Card title="Function Type">
            <p className="text-slate-600">
              Active Users:
              <strong className="ml-2 text-indigo-600">
                {users.filter(isActiveUser).length}
              </strong>
            </p>

            <button
              onClick={handleButtonClick}
              className="mt-4 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Click Me
            </button>
          </Card>
        </div>

        {/* Concepts */}

        <div className="mt-8">
          <Card title="TypeScript Concepts Covered">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <p>🔤 string</p>

              <p>🔢 number</p>

              <p>✅ boolean</p>

              <p>📋 array</p>

              <p>📦 object</p>

              <p>🧩 interface</p>

              <p>🏷️ type</p>

              <p>🔀 union</p>

              <p>❓ optional property</p>

              <p>⚙️ function type</p>

              <p>🖱️ event type</p>

              <p>⚛️ ReactNode</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
/*
| Concept | Where we demonstrate it |
|---|---|
| `string` | `name`, `email` |
| `number` | `id`, `age` |
| `boolean` | `isActive` |
| Array | `skills: string[]` |
| Object | Each user object |
| Interface | `interface User` |
| Type | `type UserRole` |
| Union | `"Admin" \| "Trainer" \| "Student"` |
| Optional property | `phone?: string` |
| Function type | `type UserFilter = (...) => boolean` |
| Event type | `ChangeEvent`, `MouseEvent` |
| ReactNode | `children: ReactNode` |
--------------------------------------------------------
Basic Types
   ↓
string / number / boolean
   ↓
Arrays & Objects
   ↓
Interface
   ↓
Type
   ↓
Union
   ↓
Optional Property
   ↓
Function Type
   ↓
Event Type
   ↓
ReactNode
*/
/*
crossorigin tells the browser to handle a resource using cross-origin/CORS rules 
when the resource comes from a different origin.
*/
