// Sidenav
import React from "react";
import { MdCategory, MdAddShoppingCart } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdLiveHelp } from "react-icons/md"
import { FiPhoneCall } from "react-icons/fi"
import { Link } from "react-router-dom"
function Pages({ menuActive, setmenuActive, setcourseActive, courseActive }) {
  // object for sidenav
  const obj = [
    {
      title: "Courses",
      icon: <MdCategory />,
      path: "/"
    },
    {
      title: "Category",
      icon: <MdAddShoppingCart />,
      path: "/category",
    },
    {
      title: "Enquiry",
      icon: <MdLiveHelp />,
      path: "/enquiry"
    },
    {
      title: "QuickCall",
      icon: <FiPhoneCall />,
      path: "/quickcall"
    }
  ];
  return (
    // sidenav started
    <div className="items-center  selection:text-white selection:bg-[#a0047d]">
      <div
        className={`bg-[#a0047d] text-xl text-white font-semibold  w-[16.2%] h-sc transition-all delay-100 duration-300 ease-in  fixed left-0  text-center z-50 items-center h-[200vh] ${menuActive ? "-translate-x-80" : "translate-x-0"
          }`}
      >
        <div className="absolute top-8 right-0 bg-white text-[#a0047d] font-bolder border-none rounded-full text-3xl cursor-pointer hover:bg-[#a0047d] hover:text-white" onClick={() => {
          setmenuActive(true)
        }}>

          <RxCross1 />
        </div>
        <div className="flex gap-4 mt-[70%] flex-col items-center width-[100%]">
          {obj.map((val, i) => {
            return (
              <div
                key={i}
                className="cursor-pointer items-center text-xl border-2 rounded-lg p-3 w-[90%] text-center"
              >
                <Link to={val.path}>
                  <div className="flex items-center gap-2 px-4 w-[100%]">
                    {val.icon}
                    {val.title}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

    </div>

  );
}

export default Pages;
