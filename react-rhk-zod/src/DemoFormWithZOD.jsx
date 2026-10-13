import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";
import { useState } from "react";
//-------------------------------------------------------
//INSTALL -> react-hook-form, @hookform/resolvers and zod
//-------------------------------------------------------
//https://react-hook-form.com/
//https://react-hook-form.com/docs/useform/formstate
//npm install react-hook-form
//npm install @hookform/resolvers

//https://zod.dev/basics
//npm install zod
//-------------------------------------------------------

//---------------------------------------------
/*   
const schema = z.object({
  name: z.string().min(1, "Name is required"), 
  price: z.coerce
    .number()
    .positive("Price must be positive")
    .gt(10, "Price must be greater than 10"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
}); */
//---------------------------------------------

// ✅ Define schema with Zod
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  //For a string, .min(1) checks that the string contains at least one character.
  /* price: z
        .string()
        .min(1, "Price is required")
        .refine((val) => !isNaN(val), { message: "Price must be a number" }), 
  */
  //.refine() Checks whether the string represents a number
  //refine() is used to implement custom validation rules when built-in validators
  // such as .min(), .max(), .positive(), and .email() are not sufficient.
  //https://zod.dev/api#numbers
  price: z.coerce
    .number()
    .positive("Price must be positive")
    .gt(10, "Price must be greater than 10"),

  //--------------------------------------------------------
  //In Zod, coerce converts an input value from one data type to
  //another before validation.
  //z.coerce.number() converts the input value into a JavaScript number using the
  //built-in Number() conversion.
  //--------------------------------------------------------

  email: z.string().min(1, "Email is required").email("Invalid email format"),
});
//https://zod.dev/api?id=emails#emails

export default function DemoFormWithZOD() {
  const [submittedData, setSubmittedData] = useState(null);
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
  //In React Hook Form:
  //- setValue() – Sets or updates the value of a specific form field programmatically.
  //- getValues() – Retrieves the current value(s) of form fields without subscribing to changes.

  // Submit handler
  const onSubmit = (data) => {
    console.log("✅ Submitted:", data);
    setSubmittedData(data); // Store submitted data
    reset(); // Clear the form
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
    setSubmittedData(null);
  };

  // Trigger validation only for price
  const validatePrice = async () => {
    //trigger - Run validation for the price field right now.
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

        {/* Price */}
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

        {/* Email */}
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

        {/* Watch Example */}
        <p className="text-gray-700 text-sm">
          {/* watch() is mainly for reading/reacting to the current value. 
            It does not manually trigger validation.
            */}
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
          className={`w-full py-2 rounded-lg font-semibold transition ${
            isSubmitting || !isValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white shadow"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Submitted Data Table */}
      {submittedData && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-blue-600 mb-4">
            Submitted Product Details
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Field
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Value
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Name
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {submittedData.name}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Price
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {submittedData.price}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Email
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {submittedData.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/*
refine((val) => !isNaN(val), {
  message: "Price must be a number",
})
  --------------------------------------------------------------------
val — the value passed to the validation function.
isNaN(val) — checks whether val is NaN (Not a Number).
!isNaN(val) — ! means NOT, so the condition passes when val is not NaN.
message — the error message displayed if the condition returns false.
-----------------------------------------------------------------------
| Feature               | What it does with `price` 
|---------------------- |--------------------------                        
| `z.coerce.number()`   | Converts `"1000"` → `1000` 
| `watch("price")`      | Reads/displays the current price 
| `trigger("price")`    | Manually validates the price 

             PRICE INPUT
                  │
                  ▼
          "1000" (string)
             │
       ┌─────┴─────┐
       │           │
       ▼           ▼
 watch("price")  Zod validation
       │           │
       ▼           ▼
   displays       coerce
    "1000"          │
                    ▼
                   1000
                    │
              positive()
                    │
                  gt(10)
                    │
                    ▼
                  VALID
*/
/*
Function/Property	 What it does	                                                               Example
register	         Connects an input field to React Hook Form.	                               {...register("name")}
handleSubmit	     Validates the form and calls the submit handler if valid.	                 handleSubmit(onSubmit)
errors	           Stores validation errors for form fields.	                                 errors.name?.message
isSubmitting	     Indicates whether form submission is in progress.	                         isSubmitting
isValid	           Indicates whether the form is currently valid, based on validation.	       !isValid
reset	             Resets the form values and form state.	                                     reset()
watch	             Reads field values and re-renders the component when watched values change. watch("price")
setValue	         Sets or updates a field value programmatically.	                           setValue("price", "1000")
getValues	         Retrieves current form values without subscribing to changes.	             getValues()
trigger	           Manually runs validation for the whole form or specific fields.	           trigger("price")
*/
