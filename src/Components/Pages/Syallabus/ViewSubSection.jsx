import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const URL = "https://fullel-backend.adaptable.app/syallabus";

function ViewSubSection() {
  const [syallabus, setSyallabus] = useState([]);

  let { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      // console.log(res.data);
      setSyallabus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(
        `https://fullel-backend.adaptable.app/syallabus`
      );
      console.log("deleted", res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex selection:text-white selection:bg-blue-500 pr-10">
      <table className="border-2  mx-auto font-bold w-[100%] bg-gray-100  mt-[10vh] shadow-xl shadow-gray-500 ">
        <tr className="border-2 text-center text-xl">
          <th className="border-2 border-[#a0047d] py-4">S.No</th>
          <th className="border-2 border-[#a0047d]">SubSection_Name</th>
          <th className="border-2 border-[#a0047d]">Action</th>
        </tr>
        {syallabus.map((data, i) =>
          data.subSection.map((sub, j) => (
            <tr key={i} className="border-2 text-center">
              <td className="border-2 border-black py-4">{j + 1}</td>
              <td className="border-2 border-black">{sub.subSection}</td>

              <td className="border-2 border-black">
                <div className="flex gap-3 items-center justify-center">
                  <div
                    className="text-red-600 text-2xl cursor-pointer"
                    onClick={() => {
                      handleDelete(sub._id);
                    }}>
                    <RiDeleteBin6Line />
                  </div>
                  <div className="text-blue-400 text-2xl font-bold cursor-pointer">
                    <GrUpdate />
                  </div>
                </div>
              </td>
            </tr>
          ))
        )}
      </table>
    </div>
  );
}

export default ViewSubSection;
