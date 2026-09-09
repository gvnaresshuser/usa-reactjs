import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

// --------------------------------------------------
// ZOD SCHEMA
// --------------------------------------------------

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),

    price: z.coerce
      .number()
      .positive("Price must be positive")
      .gt(10, "Price must be greater than 10"),

    email: z.string().min(1, "Email is required").email("Invalid email format"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })

  // CROSS-FIELD VALIDATION
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
//path tells Zod which field the validation error belongs to.

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function DemoFormWithZODPasswordsCrossFldVald() {
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
    mode: "onChange",
    resolver: zodResolver(schema),

    defaultValues: {
      name: "",
      price: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------

  const onSubmit = (data) => {
    console.log("✅ Submitted:", data);
    reset();
  };

  // --------------------------------------------------
  // FILL DUMMY DATA
  // --------------------------------------------------

  const fillDummyData = () => {
    setValue("name", "Laptop", {
      shouldValidate: true,
    });

    setValue("price", "1000", {
      shouldValidate: true,
    });

    setValue("email", "demo@example.com", {
      shouldValidate: true,
    });

    setValue("password", "abc123", {
      shouldValidate: true,
    });

    setValue("confirmPassword", "abc123", {
      shouldValidate: true,
    });
  };

  // --------------------------------------------------
  // VALIDATE PRICE ONLY
  // --------------------------------------------------

  const validatePrice = async () => {
    const isValid = await trigger("price");

    if (!isValid) {
      alert("❌ Price validation failed!");
    } else {
      alert("✅ Price is valid!");
    }
  };

  // --------------------------------------------------
  // VALIDATE PASSWORDS
  // --------------------------------------------------

  const validatePasswords = async () => {
    const isValid = await trigger(["password", "confirmPassword"]);

    if (!isValid) {
      alert("❌ Password validation failed!");
    } else {
      alert("✅ Passwords are valid!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-amber-500 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Demo Form (with Zod)-Cross Field Validation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* NAME */}
        <div>
          <label className="block mb-1 font-medium">Name</label>

          <input
            {...register("name")}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter product name"
          />

          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className="block mb-1 font-medium">Price</label>

          <input
            {...register("price")}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition ${
              errors.price
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter price"
          />

          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block mb-1 font-medium">Email</label>

          <input
            {...register("email")}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter email"
          />

          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block mb-1 font-medium">Password</label>

          <input
            type="password"
            {...register("password")}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter password"
          />

          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Confirm password"
          />

          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* WATCH */}
        <p className="text-gray-700 text-sm">
          <strong>Live Price:</strong> {watch("price")}
        </p>

        {/* BUTTONS */}
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
            Validate Price
          </button>

          <button
            type="button"
            onClick={validatePasswords}
            className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm"
          >
            Validate Passwords
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
          >
            Reset Form
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            isSubmitting || !isValid
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
Why is this called cross-field validation?
Normally, Zod can validate one field independently:
password: z.string().min(6)
But here we need:
password
    ↓
compare
    ↓
confirmPassword

Therefore we validate the entire object:
.refine((data) => data.password === data.confirmPassword)
data contains:
{
    name: "Laptop",
    price: 1000,
    email: "demo@example.com",
    password: "abc123",
    confirmPassword: "abc123"
}
So Zod can compare:
data.password === data.confirmPassword
----------------------------------------
 focus: means: Apply this class only when the input currently has
               focus. 
*/
