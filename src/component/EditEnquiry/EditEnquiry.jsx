import React, { useState, useEffect } from 'react'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik"
import { useParams } from 'react-router-dom';
const schema = yup.object().shape({
    name: yup.string().required(" Name is required"),
    email: yup.string().required("email  is required").email("enter email"),
    phone: yup.string().required("phone is required").min(10, "not valid"),
    course: yup.string().required("course is required"),
    description: yup.string().required("Description is required")
    // image: yup.string().required("File is required"),
});
function EditEnquiry() {
    const [Enquire, setEnquiry] = useState([
        {
            name: "",
            email: "",
            phone: "",
            course: "",
            description: ""
        },


    ])
    const { id } = useParams();
    console.log(id);
    const getData = async () => {
        try {
            const res = await axios.get(`https://hubitbackend.onrender.com/inquire/${id}`)
            setEnquiry(res.data);
            console.log(res.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        getData();
    }, [id])

    const postFormData = (val) => {
        try {
            return axios.put(`https://hubitbackend.onrender.com/inquire/${id}`, val)
        } catch (error) {

        }
    }
    const FormFields = [
        {
            name: "name",
            type: "text",
        },
        {
            name: "email",
            type: "email",


        },
        {
            name: "phone",
            type: "text",
        },
        {
            name: "course",
            type: "text",
        },
        {
            name: "description",
            type: "text"
        }
    ];
    return (
        <div>
            <div className="border-1 border-red-600 w-[60%] flex justify-center mx-auto text-center items-center mt-5 shadow-lg shadow-gray-500 pt-10      ">
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        phone: "",
                        description: "",
                    }}
                    validationSchema={schema}
                    onSubmit={val => {
                        console.log(val);
                        postFormData(val)

                        // Submit message
                        toast.success("Submit Successfully!!");
                    }}
                >
                    {({ handleSubmit, values }) => {
                        return (
                            <Form className='mt-[10rem]'>
                                <div className='text-center'>Enquiry Form</div>
                                <div className=' grid grid-cols-2'>
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
                                <div className="bg-[#a0047d] text-white font-bold w-fit px-4 py-1 mx-auto rounded-xl mt-5 hover:bg-white border-2  border-[#a0047d] hover:text-[#a0047d] ">
                                    <button type="submit">submit</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default EditEnquiry