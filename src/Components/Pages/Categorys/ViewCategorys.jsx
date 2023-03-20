import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
function ViewCategorys() {
  const [course, setCourse] = useState([]);
  // Get request
  const FetchData = () => {
    try {
      axios
        .get("https://fullel-backend.adaptable.app/category")
        .then((res) => {
          console.log(res.data.data);
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
      `https://fullel-backend.adaptable.app/category/${_id}`,
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
    <div className="selection:text-white selection:bg-[#a0047d] relative left-0 ml-[-30px]">
      <table className="table-auto w-full mt-10 bg-white rounded-lg shadow-lg">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="border-2 px-4 py-2">SN</th>
            <th className="border-2 px-4 py-2">Category Name</th>
            {/* <th className="border-2 px-4 py-2">Image</th> */}
            {/* <th className="border-2 px-4 py-2">Color</th> */}
            <th className="border-2 px-4 py-2">Created At</th>
            <th className="border-2 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {course.map((data, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-gray-100" : ""
              } hover:bg-gray-200`}>
              <td className="border-2 text-center px-4 py-2">{i + 1}</td>
              <td className="border-2 text-center px-4 py-2">
                {data.category_name}
              </td>
              {/* <td className="border-2 text-center px-4 py-2">
                <div className="w-32 text-center overflow-hidden">
                  <img
                    src={data.image}
                    className="object-cover w-full h-full"
                    alt="Course"
                  />
                </div>
              </td> */}
              {/* <td className="border-2 text-center px-4 py-2">{data.color}</td> */}
              <td className="border-2 text-center px-4 py-2">
                {data.createdAt}
              </td>
              <td className="border-2 px-4 py-2">
                <div className="flex gap-3 items-center justify-center">
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
                    to={`/category/${data._id}`}>
                    <GrUpdate />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCategorys;
