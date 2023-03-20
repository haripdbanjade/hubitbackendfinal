import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import LoadingPage from "../Loading/LoadingPage";
import { useParams } from "react-router-dom";
const URL = "https://fullel-backend.adaptable.app/syallabus";

const schema = yup.object().shape({
  course_name: yup.string().required("course  is required"),
  Section: yup.string().required("section  is required"),

  // image: yup.string().required("File is required"),
});

const FormFields = [
  {
    name: "course_name",
    type: "select",
  },
  {
    name: "Section",
    type: "text",
  },
];

const AddSyallabus = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getCourse = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fullel-backend.adaptable.app/course`
      );
      console.log(res.data.data);
      setCourse(res.data.data);
      setLoading(false);

      console.log(res.data._id);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const postFormData = async (val) => {
    console.log(val.course_name);
    try {
      setLoading(true);
      await axios.post(`${URL}/${val.course_name}`, val).then((res) => {
        if (res.status === 201) {
          toast.success("the data posted");
          setLoading(false);
        }
      });
    } catch (error) {
      toast.error("the data could not posted");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);
  let initData = [
    {
      _id: "0",
      course_name: "Choose course",
    },
  ];

  FormFields[0].options = [...course];
  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="mt-20 px-20">
          <Formik
            initialValues={{
              course_name: "",
              Section: "",
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
                                {initData[0].course_name}
                              </option>
                              {val.options?.map((val, i) => {
                                console.log(val);
                                return (
                                  <option value={val._id} key={i}>
                                    {val.course_name}
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

                  <button
                    type={"submit"}
                    disabled={loading}
                    className="bg-mainColor mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded">
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AddSyallabus;
