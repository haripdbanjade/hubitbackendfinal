import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr"
import * as yup from "yup";


// validation section
const schema = yup.object().shape({
  course_name: yup.string().required("Course Name is required"),
  course_category: yup.string().required("Course Category  is required"),
  duration: yup.string().required("Course Duration is required"),
  description: yup.string().required("Description is required"),
  // image: yup.string().required("File is required"),
});
function AddCourse({ setcourseActive, courseActive }) {
  const [first, setfirst] = useState("");
  const [newImg, setNewImg] = useState("");
  const postFormData = e => {
    // e.img = first;
    try {
      const formData = new FormData();
      formData.append("course_name", e.course_name);
      formData.append("course_category", e.course_category);
      formData.append("duration", e.duration);
      formData.append("description", e.description);
      formData.append("file", first[0]);

      return axios.post("https://himal-hubitbackend.adaptable.app/course/files", formData);
    }
    catch (err) {
      console.log(err);
    }
  };
  const handleChange = e => {
    console.log(e.target.files);
    setfirst(e.target.files);
    setNewImg(e.target.files[0])
  };
  // Creating object for forms
  const FormFields = [
    {
      name: "course_name",
      type: "text",
    },
    {
      name: "course_category",
      type: "select",
      option: [],
      // as: "select",

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
  const [category, setCategory] = useState([]);
  const FetchData = () => {
    try {
      axios.get("https://himal-hubitbackend.adaptable.app/category")
        .then((res) => {
          console.log(res.data);
          setCategory(res.data.data);
        })
        .catch(err => {
          console.log(err);
        })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    FetchData();
  }, [])

  let initData = [
    {
      _id: "0",
      category_name: "Choose category",
    }
  ]
  FormFields[1].option.push(...initData, ...category)
  return (
    <div className="selection:text-white selection:bg-[#a0047d] mb-[5%]">

      <div
        className={`border-1 border-red-600 w-[60%] flex justify-center mx-auto text-center items-center mt-5 shadow-lg shadow-gray-500 pt-10 ${courseActive ? "block " : "hidden"
          }`}
      >
        {/* Form using formik package */}
        <Formik
          initialValues={{
            course_name: "",
            course_category: "",
            duration: "",
            description: "",
            image: "",
          }}
          validationSchema={schema}
          onSubmit={val => {
            console.log(val);
            postFormData(val);

            // Submit message
            toast.success("Submit Successfully!!");
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form encType="multipart/form-data">
                <div className="grid grid-cols-2 gap-3">
                  {/* maping using object and map function */}
                  {FormFields.map((val, i) => {
                    if (val.type === "select") {
                      return (
                        <div className="flex flex-col gap-2" key={i}>
                          {/* creating form */}
                          <label htmlFor={val.name}>{val.name}</label>
                          <Field
                            as={val.type}
                            placeholder={`enter  ${val.name}`}
                            name={val.name}
                            className=" border-2 border-black  outline-none p-2 rounded-md text-center m-2"
                          >
                            {
                              val.option?.map((val, i) => {
                                return <option className="cursor-pointer bg-[#a0047d] text-white font-medium" value={val.category_name} name={val.category_name}>{val.category_name}</option>
                              })
                            }
                          </Field>
                          {console.log(values)}

                          {/* throw error message */}
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-600"
                          />
                        </div>
                      );
                    }
                    else {
                      return (
                        <div className="flex flex-col gap-2" key={i}>
                          {/* creating form */}
                          <label htmlFor={val.name}>{val.name}</label>
                          <Field
                            type={val.type}
                            placeholder={`enter  ${val.name}`}
                            name={val.name}
                            className=" border-2 border-black  outline-none p-2 rounded-md text-center m-2"
                          />
                          {console.log(values)}

                          {/* throw error message */}
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
                    className="w-1/3 mx-auto p-2"
                    alt="preview"
                  />
                </label>
                <input

                  id='image'
                  // onSubmit={postFormData}
                  type={"file"}
                  accept=".png,.jpg,.jpeg,.gif"
                  required
                  // onChange={e => {
                  //   setfirst(e.target.files[0]);
                  // }}
                  onChange={handleChange}
                />
                <div className="bg-[#a0047d] text-white font-bold w-fit px-4 py-1 mx-auto rounded-xl mt-5 hover:bg-white border-2  border-[#a0047d] hover:text-[#a0047d] ">
                  <button type="submit">submit</button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <Link className=" rounded-full  shadow-lg shadow-gray-500 text-4xl w-fit absolute top-[42%] right-[17%] hover:<p>ADD MORE</p>"
          to="/category"
        ><GrAddCircle /></Link>
      </div>

    </div>
  );
}

export default AddCourse;
