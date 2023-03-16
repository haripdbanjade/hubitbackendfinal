import React, { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiFillPlusCircle } from "react-icons/ai";
import AddCategorys from "../Categorys/AddCategorys";

const schema = yup.object().shape({
  course_name: yup.string().required("Course Name is required"),
  course_category: yup.string().required("Course Category  is required"),
  duration: yup.string().required("Course Duration is required"),
  description: yup.string().required("Description is required"),
});
const FormFields = [
  {
    name: "course_name",
    type: "text",
  },
  {
    name: "course_category",
    type: "select",
    options: [],
  },
  {
    name: "duration",
    type: "number",
  },
  {
    name: "description",
    type: "text",
  },
];

const AddCourse = () => {
  const [category, setCategory] = useState([]);
  const [first, setfirst] = useState("");
  const [newImg, setNewImg] = useState("");
  const [showCategorys, setShowCategorys] = useState(false);

  const postFormData = (e) => {
    // e.img = first;
    try {
      const formData = new FormData();
      formData.append("course_name", e.course_name);
      formData.append("course_category", e.course_category);
      formData.append("duration", e.duration);
      formData.append("description", e.description);
      formData.append("file", first[0]);

      axios.post("https://fullel-backend.adaptable.app/course/files", formData);
      toast.success("Data posted sucessfully");
    } catch (err) {
      toast.error("Data could not posted");
      console.log(err);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.files);
    setfirst(e.target.files);
    setNewImg(e.target.files[0]);
  };

  const FetchData = () => {
    try {
      axios
        .get("https://fullel-backend.adaptable.app/category")
        .then((res) => {
          setCategory(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchData();
  });
  let initData = [
    {
      _id: "0",
      category_name: "Choose category",
    },
  ];
  FormFields[1].options = [...category];
  return (
    <div className="flex mt-10 border-2 hover:border-2 shadow-lg w-[800px] px-10 py-6 hover:border-blue-500 transition-all delay-200 duration-200 relative ">
      <AiFillPlusCircle
        className="absolute right-11 top-24 text-2xl "
        onClick={() => {
          setShowCategorys(!showCategorys);
        }}
      />

      <div className="bg-white w-full rounded-md p-8">
        <Formik
          initialValues={{
            course_name: "",
            course_category: "",
            duration: "",
            description: "",
            image: "",
          }}
          validationSchema={schema}
          onSubmit={(val) => {
            postFormData(val);
          }}>
          {({ handleSubmit, values }) => {
            return (
              <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {FormFields.map((val, i) => {
                    if (val.type === "select") {
                      return (
                        <div key={i}>
                          <label
                            htmlFor={val.name}
                            className="block font-bold mb-2">
                            {val.name}
                          </label>
                          <Field
                            as={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className="border border-gray-400 p-2 rounded w-full">
                            <option value="" selected disabled>
                              {initData[0].category_name}
                            </option>
                            {val.options?.map((val, i) => {
                              return (
                                <option value={val.category_name} key={i}>
                                  {val.category_name}
                                </option>
                              );
                            })}
                          </Field>

                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-600"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div key={i}>
                          <label
                            htmlFor={val.name}
                            className="block font-bold mb-2">
                            {val.name}
                          </label>
                          <Field
                            type={val.type}
                            placeholder={`enter ${val.name}`}
                            name={val.name}
                            className="border border-gray-400 p-2 rounded w-full"
                          />
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-600"
                          />
                        </div>
                      );
                    }
                  })}
                  <ToastContainer />
                </div>

                <label htmlFor="image">
                  {console.log(newImg ? "work" : "none", "fired")}
                  <img
                    src={
                      newImg
                        ? URL.createObjectURL(newImg)
                        : "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                    }
                    className="w-56 mx-auto p-2 mt-6"
                    alt="preview"
                  />
                </label>
                <input
                  id="image"
                  // onSubmit={postFormData}
                  type={"file"}
                  accept=".png,.jpg,.jpeg,.gif"
                  required
                  // onChange={e => {
                  //   setfirst(e.target.files[0]);
                  // }}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="bg-mainColor mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div>
        {" "}
        <div className="relative top-[-230px] left-96 right-24">
          {showCategorys && <AddCategorys />}
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
