import axios from "axios";
import React, { useEffect } from "react";
const URL = "https://fullel-backend.adaptable.app/instructor";
const ViewInstructor = () => {
  const getData = async () => {
    const res = await axios.get(URL);
    console.log(res.data.data);
  };
  useEffect(() => {
    getData();
  });
  return <div>ViewInstructor</div>;
};

export default ViewInstructor;
