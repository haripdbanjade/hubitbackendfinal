import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function ViewCourse() {
  const [course, setCourse] = useState([]);
  // Get request
  const FetchData = () => {
    try {
      axios
        .get("https://fullel-backend.adaptable.app/course")
        .then((res) => {
          console.log(res.data);
          setCourse(res.data.data);
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
  }, []);
  // Delete request
  const handleDelete = (_id) => {
    axios.delete(
      `https://fullel-backend.adaptable.app/course/${_id}`,
      handleDelete
    );
    alert(`Deleting item whose id is ${_id}`)
      .then((res) => console.log("deleted", res))
      .catch((err) => console.log(err));
  };
  // const handleUpdate = (_id) => {
  //   // update request
  //   axios
  //     .put(`https://hubitbackend-production.up.railway.app/course/${_id}`, handleUpdate)
  //     .then(res => console.log("updated", res))
  //     .catch(err => console.log(err))
  // }
  return (
    <div className="pr-5">
      <table className="table-auto w-full mt-10  rounded-lg shadow-lg">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              S.No
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Name
            </th>
            <th className="py-3 px-4 border-r border-b border-gray-200">
              Image
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Category
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Duration
            </th>
            <th className="py-3 px-10 border-r border-b border-gray-200">
              Description
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Action
            </th>
            <th className="py-3 px-6 border-b border-gray-200">
              View Syllabus
            </th>
          </tr>
        </thead>{" "}
        <tbody className="text-gray-600 text-sm font-light">
          {course.map((data, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 border-l text-center">{i + 1}</td>
              <td className="py-3 px-4 border-l border-r">
                {data.course_name}
              </td>
              <td className="py-3 px-4 border-l border-r">
                <div className="h-32 w-32">
                  <img
                    src={data.image}
                    className="object-cover w-full h-full"
                    alt="Course"
                  />
                </div>
              </td>
              <td className="py-3 px-4 border-l border-r">
                {data.course_category}
              </td>
              <td className="py-3 px-4 border-l border-r">{data.duration}</td>
              <td className="py-3 px-4 border-l border-r">
                {data.description}
              </td>
              <td className="py-3 px-4 border-l border-r">
                <div className="flex gap-3">
                  <div
                    className="text-red-600 text-2xl cursor-pointer"
                    onClick={() => {
                      handleDelete(data._id);
                    }}>
                    <RiDeleteBin6Line />
                  </div>
                  <Link
                    className="text-blue-400 text-2xl font-bold cursor-pointer"
                    state={data}
                    to={{
                      pathname: `/editcourse/${data._id}`,
                    }}>
                    <GrUpdate />
                  </Link>
                </div>
              </td>
              <td className="py-3 px-4 border-l">
                <Link
                  className="text-2xl py-[1px] px-4 border-2 shadow-md hover:shadow-gray-100 font-bold "
                  to={`/syllabus/${data._id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCourse;
