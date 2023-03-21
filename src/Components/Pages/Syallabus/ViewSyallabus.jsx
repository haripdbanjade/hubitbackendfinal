import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const URL =
  "https://fullel-backend.adaptable.app/syallabus/6416ea1d90ba084c41d39fc3";

function ViewSyallabus() {
  const [syallabus, setSyallabus] = useState([]);

  let { id } = useParams();
  console.log(id);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}`);
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
    console.log(_id);
    console.log(id);
    try {
      const res = await axios.delete(
        `https://fullel-backend.adaptable.app/syallabus/${id}/${_id}`
      );
      console.log("deleted", res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex selection:text-white selection:bg-[#a0047d] pr-10">
      <table className="border-2  mx-auto font-bold w-[80%] bg-gray-100  mt-[10vh] shadow-xl shadow-gray-500 ">
        <tr className="border-2 text-center text-xl">
          <th className="border-2 border-[#a0047d] py-2">S.No</th>
          <th className="border-2 border-[#a0047d]">Section_name</th>
          <th className="border-2 border-[#a0047d]">Action</th>
          <th className="border-2 border-[#a0047d]">Sub Syallabus</th>
        </tr>
        {syallabus.map((data, i) => (
          <tr key={i} className="border-2 text-center">
            <td className="border-2 border-black">{i + 1}</td>
            <td className="border-2 border-black">{data.Section}</td>

            <td className="border-2 border-black">
              <div className="flex gap-3 items-center justify-center">
                <div
                  className="text-red-600 text-2xl cursor-pointer"
                  onClick={() => {
                    handleDelete(data.section_id);
                  }}>
                  <RiDeleteBin6Line />
                </div>
                <Link
                  state={data}
                  to={`/editsyallabus/${id}`}
                  className="text-blue-400 text-2xl font-bold cursor-pointer">
                  <GrUpdate />
                </Link>
              </div>
            </td>
            <td className="border-black border-2 py-5">
              <Link
                className="text-2xl py-[1px] px-2 border-2 shadow-md hover:shadow-gray-100 font-bold"
                to={`/subcourse/${id}`}>
                View
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ViewSyallabus;
