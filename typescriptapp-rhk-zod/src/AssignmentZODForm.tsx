import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Styles.css";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(/^[A-Za-z]+$/, "Username must contain only alphabets"),

    age: z
      .string()
      .transform(Number)
      .pipe(
        z
          .number()
          .int("Age must be an integer")
          .min(18, "Minimum age is 18")
          .max(60, "Maximum age is 60"),
      ),

    /*  salary: z
      .string()
      .transform(Number)
      .pipe(
        z
          .number()
          .positive("Salary must be positive")
          .refine((val) => val > 10000, "Salary must be greater than 10000"),
      ), */
    salary: z
      .string()
      .min(1, "Salary is required")
      .refine(
        (val) => !Number.isNaN(Number(val)),
        "Salary must contain a valid number",
      )
      .transform(Number)
      .pipe(
        z
          .number()
          .positive("Salary must be positive")
          .refine((val) => val > 10000, "Salary must be greater than 10000"),
      ),

    department: z.enum(["HR", "FINANCE", "SALES", "IT"]),

    joiningDate: z
      .string()
      .refine((val) => !isNaN(new Date(val).getTime()), "Invalid date format")
      .refine(
        (val) => new Date(val) <= new Date(),
        "Joining date cannot be in the future",
      ),

    gender: z.enum(["Male", "Female", "Other"]),

    skills: z.array(z.string()).min(1, "Please select at least one skill"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
/*
Generic	    Meaning
FormInput	  Values entered by the user
unknown	    No specific context type defined
FormOutput	Validated and transformed values
  */

/* Form input type */
type FormInput = z.input<typeof schema>;

/* Zod output type */
type FormOutput = z.output<typeof schema>;

export default function AssignmentZODForm() {
  const [submittedData, setSubmittedData] = useState<FormOutput | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
    trigger,
    watch,
    getValues,
  } = useForm<FormInput, unknown, FormOutput>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      age: "",
      salary: "",
      department: undefined,
      joiningDate: "",
      gender: undefined,
      skills: [],
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormOutput> = (data) => {
    console.log("Submitted Data:", data);
    console.log("Age type:", typeof data.age);
    console.log("Salary type:", typeof data.salary);

    alert("Form submitted successfully! Check console.");
    setSubmittedData(data);
    reset();
  };

  const fillDummyData = () => {
    setValue("username", "Max", { shouldValidate: true });
    setValue("age", "28", { shouldValidate: true });
    setValue("salary", "25000", { shouldValidate: true });
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
    alert(valid ? "Passwords are valid!" : "Password validation failed!");
  };

  const selectedDepartment = watch("department");
  const selectedGender = watch("gender");
  const selectedSkills = watch("skills");

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">
        Employee Registration Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        <div>
          <label className="font-semibold">Gender</label>
          <div className="flex gap-5 mt-2">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="flex items-center gap-2">
                <input type="radio" value={gender} {...register("gender")} />
                {gender}
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-600 text-sm">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Skills</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["React", "Node.js", "Python", "Java"].map((skill) => (
              <label key={skill} className="flex items-center gap-2">
                <input type="checkbox" value={skill} {...register("skills")} />
                {skill}
              </label>
            ))}
          </div>
          {errors.skills && (
            <p className="text-red-600 text-sm">{errors.skills.message}</p>
          )}
        </div>

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
                      {Array.isArray(value) ? value.join(", ") : String(value)}
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
/*
React Hook Form's useForm has three important generic parameters:
useForm<TFieldValues, TContext, TTransformedValues>()

So in your code:
Generic	Your type	Purpose
1st	FormInput	Type of values coming from the form
2nd	unknown	Type of optional context passed to the resolver
3rd	FormOutput	Type of values after Zod transformation


Why unknown?
You are not using any resolver context, so there is no specific type to provide.
Therefore:
unknown

means:
"I don't know / I'm not specifying a context type because I don't use one."

Suppose your form has a salary field, but the validation rule depends on the user's role.
interface FormContext {
  role: "admin" | "employee";
}

You could provide that context to useForm:
useForm<FormInput, FormContext, FormOutput>({
  resolver: zodResolver(schema),
  context: {
    role: "admin",
  },
});

FormInput   → form input type
unknown     → resolver context type
FormOutput  → transformed/validated output type
*/
