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
function AddCourse({ Categorys }) {
    const [first, setfirst] = useState("");
    const [newImg, setNewImg] = useState("");
    const postFormData = e => {
        // e.img = first;
        try {
            const formData = new FormData();
            // formData.append("course_name", e.course_name);
            formData.append("category_name", e.category_name);
            formData.append("color", e.color);
            // formData.append("description", e.description);
            formData.append("file", first[0]);

            return axios.post("https://hubitbackend.onrender.com/category/files", formData);
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
                className={` w-[60%] flex justify-center mx-auto text-center items-center mt-5  pt-10 ${Categorys ? "block" : "hidden"}
          }`}
            >
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
                    onSubmit={val => {
                        console.log(val);
                        postFormData(val);

                        // Submit message
                        toast.success("Submit Successfully!!");
                    }}
                >
                    {({ handleSubmit, values }) => {
                        return (
                            <Form encType="multipart/form-data shadow-lg shadow-gray-500 border-2">
                                <div className="gap-3 ">
                                    {/* maping using object and map function */}
                                    {FormFields.map((val, i) => {
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
                                    })}
                                    <ToastContainer />
                                </div>

                                <label htmlFor="image">
                                    {console.log(newImg ? "work" : "none", "fired")}
                                    <img
                                        src={
                                            newImg
                                                ? URL.createObjectURL(newImg)
                                                : "https://www.india.com/wp-content/uploads/2022/10/Mahakal-F.jpg"
                                        }
                                        className="w-1/3 mx-auto p-3"
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
            </div>
        </div>
    );
}

export default AddCourse;
