import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

// ✅ Define schema with Zod
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  /* price: z
        .string()
        .min(1, "Price is required")
        .refine((val) => !isNaN(val), { message: "Price must be a number" }), */
  price: z.coerce
    .number()
    .positive("Price must be positive")
    .gt(10, "Price must be greater than 10"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export default function DemoFormWithZOD() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
        watch,
        setValue,
        getValues,
        trigger,
    } = useForm({
        mode: "onChange", // validate as user types
        resolver: zodResolver(schema), // ✅ use zod schema here
        defaultValues: {
            name: "",
            price: "",
            email: "",
        },
    });

    // Submit handler
    const onSubmit = (data) => {
        console.log("✅ Submitted:", data);
        reset(); // clear form after submit
    };

    // Fill dummy values - THOUGH WE FILL VALUES - SUBMIT BUTTON IS STILL DISABLED
    //you did NOT trigger validation, so React Hook Form does not re-check the form,
    //and therefore:
    //isValid stays false
    //Submit button stays disabled
    //THEREFORE ADD - { shouldValidate: true } - AS SEEN BELOW TO INVOKE VALIDATION 
    //AND HENCE isValid becomes true and submit button enabled
    /* const fillDummyData = () => {
        setValue("name", "Laptop");
        setValue("price", "1500");
        setValue("email", "demo@example.com");
    }; */

    //{ shouldValidate: true } - TRIGGERS VALIDATION WHEN SETTING VALUES
    //SUBMIT BUTTON IS ENABLED AS isValid becomes true
    const fillDummyData = () => {
        setValue("name", "Laptop", { shouldValidate: true });
        setValue("price", "1000", { shouldValidate: true });
        setValue("email", "demo@example.com", { shouldValidate: true });
    };


    // Trigger validation only for price
    const validatePrice = async () => {
        const isValid = await trigger("price");
        if (!isValid) {
            alert("❌ Price validation failed!");
        } else {
            alert("✅ Price is valid!");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-amber-500 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Demo Form (with Zod)
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        {...register("name")}
                        className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition ${errors.name
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                            }`}
                        placeholder="Enter product name"
                    />
                    {errors.name && (
                        <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        {...register("price")}
                        className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition ${errors.price
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                            }`}
                        placeholder="Enter price"
                    />
                    {errors.price && (
                        <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        {...register("email")}
                        className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition ${errors.email
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                            }`}
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Watch Example */}
                <p className="text-gray-700 text-sm">
                    <strong>Live Price:</strong> {watch("price")}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            alert("Current values:\n" + JSON.stringify(getValues(), null, 2))
                        }
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
                    >
                        Get Values
                    </button>

                    <button
                        type="button"
                        onClick={fillDummyData}
                        className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm"
                    >
                        Fill Dummy Data
                    </button>

                    <button
                        type="button"
                        onClick={validatePrice}
                        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm"
                    >
                        Validate Price Only
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                    >
                        Reset Form
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`w-full py-2 rounded-lg font-semibold transition ${isSubmitting || !isValid
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white shadow"
                        }`}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
