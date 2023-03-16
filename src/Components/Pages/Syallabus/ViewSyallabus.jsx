import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const URL = "https://fullel-backend.adaptable.app/syallabus";

function ViewSyallabus() {
  const [syallabus, setSyallabus] = useState([]);

  let { id } = useParams();
  console.log(id);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      setSyallabus(res.data);
      console.log(res.data);
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
        `https://fullel-backend.adaptable.app/syallabus/${_id}`
      );
      console.log("deleted", res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex selection:text-white selection:bg-[#a0047d]">
      <table className="border-2  mx-auto font-bold w-[60%] bg-gray-100  mt-[10vw] shadow-xl shadow-gray-500">
        <tr className="border-2 text-center">
          <th className="border-2 border-[#a0047d]">S.No</th>
          <th className="border-2 border-[#a0047d]">Syllabus_name</th>
          <th className="border-2 border-[#a0047d]">Action</th>
          <th className="border-2 border-[#a0047d]">Sub Syallabus</th>
        </tr>
        {syallabus.map((data, i) => (
          <tr key={i} className="border-2 text-center">
            <td className="border-2 border-black">{i + 1}</td>
            <td className="border-2 border-black">{data.Section}</td>

            <td className="border-2 border-black">
              <div className="flex gap-3">
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
            <td>
              <Link to={`/subcourse/${id}`}>View....</Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ViewSyallabus;
