import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
const G_URL = "https://fullel-backend.adaptable.app/syallabus";
const P_URL = "https://fullel-backend.adaptable.app/syallabus/subsection";

const schema = yup.object().shape({
  section_name: yup.string().required("course  is required"),
  subSection: yup.string().required("section  is required"),
});

const FormFields = [
  {
    name: "section_name",
    type: "select",
    options: [],
  },
  {
    name: "subSection",
    type: "text",
  },
];

const AddSubSection = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getCourse = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${G_URL}/${id}`);
      setCourse(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const postFormData = async (val) => {
    console.log(val);
    try {
      setLoading(true);
      console.log(P_URL, "section_id");
      await axios.post(`${P_URL}/${id}`, val).then((res) => {
        if (res.status >= 200 && res.status <= 304) {
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
      Section: "Choose Section",
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
              section_id: "",
              subSection: "",
            }}
            validationSchema={schema}
            onSubmit={(val) => {
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
                                {initData[0].Section}
                              </option>
                              {val.options?.map((val, i) => {
                                return (
                                  <option value={val.section_id} key={i}>
                                    {val.Section}
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
                    type="submit"
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

export default AddSubSection;
