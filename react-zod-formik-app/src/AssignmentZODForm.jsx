import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import "./Styles.css";

// --------------------------------------
// ZOD SCHEMA
// --------------------------------------

const schema = z
  .object({
    // Username
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(/^[A-Za-z]+$/, "Username must contain only alphabets"),

    // Age
    age: z.preprocess(
      (val) => Number(val),
      z
        .number({
          invalid_type_error: "Age must be a number",
        })
        .int("Age must be an integer")
        .min(18, "Minimum age is 18")
        .max(60, "Maximum age is 60"),
    ),

    // Salary
    salary: z.preprocess(
      (val) => Number(val),
      z
        .number({
          invalid_type_error: "Salary must be a number",
        })
        .positive("Salary must be positive")
        .refine((val) => val > 10000, {
          message: "Salary must be greater than 10000",
        }),
    ),

    // Department
    department: z.enum(["HR", "FINANCE", "SALES", "IT"], {
      errorMap: () => ({
        message: "Please select a valid department",
      }),
    }),

    // Joining Date
    joiningDate: z
      .string()
      .refine((val) => !isNaN(new Date(val).getTime()), "Invalid date format")
      .refine(
        (val) => new Date(val) <= new Date(),
        "Joining date cannot be in the future",
      ),

    // --------------------------------------
    // RADIO BUTTON
    // --------------------------------------

    gender: z.enum(["Male", "Female", "Other"], {
      errorMap: () => ({
        message: "Please select gender",
      }),
    }),

    // --------------------------------------
    // CHECKBOXES
    // --------------------------------------

    skills: z.array(z.string()).min(1, "Please select at least one skill"),

    // --------------------------------------
    // PASSWORD
    // --------------------------------------

    password: z.string().min(6, "Password must be at least 6 characters"),

    // --------------------------------------
    // CONFIRM PASSWORD
    // --------------------------------------

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })

  // --------------------------------------
  // CROSS-FIELD VALIDATION
  // --------------------------------------

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// --------------------------------------
// COMPONENT
// --------------------------------------

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

  // --------------------------------------
  // SUBMIT HANDLER
  // --------------------------------------

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);

    alert("Form submitted successfully! Check console.");

    setSubmittedData(data);

    reset();
  };

  // --------------------------------------
  // FILL DUMMY DATA
  // --------------------------------------

  const fillDummyData = () => {
    setValue("username", "Murali", { shouldValidate: true });
    setValue("age", "28", { shouldValidate: true });
    setValue("salary", "25000", { shouldValidate: true });
    setValue("department", "IT", { shouldValidate: true });
    setValue("joiningDate", "2022-05-10", { shouldValidate: true });
    setValue("gender", "Male", { shouldValidate: true });
    setValue("skills", ["React", "Node.js"], { shouldValidate: true });
    setValue("password", "abc123", { shouldValidate: true });
    setValue("confirmPassword", "abc123", { shouldValidate: true });
  };

  // --------------------------------------
  // VALIDATE AGE ONLY
  // --------------------------------------

  const validateAge = async () => {
    const valid = await trigger("age");

    alert(valid ? "Age is valid!" : "Age validation failed!");
  };

  // --------------------------------------
  // VALIDATE PASSWORDS
  // --------------------------------------

  const validatePasswords = async () => {
    const valid = await trigger(["password", "confirmPassword"]);

    alert(valid ? "Passwords are valid!" : "Password validation failed!");
  };

  // --------------------------------------
  // WATCH VALUES
  // --------------------------------------
  const selectedDepartment = watch("department");
  const selectedGender = watch("gender");
  const selectedSkills = watch("skills");

  // --------------------------------------
  // JSX
  // --------------------------------------

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">
        Employee Registration Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* -------------------------------- */}
        {/* USERNAME */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Username</label>

          <input
            {...register("username")}
            className="w-full p-2 border rounded"
            placeholder="Enter username"
          />

          {errors.username && (
            <p className="text-red-600 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* AGE */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Age</label>

          <input
            {...register("age")}
            className="w-full p-2 border rounded"
            placeholder="Enter age"
          />

          {errors.age && (
            <p className="text-red-600 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* SALARY */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Salary</label>

          <input
            {...register("salary")}
            className="w-full p-2 border rounded"
            placeholder="Enter salary"
          />

          {errors.salary && (
            <p className="text-red-600 text-sm">{errors.salary.message}</p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* DEPARTMENT */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Department</label>

          <select
            {...register("department")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select department</option>
            <option value="HR">HR</option>
            <option value="FINANCE">FINANCE</option>
            <option value="SALES">SALES</option>
            <option value="IT">IT</option>
          </select>

          {errors.department && (
            <p className="text-red-600 text-sm">{errors.department.message}</p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* JOINING DATE */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Joining Date</label>

          <input
            type="date"
            {...register("joiningDate")}
            className="w-full p-2 border rounded"
          />

          {errors.joiningDate && (
            <p className="text-red-600 text-sm">{errors.joiningDate.message}</p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* GENDER - RADIO BUTTONS */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Gender</label>

          <div className="flex gap-5 mt-2">
            <label className="flex items-center gap-2">
              <input type="radio" value="Male" {...register("gender")} />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" value="Female" {...register("gender")} />
              Female
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" value="Other" {...register("gender")} />
              Other
            </label>
          </div>

          {errors.gender && (
            <p className="text-red-600 text-sm">{errors.gender.message}</p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* SKILLS - CHECKBOXES */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Skills</label>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" value="React" {...register("skills")} />
              React
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" value="Node.js" {...register("skills")} />
              Node.js
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" value="Python" {...register("skills")} />
              Python
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" value="Java" {...register("skills")} />
              Java
            </label>
          </div>

          {errors.skills && (
            <p className="text-red-600 text-sm">{errors.skills.message}</p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* PASSWORD */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Password</label>

          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
            placeholder="Enter password"
          />

          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* CONFIRM PASSWORD */}
        {/* -------------------------------- */}

        <div>
          <label className="font-semibold">Confirm Password</label>

          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full p-2 border rounded"
            placeholder="Confirm password"
          />

          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* -------------------------------- */}
        {/* WATCH */}
        {/* -------------------------------- */}

        <div className="text-sm text-gray-600">
          <p>
            <strong>Selected Department:</strong> {selectedDepartment}
          </p>

          <p>
            <strong>Selected Gender:</strong> {selectedGender}
          </p>

          <p>
            <strong>Selected Skills:</strong> {selectedSkills?.join(", ")}
          </p>
        </div>

        {/* -------------------------------- */}
        {/* ACTION BUTTONS */}
        {/* -------------------------------- */}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => alert(JSON.stringify(getValues(), null, 2))}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Get Values
          </button>

          <button
            type="button"
            onClick={fillDummyData}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Fill Dummy Data
          </button>

          <button
            type="button"
            onClick={validateAge}
            className="px-3 py-1 bg-yellow-500 text-white rounded"
          >
            Validate Age Only
          </button>

          <button
            type="button"
            onClick={validatePasswords}
            className="px-3 py-1 bg-purple-500 text-white rounded"
          >
            Validate Passwords
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Reset Form
          </button>
        </div>

        {/* -------------------------------- */}
        {/* SUBMIT */}
        {/* -------------------------------- */}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-2 rounded text-white font-semibold ${
            !isValid ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* -------------------------------- */}
      {/* SUBMITTED DATA */}
      {/* -------------------------------- */}

      {submittedData && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white shadow-lg border border-green-400 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full text-xl">
                ✓
              </div>

              <h3 className="text-xl font-bold text-green-700">
                Form Submitted Successfully!
              </h3>
            </div>

            <table className="w-full border border-green-300 rounded-lg overflow-hidden">
              <tbody>
                {Object.entries(submittedData).map(([key, value]) => (
                  <tr key={key} className="border-b last:border-none">
                    <td className="p-3 font-semibold bg-green-50 capitalize border-r w-1/3">
                      {key.replace(/([A-Z])/g, " $1")}
                    </td>

                    <td className="p-3 text-gray-700">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
