import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//-------------------------------------------------------
//INSTALL -> react-hook-form, @hookform/resolvers and zod
//-------------------------------------------------------
//https://react-hook-form.com/
//https://react-hook-form.com/docs/useform/formstate
//npm install react-hook-form
//npm install @hookform/resolvers

//https://zod.dev/basics
//npm install zod

// ✅ Zod schema
const productSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be under 50 characters")
        .regex(/^[A-Za-z0-9 ]+$/, "Name must be alphanumeric"),

    price: z
        .string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), { message: "Price must be a number" })
        .refine((val) => val >= 1 && val <= 10000, {
            message: "Price must be between 1 and 10000",
        }),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(200, "Description must be under 200 characters"),

    category: z
        .string()
        .default("Uncategorized")
        .refine(
            (val) =>
                ["Electronics", "Clothing", "Books", "Uncategorized"].includes(val),
            {
                message: "Invalid category",
            }
        ),
});

export default function ProductForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = (data) => {
        console.log(JSON.stringify(data, null, 2));
        //console.log(JSON.stringify(data, ["name","price"], 2));
        alert("✅ Submitted:\n\n" + JSON.stringify(data, null, 2));
    };
    /*
    {
        "name": "Gaming Laptop",
        "price": 1500,
        "description": "sdfdsadasdas",
        "category": "Electronics"
    }
    */

    return (
        <div className="max-w-md mx-auto p-6 bg-white border border-amber-300 shadow rounded mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"                        
                        {...register("name")}
                        className={`w-full px-3 py-2 border rounded outline-none transition
              ${errors.name ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
                    />
                    {errors.name && (
                        <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="text"
                        {...register("price")}
                        className={`w-full px-3 py-2 border rounded outline-none transition
              ${errors.price ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
                    />
                    {errors.price && (
                        <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register("description")}
                        className={`w-full px-3 py-2 border rounded outline-none resize-none transition
              ${errors.description ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
                        rows="3"
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        {...register("category")}
                        className={`w-full px-3 py-2 border rounded outline-none transition
              ${errors.category ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
                    >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Books">Books</option>
                        <option value="Test">Test</option>
                        <option value="Uncategorized">Uncategorized</option>
                    </select>
                    {errors.category && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.category.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
/*
Whenever the form values CHANGE or you SUBMIT:
zodResolver internally calls safeParse() for you
It validates the form data against productSchema
Returns validation errors (if any) to formState.errors
You never manually call parse() or safeParse() in the frontend
-------------------------------------------------------------
Why you don’t need parse()
parse() throws exceptions → not friendly for forms
safeParse() returns { success, data, error } → safer
zodResolver already uses safeParse() under the hood
So errors appear in formState.errors automatically

---------------------------------------------------------------------------------
USE ONLY zodResolver IN FORMS AS IT INTERNALLY CALLS safeParse() AFTER VALIDATION
---------------------------------------------------------------------------------

parse() - 
| Case          | Output                        |
| ------------- | ----------------------------- |
| Valid input   | returns validated object      |
| Invalid input | throws error → must be caught |


safeParse() - 
| Case    | Output                             |
| ------- | ---------------------------------- |
| Valid   | `{ success: true, data: {...} }`   |
| Invalid | `{ success: false, error: {...} }` |

✅ Conclusion
Using zodResolver = frontend validation handled automatically
No manual parse() required
Errors appear in formState.errors
Recommended for React forms with react-hook-form + Zod
*/