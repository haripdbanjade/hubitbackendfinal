import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from "axios";
function Enquiry() {
  // Get request
  const [Enquiry, setEnquiry] = useState([]);
  const FetchEnquiry = () => {
    try {
      axios
        .get("https://fullel-backend.adaptable.app/inquire/")
        .then((res) => {
          console.log(res.data);
          setEnquiry(res.data.data);
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
    <div className="flex flex-col items-center justify-center py-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8"> Enquiries</h1>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enquired on
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Enquiry.map((data, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {i + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Enquiry;
