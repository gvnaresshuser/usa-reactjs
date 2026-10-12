import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(/^[A-Za-z]+$/, "Username must contain only alphabets"),

    age: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ invalid_type_error: "Age must be a number" })
        .int("Age must be an integer")
        .min(18, "Minimum age is 18")
        .max(60, "Maximum age is 60"),
    ),

    salary: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ invalid_type_error: "Salary must be a number" })
        .positive("Salary must be positive")
        .refine((val) => val > 10000, {
          message: "Salary must be greater than 10000",
        }),
    ),

    department: z.enum(["HR", "FINANCE", "SALES", "IT"], {
      errorMap: () => ({ message: "Please select a valid department" }),
    }),

    joiningDate: z
      .string()
      .min(1, "Joining date is required")
      .refine((val) => !isNaN(new Date(val).getTime()), "Invalid date format")
      .refine(
        (val) => new Date(val) <= new Date(),
        "Joining date cannot be in the future",
      ),

    gender: z.enum(["Male", "Female", "Other"], {
      errorMap: () => ({ message: "Please select gender" }),
    }),

    skills: z.array(z.string()).min(1, "Please select at least one skill"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

const labelClass = "block text-sm font-semibold text-slate-700";

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-rose-600">
      <span aria-hidden="true">⚠</span> {message}
    </p>
  );
}

