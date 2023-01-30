import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom"
import { GrUpdate } from "react-icons/gr";
function ViewCategory({ Categorys }) {
    const [course, setCourse] = useState([]);

    // Get request
    const FetchData = () => {
        try {
            axios
                .get("https://hubitbackend.onrender.com/category/")
                .then(res => {
                    // console.log(res.data);
                    setCourse(res.data.data);
                })
                .catch(err => {
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
    const handleDelete = _id => {
        try {
            axios
                .delete(`https://hubitbackend.onrender.com/category/${_id}`, handleDelete)
            alert(`Deleting item whose id is ${_id}`)
                .then(res => console.log("deleted", res))
                .catch(err => console.log(err));
        }
        catch (error) {
            console.log(error);

        }
    };
    // const handleUpdate = (_id) => {
    //   // update request
    //   axios
    //     .put(`https://hubitbackend-production.up.railway.app/course/${_id}`, handleUpdate)
    //     .then(res => console.log("updated", res))
    //     .catch(err => console.log(err))
    // }
    return (
        <div className={` selection:text-white selection:bg-[#a0047d] ${!Categorys ? "block" : "hidden"} `}>
            {/* <table className="border-separate border border-spacing-x-10   mx-auto pt-10 w-[70%] bg-gray-600"> */}
            {/* Show dynamic data in tabular form */}
            <table className="border-2  mx-auto  font-bold w-[60%] bg-gray-100 shadow-xl shadow-gray-500">
                <tr className="border-2 text-center">
                    <th className="border-2">S.No</th>
                    <th className="border-2">CategoryName</th>
                    <th className="border-2">Image</th>
                    <th className="border-2">Color</th>
                    <th className="border-2">Action</th>

                    {/* <th className="border-2">Duration</th>
                    <th className="border-2">Description</th>
                    <th className="border-2">Action</th> */}
                </tr>
                {course.map((data, i) => (
                    <tr key={i} className="border-2 text-center">
                        <td className="border-2">{i + 1}</td>
                        <td>{data.category_name}</td>
                        <td className="border-2 h-32 w-32">
                            <div className="w-32 h-32">
                                <img src={`https://himal-hubitbackend.adaptable.app/${data.image}`} className="w-32 h-32" alt="Course" />
                            </div>
                        </td>
                        <td className="text-center">
                            <div className={` bg-[${data.color}] w-fit h-fit text-center  mx-auto`}>
                                {data.color}</div>
                        </td>
                        {/* <td className="border-2">{data.duration}</td>
                        <td>{data.description}</td> */}
                        <td className="border-2">
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
                                        // onClick={() => {
                                        //   handleUpdate(data._id)
                                        // }}
                                        to={`/editcategory/${data._id}`}
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
    );
}

export default ViewCategory;
