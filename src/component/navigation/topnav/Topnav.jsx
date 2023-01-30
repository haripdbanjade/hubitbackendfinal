import React from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom"
import Hub from "../images/Hub.svg";
function Topnav({ setmenuActive, menuActive }) {
  return (
    <div className="">
      <div className="h-20 w-screen bg-[#a0047d] flex justify-around items-center fixed z-50 selection:text-white selection:bg-[#a0047d] border-none">
        {/* left section */}
        <div className="flex gap-9 ml-3 items-center">
          {/* HAmburger section */}
          <div
            onClick={() => {
              setmenuActive(!menuActive);
              console.log(menuActive);
            }}
            className=" select-none"
          >
            <div className="text-3xl cursor-pointer">
              {menuActive ? <RxHamburgerMenu className="text-white" /> : <RxCross1 />}
            </div>
          </div>
          {/* Logo */}
          <Link to="/">
            <div className="bg-white   w-28 rounded-t-full border-none">
              <img src={Hub} alt="logo" className="h-[20%]"></img>
            </div>
          </Link>
        </div>
        <div>
          {/* Center Section*/}
          <div className="w-fit h-fit border-2 rounded-lg items-center flex gap-3 ">
            <div className="p-2">
              {" "}
              <AiOutlineSearch className="text-xl text-white" />
            </div>
            <div>
              <input
                type="text"
                name="search"
                id="srch"
                placeholder="Search"
                className="border-none bg-transparent  outline-none text-white font-bold"

              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 cursor-pointer items-center">
          {/* Profile section */}
          <div className="text-xl text-white">
            <BiHelpCircle />
          </div>
          <div className="text-4xl text-white">
            <CgProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topnav;
