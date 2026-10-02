import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import "./Styles.css";

//-------------------------------------------------------
//INSTALL -> react-hook-form, @hookform/resolvers and zod
//-------------------------------------------------------
//https://react-hook-form.com/
//https://react-hook-form.com/docs/useform/formstate
//npm install react-hook-form
//npm install @hookform/resolvers

//https://zod.dev/basics
//npm install zod


const inputClass =
  "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const errorClass = "mt-1 text-sm font-medium text-red-600";

const optionClass =
  "flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm hover:border-blue-300 hover:bg-blue-50";

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
    department: z.enum(["HR", "FINANCE", "SALES", "IT", "XX"], {
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
   <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
     <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
       <div className="bg-gradient-to-r from-slate-800 to-blue-800 p-6 text-white">
         <h1 className="text-3xl font-bold">Employee Registration</h1>
         <p className="mt-1 text-blue-100">Enter employee details below</p>
       </div>

       <form
         onSubmit={handleSubmit(onSubmit)}
         className="space-y-7 p-6 sm:p-10"
       >
         <div className="grid gap-6 md:grid-cols-2">
           {/* Username */}
           <div>
             <label className={labelClass}>Username</label>
             <input
               {...register("username")}
               className={inputClass}
               placeholder="Enter username"
             />
             {errors.username && (
               <p className={errorClass}>{errors.username.message}</p>
             )}
           </div>

           {/* Age */}
           <div>
             <label className={labelClass}>Age</label>
             <input
               {...register("age")}
               className={inputClass}
               placeholder="Enter age"
             />
             {errors.age && <p className={errorClass}>{errors.age.message}</p>}
           </div>

           {/* Salary */}
           <div>
             <label className={labelClass}>Salary</label>
             <input
               {...register("salary")}
               className={inputClass}
               placeholder="Enter salary"
             />
             {errors.salary && (
               <p className={errorClass}>{errors.salary.message}</p>
             )}
           </div>

           {/* Department */}
           <div>
             <label className={labelClass}>Department</label>
             <select {...register("department")} className={inputClass}>
               <option value="">Select department</option>
               <option value="HR">HR</option>
               <option value="FINANCE">Finance</option>
               <option value="SALES">Sales</option>
               <option value="IT">IT</option>
             </select>
             {errors.department && (
               <p className={errorClass}>{errors.department.message}</p>
             )}
           </div>

           {/* Joining Date */}
           <div>
             <label className={labelClass}>Joining Date</label>
             <input
               type="date"
               {...register("joiningDate")}
               className={inputClass}
             />
             {errors.joiningDate && (
               <p className={errorClass}>{errors.joiningDate.message}</p>
             )}
           </div>

           {/* Gender */}
           <div>
             <label className={labelClass}>Gender</label>
             <div className="flex flex-wrap gap-2">
               {["Male", "Female", "Other"].map((item) => (
                 <label key={item} className={optionClass}>
                   <input
                     type="radio"
                     value={item}
                     {...register("gender")}
                     className="accent-blue-600"
                   />
                   {item}
                 </label>
               ))}
             </div>
             {errors.gender && (
               <p className={errorClass}>{errors.gender.message}</p>
             )}
           </div>

           {/* Skills */}
           <div className="md:col-span-2">
             <label className={labelClass}>Skills</label>
             <div className="grid gap-2 sm:grid-cols-4">
               {["React", "Node.js", "Python", "Java"].map((item) => (
                 <label key={item} className={optionClass}>
                   <input
                     type="checkbox"
                     value={item}
                     {...register("skills")}
                     className="accent-blue-600"
                   />
                   {item}
                 </label>
               ))}
             </div>
             {errors.skills && (
               <p className={errorClass}>{errors.skills.message}</p>
             )}
           </div>

           {/* Password */}
           <div>
             <label className={labelClass}>Password</label>
             <input
               type="password"
               {...register("password")}
               className={inputClass}
               placeholder="Enter password"
             />
             {errors.password && (
               <p className={errorClass}>{errors.password.message}</p>
             )}
           </div>

           {/* Confirm Password */}
           <div>
             <label className={labelClass}>Confirm Password</label>
             <input
               type="password"
               {...register("confirmPassword")}
               className={inputClass}
               placeholder="Confirm password"
             />
             {errors.confirmPassword && (
               <p className={errorClass}>{errors.confirmPassword.message}</p>
             )}
           </div>
         </div>

         {/* Watch */}
         <div className="rounded-2xl bg-blue-50 p-4 text-sm text-slate-600">
           <p>
             <b>Department:</b> {selectedDepartment || "Not selected"}
           </p>
           <p>
             <b>Gender:</b> {selectedGender || "Not selected"}
           </p>
           <p>
             <b>Skills:</b> {selectedSkills?.join(", ") || "None"}
           </p>
         </div>

         {/* Actions */}
         <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
           <button
             type="button"
             onClick={() => alert(JSON.stringify(getValues(), null, 2))}
             className="rounded-xl bg-slate-700 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
           >
             Get Values
           </button>

           <button
             type="button"
             onClick={fillDummyData}
             className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
           >
             Fill Dummy Data
           </button>

           <button
             type="button"
             onClick={validateAge}
             className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-600"
           >
             Validate Age
           </button>

           <button
             type="button"
             onClick={validatePasswords}
             className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700"
           >
             Validate Passwords
           </button>

           <button
             type="button"
             onClick={() => reset()}
             className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
           >
             Reset Form
           </button>
         </div>

         {/* Submit */}
         <button
           type="submit"
           disabled={!isValid || isSubmitting}
           className={`w-full rounded-xl py-3 font-bold text-white ${
             isValid
               ? "bg-emerald-600 hover:bg-emerald-700"
               : "cursor-not-allowed bg-slate-300"
           }`}
         >
           {isSubmitting ? "Submitting..." : "Submit Employee"}
         </button>
       </form>

       {/* Submitted Data */}
       {submittedData && (
         <div className="border-t bg-emerald-50 p-6">
           <div className="overflow-hidden rounded-2xl bg-white shadow">
             <h3 className="bg-emerald-100 p-4 text-lg font-bold text-emerald-800">
               ✓ Form Submitted Successfully!
             </h3>

             <table className="w-full text-sm">
               <tbody>
                 {Object.entries(submittedData).map(([key, value]) => (
                   <tr key={key} className="border-t">
                     <td className="w-1/3 bg-slate-50 p-3 font-semibold capitalize">
                       {key.replace(/([A-Z])/g, " $1")}
                     </td>
                     <td className="p-3">
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
   </div>
 );
}
/*

.regex(/^[A-Za-z]+$/

| Part 			  | Meaning 
|-----------	|---------
| `/ ... /` 	| Start/end of regex 
| `^` 			  | Start of the string 
| `[A-Za-z]` 	| Any letter from A–Z or a–z 
| `+` 			  | One or more characters 
| `$` 			  | End of the string 
*/
/*
With shouldValidate: true
setValue("username", "Murali", {
  shouldValidate: true
});

means:
Set value
   ↓
Run validation
   ↓
Update errors
   ↓
Update form validity

So if "Murali" satisfies your Zod rules:
z.string()
  .min(3)
  .regex(/^[A-Za-z]+$/)

the validation error for username will be cleared.
-----------------------------------------------------
Fill Dummy Data
      ↓
Values are changed
      ↓
But validation is not explicitly triggered by setValue()
      ↓
errors / isValid may not immediately reflect those new values

With:
{ shouldValidate: true }

you are saying:
"Set this value and immediately validate it."

One important distinction
Your form also has:
mode: "onChange"

   Pasted markdown
That controls validation when the user changes form fields through normal interaction.
*/
