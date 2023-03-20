import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from "axios";
function OnlineForm() {
  // Get request
  const [OnlineForm, setOnlineForm] = useState([]);
  const FetchEnquiry = () => {
    try {
      axios
        .get("https://fullel-backend.adaptable.app/onlineform")
        .then((res) => {
          console.log(res.data);
          setOnlineForm(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchEnquiry();
  }, []);
  const handleDelete = (_id) => {
    axios
      .delete(
        `https://fullel-backend.adaptable.app/inquire/${_id}`,
        handleDelete
      )
      .then((res) => console.log("deleted", res))
      .catch((err) => console.log(err));
  };
  return (
    <div className=" ml-[35rem] flex  selection:text-white selection:bg-[#a0047d]    items-center justify-center">
      <table className="border-collapse border-2  font-bold w-[50%] bg-gray-100  mt-[10vw] shadow-xl shadow-gray-500 ">
        <thead>
          <tr className="border-2  border-black text-center text-black ">
            <th className="border-2 border-gray-300 py-2 px-5 text-center">
              S.No
            </th>
            <th className="border-2 border-gray-300 py-2 px-5">Full Name</th>
            <th className="border-2 border-gray-300 py-2 px-5">Image</th>
            <th className="border-2 border-gray-300 py-2 px-5">Address</th>
            <th className="border-2 border-gray-300 py-2 px-5">DOB</th>
            <th className="border-2 border-gray-300 py-2 px-5">Email</th>
            <th className="border-2 border-gray-300 py-2 px-5">Phone</th>
            <th className="border-2 border-gray-300 py-2 px-5">Gender</th>
            <th className="border-2 border-gray-300 py-2 px-5">
              Education Level
            </th>
            <th className="border-2 border-gray-300 py-2 px-5">
              Guardian Name
            </th>
            <th className="border-2 border-gray-300 py-2 px-5">
              Guardian Number
            </th>
            <th className="border-2 border-gray-300 py-2 px-5">
              School/College Name
            </th>
            <th className="border-2 border-gray-300 py-2 px-5">Course Name</th>
            <th className="border-2 border-gray-300 py-2 px-5">Shift Time</th>
            <th className="border-2 border-gray-300 py-2 px-5">Posted At</th>
            <th className="border-2 border-gray-300 py-2 px-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {OnlineForm.map((data, i) => (
            <tr key={i} className={`${i % 2 === 0 ? "bg-gray-200" : ""}`}>
              <td className="border-2 border-gray-300 py-2 text-center px-4">
                {i + 1}
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">
                {data.full_name}
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">
                <img
                  src={`https://fullel-backend.adaptable.app/${data.image}`}
                  className="object-cover w-full h-full"
                  alt="Course"
                />
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">
                {data.address}
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">{data.dob}</td>
              <td className="border-2 border-gray-300 py-2 px-4">
                {data.email}
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">
                {data.phone_number}
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">
                {data.gender}
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">
                {data.level_of_education}
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">
                {data.guardians_name}
              </td>
              <td className="border-2 border-gray-300 py-2 px-4">
                {data.guardians_phone_number}
              </td>
              <td className="border-r-2 py-4 px-4">
                {data.school_or_clg_name}
              </td>
              <td className="border-r-2 py-4 px-4">{data.course_names}</td>
              <td className="border-r-2 py-4 px-4">{data.shifts}</td>
              <td className="border-r-2 py-4 px-4">{data.createdAt}</td>

              <td className="border-2 border-gray-300">
                {
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
                      to={`/editenquiry/${data._id}`}>
                      <GrUpdate />
                    </Link>
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OnlineForm;
