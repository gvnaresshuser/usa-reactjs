
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce
    .number()
    .positive("Price must be positive")
    .gt(10, "Price must be greater than 10"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

export default function DemoFormWithZOD() {
  const [submittedData, setSubmittedData] = useState<FormOutput | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<FormInput, unknown, FormOutput>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log("Submitted:", data);
    console.log("Price type:", typeof data.price);

    setSubmittedData(data as FormOutput);
    reset();
  };

  const fillDummyData = () => {
    setValue("name", "Laptop", { shouldValidate: true });
    setValue("price", "1000", { shouldValidate: true });
    setValue("email", "demo@example.com", { shouldValidate: true });
  };

  const validatePrice = async () => {
    const valid = await trigger("price");

    alert(valid ? "✅ Price is valid!" : "❌ Price validation failed!");
  };

  const price = watch("price") as string;

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
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter product name"
          />

          {errors.name && (
            <p className="text-red-600 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>

          <input
            {...register("price")}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
              errors.price
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter price"
          />

          {errors.price && (
            <p className="text-red-600 text-sm mt-1">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>

          <input
            {...register("email")}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            placeholder="Enter email"
          />

          {errors.email && (
            <p className="text-red-600 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Watch */}
        <p className="text-gray-700 text-sm">
          <strong>Live Price:</strong> {price}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={() =>
              alert(JSON.stringify(getValues(), null, 2))
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
          className={`w-full py-2 rounded-lg font-semibold ${
            isSubmitting || !isValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

      </form>

      {/* Submitted Data */}
      {submittedData && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg">
          <h3 className="font-bold text-green-700 mb-2">
            Submitted Data
          </h3>

          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}