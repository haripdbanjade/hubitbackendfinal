import React, { useState, useEffect } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { GrUpdate } from "react-icons/gr"
import { Link } from "react-router-dom"
import axios from "axios"
function Enquiry() {
    // Get request
    const [Enquiry, setEnquiry] = useState([]);
    const FetchEnquiry = () => {
        try {
            axios
                .get("https://himal-hubitbackend.adaptable.app/inquire/")
                .then(res => {
                    console.log(res.data);
                    setEnquiry(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        FetchEnquiry();
    }, []);
    const handleDelete = _id => {
        axios
            .delete(`https://himal-hubitbackend.adaptable.app/inquire/${_id}`, handleDelete)
            .then(res => console.log("deleted", res))
            .catch(err => console.log(err));
    };
    return (
        <div className='flex  selection:text-white selection:bg-[#a0047d] w-screen  items-center justify-center'>

            <table className="border-2  mx-auto font-bold w-[60%] bg-gray-100  mt-[10vw] shadow-xl shadow-gray-500">
                <tr className="border-2 text-center">
                    <th className="border-2 border-[#a0047d]">S.No</th>
                    <th className="border-2 border-[#a0047d]">Name</th>
                    <th className="border-2 border-[#a0047d]">Email</th>
                    <th className="border-2 border-[#a0047d]">Phone</th>
                    <th className="border-2 border-[#a0047d]">Course</th>
                    <th className="border-2 border-[#a0047d]">Description</th>
                    <th className="border-2 border-[#a0047d]">Enquired on</th>
                    <th className="border-2 border-[#a0047d]">Action</th>
                </tr>
                {Enquiry.map((data, i) => (
                    <tr key={i} className="border-2 text-center">
                        <td className="border-2 border-black">{i + 1}</td>
                        <td className='border-2 border-black'>{data.name}</td>

                        <td className='border-2 border-black'>{data.email}</td>
                        <td className="border-2 border-black">{data.phone}</td>
                        <td className='border-2 border-black'>{data.course}</td>
                        <td className='border-2 border-black'>{data.description}</td>
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
                                    <Link className="text-blue-400 text-2xl font-bold cursor-pointer"
                                        to={`/editenquiry/${data._id}`}
                                    >
                                        <GrUpdate />
                                    </Link>
                                </div>
                            }
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Enquiry
