import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import { useParams } from "react-router-dom";
const G_URL = "https://fullel-backend.adaptable.app/syallabus";
const P_URL = "https://fullel-backend.adaptable.app/syallabus/subsection";

const schema = yup.object().shape({
  section_id: yup.string().required("course  is required"),
  subSection: yup.string().required("section  is required"),

  // image: yup.string().required("File is required"),
});

const FormFields = [
  {
    name: "section_id",
    type: "select",
    options: [],
  },
  {
    name: "subSection",
    type: "text",
  },
];

const SubSection = () => {
  const [course, setCourse] = useState([]);
  const { id } = useParams();

  const getCourse = async () => {
    const res = await axios.get(`${G_URL}/${id}`);
    setCourse(res.data);
  };
  const postFormData = async (val) => {
    console.log(val);
    try {
      await axios.post(`${P_URL}/${id}`, val).then((res) => {
        if (res.status === 201) {
          toast.success("the data posted");
        }
      });
    } catch (error) {
      toast.error("the data could not posted");
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);
  let initData = [
    {
      _id: "0",
      Section: "Choose subSyllabus",
    },
  ];

  FormFields[0].options = [...initData, ...course];
  return (
    <div>
      <div className="mt-20 px-20">
        <Formik
          initialValues={{
            section_id: "",
            subSection: "",
            // Section_id: "",
          }}
          validationSchema={schema}
          onSubmit={(val) => {
            console.log(val);
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
                  type={"submit"}
                  className="bg-mainColor mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      
    </div>
  );
};

export default SubSection;
