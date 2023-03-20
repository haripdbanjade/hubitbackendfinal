import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const URL =
  "http://192.168.1.157:4000/syallabus/6416ea1d90ba084c41d39fc3/8c5a4255-1124-4a3d-96c5-08566c962659";

function ViewSubSection() {
  const [syallabus, setSyallabus] = useState([]);

  let { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      console.log(res.data);
      setSyallabus(res.data[0]);
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
        {syallabus.map((data, i) => (
          <tr key={i} className="border-2 text-center">
            <td className="border-2 border-black py-4">{i + 1}</td>
            <td className="border-2 border-black">{data.subSection}</td>

            <td className="border-2 border-black">
              <div className="flex gap-3 items-center justify-center">
                <div
                  className="text-red-600 text-2xl cursor-pointer"
                  onClick={() => {
                    handleDelete(data._id);
                  }}>
                  <RiDeleteBin6Line />
                </div>
                <div className="text-blue-400 text-2xl font-bold cursor-pointer">
                  <GrUpdate />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ViewSubSection;
