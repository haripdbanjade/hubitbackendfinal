import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdCategory, MdAddShoppingCart, MdLiveHelp } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { TfiLayoutPlaceholder } from "react-icons/tfi";
import { SiInstructables } from "react-icons/si";
const obj = [
  {
    title: "home",
    icon: <AiOutlineHome />,
    path: "/",
    subCourses: [],
  },
  {
    title: "About",
    icon: <FcAbout />,
    path: "/about",

    subCourses: [],
  },
  {
    title: "Courses",
    icon: <MdCategory />,
    path: "/course",
    subCourses: [
      {
        title: "Category",
        icon: <MdAddShoppingCart />,
        path: "/category",
      },

      {
        title: "Syallabus",
        icon: <FiPhoneCall />,
        path: "/syallabus",
      },
      {
        title: "instructor",
        icon: <SiInstructables />,
        path: "/instructor",
      },
    ],
  },
  {
    title: "quickcall",
    icon: <FiPhoneCall />,
    path: "/quickcall",
    subCourses: [],
  },
  {
    title: "enquiry",
    icon: <MdLiveHelp />,
    path: "/enquiry",
    subCourses: [],
  },
  {
    title: "online_form",
    icon: <BsFillPersonLinesFill />,
    path: "/onlineform",
    subCourses: [],
  },
  {
    title: "placements",
    icon: <TfiLayoutPlaceholder />,
    path: "/placements",
    subCourses: [],
  },
];
const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="bg-[#0072C6] cursor-pointer h-screen text-center text-[#FFFFFF] shadow-xl fixed px-6  ">
      <h2 className="text-5xl pt-5 hover:text-mainColor">Hub IT</h2>
      <div className="">
        <div className="text-2xl capitalize flex flex-col mt-6 ml-2 gap-4 ">
          {obj.map((val, i) => {
            return (
              // <Link to={val.path}>
              //   <div key={i} className="flex items-center gap-2 px-4 w-[100%]">
              //     {val.icon}
              //     {val.title}
              //   </div>
              // </Link>
              <div key={i} className="group mr-6">
                <ul className="">
                  <li>
                    <Link to={val.path}>
                      {" "}
                      <li
                        className={`flex items-center   gap-2  w-[100%]  hover:text-green-500 ${
                          location.pathname === val.path
                            ? "text-green-500 block"
                            : ""
                        }`}>
                        {val.icon}
                        {val.title}
                      </li>
                    </Link>
                    <ul
                      className={`ml-6 group-hover:block text-xl 
                     ${location.pathname === val.path ? "block" : " "}`}>
                      {val.subCourses.map((subVal, j) => {
                        return (
                          <Link to={subVal.path}>
                            {" "}
                            <li
                              key={j}
                              className={`flex  items-center  gap-2  px-4 w-[100%]  hover:text-green-500 ${
                                location.pathname === subVal.path
                                  ? "text-green-500 block"
                                  : ""
                              }`}>
                              {subVal.icon}
                              {subVal.title}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
