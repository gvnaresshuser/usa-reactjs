import { useState } from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormContext = {
  role: "admin" | "employee";
};

const createSchema = (role: FormContext["role"]) => {
  const minimumSalary = role === "admin" ? 50000 : 10000;

  return z
    .object({
      username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .regex(/^[A-Za-z]+$/, "Username must contain only alphabets"),
      age: z
        .string()
        .min(1, "Age is required")
        .transform(Number)
        .pipe(
          z
            .number()
            .int("Age must be an integer")
            .min(18, "Minimum age is 18")
            .max(60, "Maximum age is 60"),
        ),
      salary: z
        .string()
        .min(1, "Salary is required")
        .transform(Number)
        .pipe(
          z
            .number()
            .positive("Salary must be positive")
            .refine(
              (salary) => salary > minimumSalary,
              `Salary must be greater than ₹${minimumSalary.toLocaleString("en-IN")}`,
            ),
        ),
      /*  department: z.enum(["HR", "FINANCE", "SALES", "IT"], {
        errorMap: () => ({ message: "Please select a department" }),
      }), */
      department: z.enum(["HR", "FINANCE", "SALES", "IT"], {
        error: "Please select a department",
      }),
      joiningDate: z
        .string()
        .min(1, "Joining date is required")
        .refine(
          (value) => !Number.isNaN(new Date(value).getTime()),
          "Invalid date format",
        )
        .refine(
          (value) => new Date(value) <= new Date(),
          "Joining date cannot be in the future",
        ),
      /* gender: z.enum(["Male", "Female", "Other"], {
        errorMap: () => ({ message: "Please select gender" }),
      }), */
      gender: z.enum(["Male", "Female", "Other"], {
        error: "Please select gender",
      }),
      skills: z.array(z.string()).min(1, "Select at least one skill"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
};

type FormInput = z.input<ReturnType<typeof createSchema>>;
type FormOutput = z.output<ReturnType<typeof createSchema>>;

const inputClass =
  "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";
const labelClass = "block text-sm font-semibold text-slate-700";

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="mt-1 text-sm text-red-600">⚠ {message}</p>
  ) : null;
}

export default function AssignmentZODFormWithContext() {
  const [role, setRole] = useState<FormContext["role"]>("employee");
  const [submittedData, setSubmittedData] = useState<FormOutput | null>(null);

  // React Hook Form passes its context to the resolver. The custom resolver
  // uses that role to build the appropriate Zod schema.
  const roleBasedResolver: Resolver<FormInput, FormContext, FormOutput> = (
    values,
    context,
    options,
  ) =>
    zodResolver(createSchema(context?.role ?? "employee"))(
      values,
      context,
      options,
    );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
    trigger,
    watch,
    getValues,
  } = useForm<FormInput, FormContext, FormOutput>({
    mode: "onChange",
    context: { role },
    resolver: roleBasedResolver,
    defaultValues: {
      username: "",
      age: "",
      salary: "",
      joiningDate: "",
      skills: [],
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormOutput> = (data) => {
    console.log("Submitted Data:", { ...data, role });
    console.log("Age type:", typeof data.age); // number
    console.log("Salary type:", typeof data.salary); // number
    setSubmittedData(data);
    alert("Form submitted successfully! Check the submitted details below.");
    reset();
  };

  const fillDummyData = () => {
    setValue("username", "Max", { shouldValidate: true });
    setValue("age", "28", { shouldValidate: true });
    setValue("salary", role === "admin" ? "60000" : "25000", {
      shouldValidate: true,
    });
    setValue("department", "IT", { shouldValidate: true });
    setValue("joiningDate", "2022-05-10", { shouldValidate: true });
    setValue("gender", "Male", { shouldValidate: true });
    setValue("skills", ["React", "Node.js"], { shouldValidate: true });
    setValue("password", "abc123", { shouldValidate: true });
    setValue("confirmPassword", "abc123", { shouldValidate: true });
  };

  const validateAge = async () => {
    alert((await trigger("age")) ? "Age is valid!" : "Age validation failed!");
  };
  const validateSalary = async () => {
    alert(
      (await trigger("salary"))
        ? `Salary is valid for the ${role} role!`
        : `Salary validation failed for the ${role} role.`,
    );
  };
  const validatePasswords = async () => {
    alert(
      (await trigger(["password", "confirmPassword"]))
        ? "Password fields are valid!"
        : "Password validation failed!",
    );
  };
  const clearForm = () => {
    reset();
    setSubmittedData(null);
  };

  const selectedDepartment = watch("department");
  const selectedGender = watch("gender");
  const selectedSkills = watch("skills") ?? [];

  const changeRole = (nextRole: FormContext["role"]) => {
    setRole(nextRole);
    // Revalidate after React has applied the updated context.
    window.setTimeout(() => void trigger("salary"), 0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-100 px-3 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-6 text-white shadow-xl sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            React Hook Form • Zod • TypeScript
          </p>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Employee Registration
          </h1>
          <p className="mt-2 text-sm text-indigo-100 sm:text-base">
            Role-based salary validation using resolver context.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-2xl border border-violet-100 bg-white p-4 shadow-xl sm:p-7"
        >
          <section>
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              1. Employee and role details
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Employee role</label>
                <select
                  value={role}
                  onChange={(e) =>
                    changeRole(e.target.value as FormContext["role"])
                  }
                  className={inputClass}
                >
                  <option value="employee">
                    Employee (salary &gt; ₹10,000)
                  </option>
                  <option value="admin">Admin (salary &gt; ₹50,000)</option>
                </select>
                <p className="mt-1 text-xs text-slate-500">
                  Context role: <strong>{role}</strong>
                </p>
              </div>
              <div>
                <label className={labelClass}>Username</label>
                <input
                  {...register("username")}
                  className={inputClass}
                  placeholder="e.g. Max"
                  autoComplete="username"
                />
                <FieldError message={errors.username?.message} />
              </div>
              <div>
                <label className={labelClass}>Age</label>
                <input
                  type="number"
                  {...register("age")}
                  className={inputClass}
                  placeholder="18–60"
                />
                <FieldError message={errors.age?.message} />
              </div>
              <div>
                <label className={labelClass}>Salary (₹)</label>
                <input
                  type="number"
                  {...register("salary")}
                  className={inputClass}
                  placeholder={
                    role === "admin"
                      ? "Greater than 50000"
                      : "Greater than 10000"
                  }
                />
                <FieldError message={errors.salary?.message} />
              </div>
              <div>
                <label className={labelClass}>Department</label>
                <select
                  {...register("department")}
                  className={inputClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  <option value="HR">Human Resources</option>
                  <option value="FINANCE">Finance</option>
                  <option value="SALES">Sales</option>
                  <option value="IT">Information Technology</option>
                </select>
                <FieldError message={errors.department?.message} />
              </div>
              <div>
                <label className={labelClass}>Joining date</label>
                <input
                  type="date"
                  {...register("joiningDate")}
                  className={inputClass}
                />
                <FieldError message={errors.joiningDate?.message} />
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

          <section>
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              2. Personal details
            </h2>
            <fieldset>
              <legend className={labelClass}>Gender</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {(["Male", "Female", "Other"] as const).map((gender) => (
                  <label
                    key={gender}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm"
                  >
                    <input
                      type="radio"
                      value={gender}
                      {...register("gender")}
                      className="accent-indigo-600"
                    />
                    {gender}
                  </label>
                ))}
              </div>
              <FieldError message={errors.gender?.message} />
            </fieldset>
            <fieldset className="mt-5">
              <legend className={labelClass}>Technical skills</legend>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["React", "Node.js", "Python", "Java"].map((skill) => (
                  <label
                    key={skill}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-violet-100 bg-violet-50 px-4 py-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={skill}
                      {...register("skills")}
                      className="accent-violet-600"
                    />
                    {skill}
                  </label>
                ))}
              </div>
              <FieldError message={errors.skills?.message} />
            </fieldset>
            <div className="mt-4 rounded-xl bg-sky-50 p-4 text-sm text-sky-950">
              <p>
                <strong>Selected department:</strong>{" "}
                {selectedDepartment || "Not selected"}
              </p>
              <p className="mt-1">
                <strong>Selected gender:</strong>{" "}
                {selectedGender || "Not selected"}
              </p>
              <p className="mt-1">
                <strong>Selected skills:</strong>{" "}
                {selectedSkills.length
                  ? selectedSkills.join(", ")
                  : "None selected"}
              </p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

          <section>
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              3. Account security
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  {...register("password")}
                  className={inputClass}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
                <FieldError message={errors.password?.message} />
              </div>
              <div>
                <label className={labelClass}>Confirm password</label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className={inputClass}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                />
                <FieldError message={errors.confirmPassword?.message} />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-sky-50 p-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700">
              Form tools
            </h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => alert(JSON.stringify(getValues(), null, 2))}
                className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Get Values
              </button>
              <button
                type="button"
                onClick={fillDummyData}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-700 hover:to-indigo-700"
              >
                Fill Dummy Data
              </button>
              <button
                type="button"
                onClick={validateAge}
                className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:from-amber-600 hover:to-orange-600"
              >
                Validate Age
              </button>
              <button
                type="button"
                onClick={validateSalary}
                className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-violet-700 hover:to-fuchsia-700"
              >
                Validate Salary
              </button>
              <button
                type="button"
                onClick={validatePasswords}
                className="rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-pink-700 hover:to-rose-700"
              >
                Validate Passwords
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="rounded-lg bg-rose-100 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-200"
              >
                Reset Form
              </button>
            </div>
          </section>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full rounded-xl px-5 py-3.5 font-bold text-white transition ${!isValid || isSubmitting ? "cursor-not-allowed bg-slate-300" : "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 shadow-lg hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700"}`}
          >
            {isSubmitting ? "Submitting..." : "✓ Submit Registration"}
          </button>
          <p className="text-center text-xs text-slate-500">
            Salary validation changes according to the selected role.
          </p>
        </form>

        {submittedData && (
          <section className="mt-7 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-xl">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 text-white">
              <h2 className="text-xl font-extrabold">
                Registration successful!
              </h2>
              <p className="text-sm text-emerald-50">
                Submitted employee details
              </p>
            </div>
            <div className="overflow-x-auto p-4 sm:p-6">
              <table className="w-full table-fixed text-left text-sm">
                <tbody>
                  {Object.entries(submittedData).map(([key, value], index) => (
                    <tr
                      key={key}
                      className={index % 2 === 0 ? "bg-emerald-50" : "bg-white"}
                    >
                      <th className="w-2/5 break-words border-b border-emerald-100 px-3 py-3 font-bold capitalize text-emerald-950">
                        {key.replace(/([A-Z])/g, " $1")}
                      </th>
                      <td className="break-words border-b border-emerald-100 px-3 py-3 text-slate-700">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : String(value)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-cyan-50">
                    <th className="border-b border-cyan-100 px-3 py-3 text-left">
                      Role used
                    </th>
                    <td className="border-b border-cyan-100 px-3 py-3">
                      {role}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
/*
HTML form input
age: "28" · salary: "25000"

FormInput
Input values are strings

Zod validation and transformation
.transform(Number) and .pipe(...)

FormOutput
age: 28 · salary: 25000 — both numbers


Remember:
- FormInput = data before transformation.
- unknown = context type not specifically defined.
- FormOutput = validated data after transformation.

Why is unknown used in useForm?
React Hook Form defines useForm with three generic parameters:
useForm<TFieldValues, TContext, TTransformedValues>()


In your code:
Generic	Type	Purpose
First	FormInput	Types of the values entered into the form
Second	unknown	Type of the optional resolver context
Third	FormOutput	Types of the validated, transformed values
The second parameter is unknown because your form does not require a specific 
context type.

In React Hook Form, context type means additional data that you can pass to 
the validation resolver so that validation rules can depend on that data.

1. Without context
Suppose your form validates an employee's salary:
useForm<FormInput, unknown, FormOutput>({
  resolver: zodResolver(schema),
});


Here, unknown means you have not specified a particular context type. Your validation does not need any extra context data.
2. With context
Suppose salary requirements differ by employee role:
- Admin: salary must be greater than ₹50,000.
- Employee: salary must be greater than ₹10,000.
You can define a context type:
type FormContext = {
  role: "admin" | "employee";
};


Then specify it as the second generic:
useForm<FormInput, FormContext, FormOutput>({
  resolver: zodResolver(schema),
  context: {
    role: "admin",
  },
});


Conceptually, the context provides extra information to the validation process.

Important: React Hook Form's context option is intended for the resolver to use. 
The standard zodResolver(schema) does not automatically use React Hook Form's 
context to change Zod validation rules. You would need custom resolver logic or 
another appropriate approach to make validation depend on that context.
*/
