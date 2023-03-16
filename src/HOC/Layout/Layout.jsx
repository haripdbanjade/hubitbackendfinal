import React from "react";
import Sidebar from "../../Components/Navigation/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="grid grid-cols-6">
        <div className="slide_bar col-span-1 z-10">
          <Sidebar />
        </div>
        <div className="col-span-5 z-0 ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
