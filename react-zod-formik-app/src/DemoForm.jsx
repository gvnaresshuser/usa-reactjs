import { useForm } from "react-hook-form";
import './App.css';

export default function DemoForm() {
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
        mode: "onChange", // validate as user types->https://react-hook-form.com/docs/useform#mode
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

    // Custom function to fill dummy values
    /*  const fillDummyData = () => {
         setValue("name", "Laptop");
         setValue("price", "1500");
         setValue("email", "demo@example.com");
     }; */
    const fillDummyData = () => {//https://react-hook-form.com/docs/useform/setvalue
        setValue("name", "Laptop", { shouldValidate: true });
        setValue("price", "1500", { shouldValidate: true });
        setValue("email", "demo@example.com", { shouldValidate: true });
    };

    // Custom validation trigger
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
                Demo Form
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
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

                {/*  
           validate: (val) => {
                if (val <= 0) return "Price must be positive";
                if (val <= 10) return "Price must be greater than 10";
            return true; 
            }
            */}


                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="text"//text,number
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            validate: {
                                positive: (val) =>
                                    val > 0 || "Price must be a positive number",

                                greaterThanTen: (val) =>
                                    val > 10 || "Price must be greater than 10",
                            },
                            /*
                            validate: (val) => {
                                if (val <= 0) return "Price must be positive";
                                if (val <= 10) return "Price must be greater than 10";
                                return true;
                            }
                            */
                        })}
                        className="w-full px-3 py-2 border rounded-lg"
                    />

                    {errors.price && (
                        <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                        })}
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
                            alert(
                                "Current values:\n" + JSON.stringify(getValues(), null, 2)
                            )
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
/*
HTML input values are always strings
1️⃣ HTML input values are always strings

So React Hook Form receives:
{ price: "1500" }  // string
2️⃣ Your validation checks strings

This validation:
validate: (val) => !isNaN(val) || "Price must be a number"
still works, because:
"1500" → !isNaN("1500") → true
"hello" → !isNaN("hello") → false

So the form behaves correctly even though price is a string, not a number.

But here’s the difference
Without valueAsNumber: true
price is string:
price: "1500"

With valueAsNumber: true
price is actual number:
price: 1500

So which one is better?
✔ If you only validate and show in UI → string is fine

(Your current code works)
✔ If you send data to a backend (Node, Python, Java, PHP) →

NUMBER is better

Because many backends expect:
"price": 1500
not:
"price": "1500"

Otherwise you must convert manually:
Number(data.price)

⭐ Best Practice

If price is supposed to be numeric (money, quantity, age, score):
👉 Always use:
valueAsNumber: true

This removes future bugs.
| Case                    | Works?  | Type of value     |
| ----------------------- | ------- | ----------------- |
| Without `valueAsNumber` | ✔ Works | `"1500"` (string) |
| With `valueAsNumber`    | ✔ Works | `1500` (number)   |
*/