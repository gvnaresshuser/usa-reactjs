import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// FormikFormDemo-1.jsx

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function FormikFormDemo() {
  const [submittedData, setSubmittedData] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },

    validationSchema,

    onSubmit: (values) => {
      setSubmittedData(values);
    },
  });

  return (
    <div className="max-w-xl mx-auto mt-10">
      {/* FORM */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-5 text-blue-700">
          Formik + Yup (Simple Form)
        </h2>

        {/* Name */}
        <div className="mb-4">
          <input
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full p-2 border rounded"
          />

          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border rounded"
          />

          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>

      {/* RESULT */}
      {submittedData && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-green-50 px-5 py-4 border-b">
            <h3 className="text-xl font-bold text-green-700">
              ✓ Form Submitted Successfully
            </h3>

            <p className="text-sm text-gray-600 mt-1">Submitted form details</p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-left px-4 py-3">Field</th>

                <th className="text-left px-4 py-3">Value</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(submittedData).map(([key, value]) => (
                <tr key={key} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-semibold bg-gray-50 capitalize">
                    {key}
                  </td>

                  <td className="px-4 py-3 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
