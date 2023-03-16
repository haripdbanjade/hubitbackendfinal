import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
function QuickCall() {
  // Get request
  const [QuickCall, setQuickCall] = useState([]);
  const FetchQuickCall = () => {
    try {
      axios
        .get("https://fullel-backend.adaptable.app/quickcall/")
        .then((res) => {
          console.log(res.data);
          setQuickCall(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchQuickCall();
  }, []);
  const handleDelete = (_id) => {
    axios
      .delete(
        `https://fullel-backend.adaptable.app/quickcall/${_id}`,
        handleDelete
      )
      .then((res) => console.log("deleted", res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Quick Call Enquiries</h1>
      <div className="w-full overflow-x-auto">
        <table className="table-auto mx-auto w-full border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 text-left">
              <th className="px-4 py-2 w-1/12">SN</th>
              <th className="px-4 py-2 w-3/12">Name</th>
              <th className="px-4 py-2 w-3/12">Phone</th>
              <th className="px-4 py-2 w-3/12">Submitted on</th>
              <th className="px-4 py-2 w-2/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {QuickCall.map((data, i) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{data.name}</td>
                <td className="px-4 py-2">{data.phone}</td>
                <td className="px-4 py-2">{data.createdAt}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    <div
                      className="text-red-600 text-xl cursor-pointer mr-4"
                      onClick={() => {
                        handleDelete(data._id);
                      }}>
                      <RiDeleteBin6Line />
                    </div>
                    <div
                      className="text-blue-400 text-xl cursor-pointer"
                      onClick={() => {}}>
                      <GrUpdate />
                    </div>
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

export default QuickCall;
