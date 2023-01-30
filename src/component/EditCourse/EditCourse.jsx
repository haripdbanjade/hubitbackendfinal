import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
// import { data } from "autoprefixer";
// validation section
const schema = yup.object().shape({
    course_name: yup.string().required("Course Name is required"),
    course_category: yup.string().required("Course Category  is required"),
    duration: yup.string().required("Course Duration is required"),
    description: yup.string().required("Description is required"),
    // image: yup.string().required("File is required"),
});
function EditCourse() {
    const [getCourse, setCourse] = useState([])
    console.log(getCourse);
    const { id } = useParams();
    const getData = async () => {
        try {
            const res = await axios.get(`https://himal-hubitbackend.adaptable.app/course/${id}`)
            setCourse(res.data.data);
            console.log(res.data.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        getData();
    }, [id])
    console.log(id);
    const [first, setfirst] = useState([0]);
    const [newImg, setNewImg] = useState("");
    const postFormData = (val) => {
        // e.img = first;
        try {
            const formData = new FormData();
            formData.append("course_name", val.course_name);
            formData.append("course_category", val.course_category);
            formData.append("duration", val.duration);
            formData.append("description", val.description);
            formData.append("file", first[0]);

            return axios.put(`https://himal-hubitbackend.adaptable.app/course/files/${id}`, formData);
        }
        catch (err) {
            console.log("nope");
            console.log(err);
        }
    };
    const handleChange = val => {
        console.log(val.target.files);
        setfirst(val.target.files);
        setNewImg(val.target.files[0])
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
                className={` w-[60%] flex justify-center mx-auto text-center items-center   pt-10`}
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
                                <div className="grid grid-cols-2 gap-3 mt-[20%] border-1 border-red-600 shadow-lg shadow-gray-500">
                                    {/* maping using object and map function */}
                                    {FormFields.map((val, i) => {
                                        if (val.type === "select") {
                                            return (
                                                <div className="flex flex-col gap-2" key={i}>
                                                    {/* creating form */}
                                                    <label htmlFor={val.name}>{val.name}</label>
                                                    <Field
                                                        // value={getCourse.name}
                                                        as={val.type}
                                                        placeholder={`enter  ${val.name}`}
                                                        name={val.name}
                                                        className=" border-2 border-black  outline-none p-2 rounded-md text-center m-2"
                                                    >
                                                        {
                                                            val.option?.map((val, i) => {
                                                                return <option key={i} className="cursor-pointer bg-gray-300  font-bold w-[100%]" value={val.category_name} name={val.category_name}>{val.category_name}</option>
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
                                                        // value={getCourse.name}
                                                        type={val.type}
                                                        placeholder={`enter  ${val.name}`}
                                                        name={val.name}
                                                        className=" border-2 border-black  outline-none p-2 rounded-md text-center m-2"
                                                    />
                                                    {/* {console.log(values)} */}

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

export default EditCourse;