export default function AssignmentZODForm() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
    trigger,
    watch,
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      age: "",
      salary: "",
      department: "",
      joiningDate: "",
      // Radio
      gender: "",
      // Checkboxes
      skills: [],
      // Password
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    setSubmittedData(data);
    alert("Form submitted successfully! Check the submitted details below.");
    reset();
  };

  const fillDummyData = () => {
    setValue("username", "Max", { shouldValidate: true });
    setValue("age", 28, { shouldValidate: true });
    setValue("salary", 25000, { shouldValidate: true });
    setValue("department", "IT", { shouldValidate: true });
    setValue("joiningDate", "2022-05-10", { shouldValidate: true });
    setValue("gender", "Male", { shouldValidate: true });
    setValue("skills", ["React", "Node.js"], { shouldValidate: true });
    setValue("password", "abc123", { shouldValidate: true });
    setValue("confirmPassword", "abc123", { shouldValidate: true });
  };

  const validateAge = async () => {
    const valid = await trigger("age");
    alert(valid ? "Age is valid!" : "Age validation failed!");
  };

  const validatePasswords = async () => {
    const valid = await trigger(["password", "confirmPassword"]);
    alert(valid ? "Password fields are valid!" : "Password validation failed!");
  };

  const selectedDepartment = watch("department");
  const selectedGender = watch("gender");
  const selectedSkills = watch("skills") ?? [];

  const clearForm = () => {
    reset();
    setSubmittedData(null);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-3 py-5 px-3 sm:px-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <header className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-600 p-4 text-white shadow-xl shadow-indigo-200 sm:mb-8 sm:rounded-3xl sm:p-7 lg:p-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">
                People • Profile • Onboarding
              </p>
              <h1 className="break-words text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Employee Registration
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                Complete the details below. Zod validates each field as you
                type, and React Hook Form manages the form state.
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-xl border border-white/20 bg-white/15 text-2xl shadow-inner sm:h-16 sm:w-16 sm:self-auto sm:rounded-2xl sm:text-3xl">
              👤
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/15 px-3 py-1.5">
              ✓ Live validation
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5">
              ✓ Zod schema
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5">
              ✓ React Hook Form
            </span>
          </div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-0 space-y-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-200/60 sm:space-y-6 sm:rounded-3xl sm:p-6 lg:p-8"
        >
          <section>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                🪪
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Personal details
                </h2>
                <p className="text-sm text-slate-500">
                  Basic information about the employee
                </p>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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
                  placeholder="Enter age (18–60)"
                />
                <FieldError message={errors.age?.message} />
              </div>

              <div>
                <label className={labelClass}>Department</label>
                <select {...register("department")} className={inputClass}>
                  <option value="">Choose a department</option>
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

              <div className="min-w-0 sm:col-span-2">
                <label className={labelClass}>Salary (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    {...register("salary")}
                    className={`${inputClass} pl-9`}
                    placeholder="Must be greater than 10000"
                  />
                </div>
                <FieldError message={errors.salary?.message} />
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-100 text-lg">
                ✨
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">About you</h2>
                <p className="text-sm text-slate-500">
                  Choose your gender and technical skills
                </p>
              </div>
            </div>

            <fieldset>
              <legend className={labelClass}>Gender</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {["Male", "Female", "Other"].map((gender) => (
                  <label
                    key={gender}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <input
                      type="radio"
                      value={gender}
                      {...register("gender")}
                      className="h-4 w-4 accent-indigo-600"
                    />
                    {gender}
                  </label>
                ))}
              </div>
              <FieldError message={errors.gender?.message} />
            </fieldset>

            <fieldset className="mt-5">
              <legend className={labelClass}>Technical skills</legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {["React", "Node.js", "Python", "Java"].map((skill) => (
                  <label
                    key={skill}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50"
                  >
                    <input
                      type="checkbox"
                      value={skill}
                      {...register("skills")}
                      className="h-4 w-4 rounded accent-violet-600"
                    />
                    {skill}
                  </label>
                ))}
              </div>
              <FieldError message={errors.skills?.message} />
            </fieldset>

            <div className="mt-4 rounded-2xl bg-indigo-50 p-4 text-sm text-indigo-900">
              <p>
                <span className="font-bold">Live department:</span>{" "}
                {selectedDepartment || "Not selected"}
              </p>
              <p className="mt-1">
                <span className="font-bold">Live gender:</span>{" "}
                {selectedGender || "Not selected"}
              </p>
              <p className="mt-1">
                <span className="font-bold">Live skills:</span>{" "}
                {selectedSkills.length
                  ? selectedSkills.join(", ")
                  : "None selected"}
              </p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
                🔐
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Account security
                </h2>
                <p className="text-sm text-slate-500">
                  Create and confirm your password
                </p>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-600">
              Form tools
            </h3>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => alert(JSON.stringify(getValues(), null, 2))}
                className="w-full rounded-xl bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:w-auto"
              >
                Get Values
              </button>
              <button
                type="button"
                onClick={fillDummyData}
                className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:w-auto"
              >
                Fill Dummy Data
              </button>
              <button
                type="button"
                onClick={validateAge}
                className="w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-200 sm:w-auto"
              >
                Validate Age
              </button>
              <button
                type="button"
                onClick={validatePasswords}
                className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 sm:w-auto"
              >
                Validate Passwords
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="w-full rounded-xl bg-rose-100 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-100 sm:w-auto"
              >
                Reset Form
              </button>
            </div>
          </section>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full rounded-xl px-5 py-3.5 text-base font-bold text-white shadow-lg transition focus:outline-none focus:ring-4 ${
              !isValid || isSubmitting
                ? "cursor-not-allowed bg-slate-300 shadow-none focus:ring-slate-100"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-100 hover:-translate-y-0.5 hover:from-emerald-600 hover:to-teal-700 focus:ring-emerald-200"
            }`}
          >
            {isSubmitting ? "Submitting..." : "✓ Submit Registration"}
          </button>
          <p className="text-center text-xs text-slate-400">
            All fields are validated using your Zod schema.
          </p>
        </form>

        {submittedData && (
          <section className="mt-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl shadow-emerald-100/70">
            <div className="flex items-start gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-4 text-white sm:items-center sm:px-6 sm:py-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl">
                ✓
              </span>
              <div>
                <h2 className="text-xl font-extrabold">
                  Registration successful!
                </h2>
                <p className="text-sm text-emerald-50">
                  Submitted employee details
                </p>
              </div>
            </div>
            <div className="overflow-x-auto p-4 sm:p-6">
              <table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-xl text-left text-xs sm:text-sm">
                <tbody>
                  {Object.entries(submittedData).map(([key, value], index) => (
                    <tr
                      key={key}
                      className={
                        index % 2 === 0 ? "bg-emerald-50/70" : "bg-white"
                      }
                    >
                      <th className="w-2/5 break-words border-b border-emerald-100 px-2 py-3 font-bold capitalize text-emerald-900 sm:px-4">
                        {key.replace(/([A-Z])/g, " $1")}
                      </th>
                      <td className="break-words [overflow-wrap:anywhere] border-b border-emerald-100 px-2 py-3 text-slate-700 sm:px-4">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : String(value ?? "")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
