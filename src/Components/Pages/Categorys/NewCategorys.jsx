import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

// validation section
const schema = yup.object().shape({
  // course_name: yup.string().required("Course Name is required"),
  category_name: yup.string().required(" Category name  is required"),
  color: yup.string().required("color is required"),
  // description: yup.string().required("Description is required"),
  // image: yup.string().required("File is required"),
});
function NewCategorys() {
  const [Categorys, setCategory] = useState(true);
  const [first, setfirst] = useState("");
  const [newImg, setNewImg] = useState("");
  const postFormData = (e) => {
    // e.img = first;
    try {
      const formData = new FormData();
      // formData.append("course_name", e.course_name);
      formData.append("category_name", e.category_name);
      formData.append("color", e.color);
      // formData.append("description", e.description);
      formData.append("file", first[0]);

      return axios.post(
        "https://hubitbackend.onrender.com/category/files",
        formData
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    console.log(e.target.files);
    setfirst(e.target.files);
    setNewImg(e.target.files[0]);
  };
  // Creating object for forms
  const FormFields = [
    {
      name: "category_name",
      type: "text",
      // as: "select",
    },
    {
      name: "color",
      type: "text",
    },
  ];

  return (
    <div className="mb-[5%] selection:text-white selection:bg-[#a0047d]">
      <div
        className={` w-[60%]  flex justify-center mx-auto text-center items-center   pt-6 ${
          Categorys ? "block" : "hidden"
        }
          }`}>
        {/* Form using formik package */}
        <Formik
          initialValues={{
            // course_name: "",
            category_name: "",
            color: "",
            // description: "",
            image: "",
          }}
          validationSchema={schema}
          onSubmit={(val) => {
            console.log(val);
            postFormData(val);

            // Submit message
            toast.success("Submit Successfully!!");
          }}>
          {({ handleSubmit, values }) => {
            return (
              <Form encType="multipart/form-data">
                <div className="flex border-2  flex-col items-center justify-center bg-gray-200 ">
                  <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
                    <div className="flex flex-col gap-3">
                      {/* maping using object and map function */}
                      {FormFields.map((val, i) => {
                        return (
                          <div className="flex flex-col gap-2" key={i}>
                            {/* creating form */}
                            <label
                              htmlFor={val.name}
                              className="text-gray-700 font-medium">
                              {val.name}
                            </label>
                            <Field
                              type={val.type}
                              placeholder={`Enter ${val.name}`}
                              name={val.name}
                              className="border border-gray-400 rounded-md p-2 text-center"
                            />
                            {/* throw error message */}
                            <ErrorMessage
                              name={val.name}
                              component={"div"}
                              className="text-red-600 text-sm"
                            />
                          </div>
                        );
                      })}
                      <ToastContainer />
                    </div>

                    <div className="flex flex-col items-center justify-center mt-4">
                      <label htmlFor="image" className="mb-2">
                        <img
                          src={
                            newImg
                              ? URL.createObjectURL(newImg)
                              : "https://www.india.com/wp-content/uploads/2022/10/Mahakal-F.jpg"
                          }
                          className="w-full rounded-lg shadow-xl"
                          alt="preview"
                        />
                        <div className="bg-gray-200 text-gray-700 font-medium text-sm py-1 px-2 rounded-lg">
                          Upload Image
                        </div>
                      </label>
                      <input
                        id="image"
                        type="file"
                        accept=".png,.jpg,.jpeg,.gif"
                        required
                        className="hidden"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        type="submit"
                        className="bg-[#a0047d] text-white font-bold px-4 py-2 rounded-xl border-2 border-[#a0047d] hover:bg-white hover:text-[#a0047d] transition duration-300">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default NewCategorys;
