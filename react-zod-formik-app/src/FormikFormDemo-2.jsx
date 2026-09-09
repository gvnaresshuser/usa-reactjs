import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

// npm install formik yup
// FormikFormDemo-2.jsx

export default function FormikFormDemo() {
  // --------------------------------------
  // Submitted data
  // --------------------------------------

  const [submittedData, setSubmittedData] = useState(null);

  // --------------------------------------
  // Initial Values
  // --------------------------------------

  const initialValues = {
    name: "",
    email: "",
    message: "",
    country: "",
    gender: "",
    skills: [],
    subscribe: false,
    topics: "",
  };

  // --------------------------------------
  // Validation Schema
  // --------------------------------------

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(300, "Message must not exceed 300 characters"),

    country: Yup.string().required("Country is required"),

    gender: Yup.string().required("Gender is required"),

    skills: Yup.array().min(1, "Select at least one skill"),

    topics: Yup.string().when("subscribe", {
      is: true,

      then: (schema) => schema.required("Please enter topics"),

      otherwise: (schema) => schema.notRequired(),
    }),
  });

  // --------------------------------------
  // Submit Handler
  // --------------------------------------

  const onSubmit = (values) => {
    console.log("Submitted Values:", values);

    setSubmittedData(values);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 mb-10">
      {/* ================================= */}
      {/* FORM CARD */}
      {/* ================================= */}

      <div className="bg-white p-6 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Formik – Complex Form
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className="space-y-5">
              {/* ================================= */}
              {/* NAME */}
              {/* ================================= */}

              <div>
                <label className="block mb-1 font-medium">Name</label>

                <Field
                  name="name"
                  className="w-full border p-2 rounded-lg"
                  placeholder="Your name"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ================================= */}
              {/* EMAIL */}
              {/* ================================= */}

              <div>
                <label className="block mb-1 font-medium">Email</label>

                <Field
                  name="email"
                  type="email"
                  className="w-full border p-2 rounded-lg"
                  placeholder="you@example.com"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ================================= */}
              {/* MESSAGE */}
              {/* ================================= */}

              <div>
                <label className="block mb-1 font-medium">Message</label>

                <Field
                  name="message"
                  as="textarea"
                  rows="4"
                  className="w-full border p-2 rounded-lg"
                  placeholder="Your message..."
                />

                <ErrorMessage
                  name="message"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ================================= */}
              {/* COUNTRY */}
              {/* ================================= */}

              <div>
                <label className="block mb-1 font-medium">Country</label>

                <Field
                  name="country"
                  as="select"
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="">-- Select Country --</option>

                  <option value="india">India</option>

                  <option value="usa">USA</option>

                  <option value="uk">UK</option>
                </Field>

                <ErrorMessage
                  name="country"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ================================= */}
              {/* GENDER */}
              {/* ================================= */}

              <div>
                <label className="block mb-1 font-medium">Gender</label>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <Field type="radio" name="gender" value="male" />
                    Male
                  </label>

                  <label className="flex items-center gap-2">
                    <Field type="radio" name="gender" value="female" />
                    Female
                  </label>

                  <label className="flex items-center gap-2">
                    <Field type="radio" name="gender" value="other" />
                    Other
                  </label>
                </div>

                <ErrorMessage
                  name="gender"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ================================= */}
              {/* SKILLS */}
              {/* ================================= */}

              <div>
                <label className="block mb-1 font-medium">Skills</label>

                <div className="flex gap-6 flex-wrap">
                  <label className="flex items-center gap-2">
                    <Field type="checkbox" name="skills" value="HTML" />
                    HTML
                  </label>

                  <label className="flex items-center gap-2">
                    <Field type="checkbox" name="skills" value="CSS" />
                    CSS
                  </label>

                  <label className="flex items-center gap-2">
                    <Field type="checkbox" name="skills" value="JavaScript" />
                    JavaScript
                  </label>
                </div>

                <ErrorMessage
                  name="skills"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ================================= */}
              {/* SUBSCRIBE */}
              {/* ================================= */}

              <div className="flex items-center gap-3">
                <Field
                  type="checkbox"
                  name="subscribe"
                  className="w-5 h-5 accent-blue-600"
                />

                <label className="font-medium">Subscribe to newsletter</label>
              </div>

              {/* ================================= */}
              {/* TOPICS */}
              {/* ================================= */}

              {values.subscribe && (
                <div>
                  <label className="block mb-1 font-medium">
                    Preferred Topics
                  </label>

                  <Field
                    name="topics"
                    className="w-full border p-2 rounded-lg"
                    placeholder="e.g., React, JavaScript"
                  />

                  <ErrorMessage
                    name="topics"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              {/* ================================= */}
              {/* SUBMIT */}
              {/* ================================= */}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* ================================= */}
      {/* SUBMITTED RESULT */}
      {/* ================================= */}

      {submittedData && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-green-300 overflow-hidden">
          {/* Header */}

          <div className="bg-green-50 px-6 py-4 border-b border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
                ✓
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-700">
                  Form Submitted Successfully
                </h3>

                <p className="text-sm text-gray-600">Submitted form details</p>
              </div>
            </div>
          </div>

          {/* Table */}

          <div className="p-5">
            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left px-4 py-3">Field</th>

                    <th className="text-left px-4 py-3">Value</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Name */}

                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold bg-gray-50">Name</td>

                    <td className="px-4 py-3">{submittedData.name}</td>
                  </tr>

                  {/* Email */}

                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold bg-gray-50">
                      Email
                    </td>

                    <td className="px-4 py-3">{submittedData.email}</td>
                  </tr>

                  {/* Message */}

                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold bg-gray-50">
                      Message
                    </td>

                    <td className="px-4 py-3">{submittedData.message}</td>
                  </tr>

                  {/* Country */}

                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold bg-gray-50">
                      Country
                    </td>

                    <td className="px-4 py-3 capitalize">
                      {submittedData.country}
                    </td>
                  </tr>

                  {/* Gender */}

                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold bg-gray-50">
                      Gender
                    </td>

                    <td className="px-4 py-3 capitalize">
                      {submittedData.gender}
                    </td>
                  </tr>

                  {/* Skills */}

                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold bg-gray-50">
                      Skills
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {submittedData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>

                  {/* Subscribe */}

                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold bg-gray-50">
                      Newsletter
                    </td>

                    <td className="px-4 py-3">
                      {submittedData.subscribe ? (
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                          No
                        </span>
                      )}
                    </td>
                  </tr>

                  {/* Topics */}

                  <tr>
                    <td className="px-4 py-3 font-semibold bg-gray-50">
                      Preferred Topics
                    </td>

                    <td className="px-4 py-3">
                      {submittedData.topics ? submittedData.topics : "—"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
