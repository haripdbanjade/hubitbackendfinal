import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import { useLocation, useParams } from "react-router-dom";
const URL = "http://192.168.1.157:4000/syallabus";

const schema = yup.object().shape({
  Section: yup.string().required("section  is required"),
  section_id: yup.string().required("section  is required"),

  // image: yup.string().required("File is required"),
});

const FormFields = [
  {
    name: "Section",
    type: "text",
  },
];

const EditSyallabus = () => {
  const [course, setCourse] = useState([]);

  const { id } = useParams();

  //   const getCourse = async () => {
  //     const res = await axios.get("https://fullel-backend.adaptable.app/course");
  //     setCourse(res.data.data);

  //     console.log(res.data._id);
  //   };
  const postFormData = async (val) => {
    console.log(val);
    try {
      await axios.put(`${URL}/${id}/${val.section_id}`, val).then((res) => {
        if (res.status === 201) {
          toast.success("the data posted");
        }
      });
    } catch (error) {
      toast.error("the data could not posted");
      console.log(error);
    }
  };
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
    setCourse(location.state);
    // getCourse();
  }, []);

  return (
    <div className="mt-20 px-20">
      <Formik
        initialValues={{
          Section: location.state.Section,
          section_id: location.state.section_id,
          // Section_id: "",
        }}
        validationSchema={schema}
        onSubmit={(val) => {
          console.log(val, "data");
          postFormData(val);
        }}>
        {({ handleSubmit, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {FormFields.map((val, i) => {
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
                })}
                <ToastContainer />
              </div>

              <button
                type={"submit"}
                className="bg-mainColor mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditSyallabus;
