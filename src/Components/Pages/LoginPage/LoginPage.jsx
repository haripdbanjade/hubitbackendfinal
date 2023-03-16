import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="bg-[#f0f0f0]  shadow-xl rounded-md px-8 pt-4 pb-4 mb-4 w-[22rem] h-fit">
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-bold mb-2 text-center">
                userName
              </label>
              <Field
                type="userName"
                name="userName"
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-red-500 text-xs mt-1 text-center"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2 text-center">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1 text-center"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#a0047d] ml-12 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline ">
                {isSubmitting ? "Loading..." : "Login"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
