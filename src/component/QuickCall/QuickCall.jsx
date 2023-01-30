import React, { useState, useEffect } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { GrUpdate } from "react-icons/gr"
import axios from "axios"
function QuickCall() {
    // Get request
    const [QuickCall, setQuickCall] = useState([]);
    const FetchQuickCall = () => {
        try {
            axios
                .get("https://hubitbackend.onrender.com/quickcall/")
                .then(res => {
                    console.log(res.data);
                    setQuickCall(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        FetchQuickCall();
    }, []);
    const handleDelete = _id => {
        axios
            .delete(`https://hubitbackend.onrender.com/quickcall/${_id}`, handleDelete)
            .then(res => console.log("deleted", res))
            .catch(err => console.log(err));
    };
    return (
        <div className='flex  selection:text-white selection:bg-[#a0047d] w-screen  items-center justify-center'>

            <table className="border-2  mx-auto font-bold w-[60%] bg-gray-100  mt-[10vw] shadow-xl shadow-gray-500">
                <tr className="border-2 text-center">
                    <th className="border-2 border-[#a0047d]">S.No</th>
                    <th className="border-2 border-[#a0047d]">Name</th>
                    <th className="border-2 border-[#a0047d]">Phone</th>
                    <th className="border-2 border-[#a0047d]">Submitted on</th>
                    <th className="border-2 border-[#a0047d]">Action</th>
                </tr>
                {QuickCall.map((data, i) => (
                    <tr key={i} className="border-2 text-center">
                        <td className="border-2 border-black">{i + 1}</td>
                        <td className='border-2 border-black'>{data.name}</td>
                        <td className="border-2 border-black">{data.phone}</td>
                        <td className='border-2 border-black'>{data.createdAt}</td>
                        <td className="border-2 border-black">
                            {
                                <div className="flex gap-3">
                                    <div className="text-red-600 text-2xl cursor-pointer"
                                        onClick={() => {
                                            handleDelete(data._id);
                                        }}
                                    >
                                        <RiDeleteBin6Line />
                                    </div>
                                    <div className="text-blue-400 text-2xl font-bold cursor-pointer"
                                    // onClick={() => {
                                    //   handleUpdate(data._id)
                                    // }}
                                    // to="/editelement"
                                    >
                                        <GrUpdate />
                                    </div>
                                </div>
                            }
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default QuickCall;
