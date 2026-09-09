import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
        alert("✅ Submitted:\n\n" + JSON.stringify(data, null, 2));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
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
