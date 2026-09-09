import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import './Styles.css';

// --------------------------------------
// ✅ ZOD SCHEMA
// --------------------------------------
const schema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .regex(/^[A-Za-z]+$/, "Username must contain only alphabets"),

    age: z.preprocess(
        (val) => Number(val),
        z
            .number({ invalid_type_error: "Age must be a number" })
            .int("Age must be an integer")
            .min(18, "Minimum age is 18")
            .max(60, "Maximum age is 60")
    ),

    salary: z.preprocess(
        (val) => Number(val),
        z
            .number({ invalid_type_error: "Salary must be a number" })
            .positive("Salary must be positive")
            .refine((val) => val > 10000, { message: "Salary must be greater than 10000" })
    ),

    department: z.enum(["HR", "FINANCE", "SALES", "IT"], {
        errorMap: () => ({ message: "Please select a valid department" }),
    }),

    joiningDate: z
        .string()
        .refine((val) => !isNaN(new Date(val).getTime()), "Invalid date format")
        .refine(
            (val) => new Date(val) <= new Date(),
            "Joining date cannot be in the future"
        ),
});

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
        },
    });

    // --------------------------------------
    // Submit Handler
    // --------------------------------------
    const onSubmit = (data) => {
        console.log("Submitted Data:", data);
        alert("Form submitted successfully! Check console.");
        setSubmittedData(data);   // store data
        reset();
    };

    // --------------------------------------
    // Dummy Data (with shouldValidate: true)
    // --------------------------------------
    const fillDummyData = () => {
        setValue("username", "Murali", { shouldValidate: true });
        setValue("age", "28", { shouldValidate: true });
        setValue("salary", "25000", { shouldValidate: true });
        setValue("department", "IT", { shouldValidate: true });
        setValue("joiningDate", "2022-05-10", { shouldValidate: true });
    };

    // --------------------------------------
    // Validate Age Only
    // --------------------------------------
    const validateAge = async () => {
        const valid = await trigger("age");
        alert(valid ? "Age is valid!" : "Age validation failed!");
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
            <h1 className="text-2xl font-bold text-center mb-6">Employee Registration Form</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Username */}
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

                {/* Age */}
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

                {/* Salary */}
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

                {/* Department */}
                <div>
                    <label className="font-semibold">Department</label>
                    <select {...register("department")} className="w-full p-2 border rounded">
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

                {/* Joining Date */}
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

                {/* Live Watch Example */}
                <p className="text-sm text-gray-600">
                    <strong>Selected Department:</strong> {watch("department")}
                </p>

                {/* Action Buttons */}
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
                        onClick={() => reset()}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Reset Form
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`w-full py-2 rounded text-white font-semibold ${!isValid ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
            {submittedData && (
                <div className="mt-8 flex justify-center">
                    <div className="bg-white shadow-lg border border-green-400 rounded-2xl p-6 w-full max-w-md animate-fadeIn">

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full text-xl">
                                ✓
                            </div>
                            <h3 className="text-xl font-bold text-green-700">
                                Form Submitted Successfully!
                            </h3>
                        </div>

                        {/* Table */}
                        <table className="w-full border border-green-300 rounded-lg overflow-hidden">
                            <tbody>
                                {Object.entries(submittedData).map(([key, value]) => (
                                    <tr key={key} className="border-b last:border-none">
                                        <td className="p-3 font-semibold bg-green-50 capitalize border-r w-1/3">
                                            {key.replace(/([A-Z])/g, " $1")}
                                        </td>
                                        <td className="p-3 text-gray-700">
                                            {value}
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
