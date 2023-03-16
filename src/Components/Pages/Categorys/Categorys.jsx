import React, { useState } from "react";
// import AddCategorys from "./AddCategorys";
import NewCategorys from "./NewCategorys";
import ViewCategorys from "./ViewCategorys";

const Categorys = () => {
  const [showaddcourse, setShowAddCourse] = useState(true);
  const [showviewcourse, setShowViewCourse] = useState(false);

  const myFunction1 = () => {
    setShowViewCourse(false);
    setShowAddCourse(true);
  };
  const myFunction2 = () => {
    setShowAddCourse(false);
    setShowViewCourse(true);
  };
  return (
    <div>
      <div className="main_data">
        <div className="mt-10 ml-10">
          <button
            onClick={myFunction1}
            className="border-2 text-3xl px-2 bg-[#0072C6] text-white py-2 rounded-xl mr-10">
            AddCategorys
          </button>
          <button
            onClick={myFunction2}
            className="border-2  text-3xl  px-2 mr-10 bg-[#0072C6] text-white py-2 rounded-xl">
            ViewCategorys
          </button>
          <div className="flex flex-col">
            {showaddcourse && <NewCategorys />}
          </div>
          <div>{showviewcourse && <ViewCategorys />}</div>
        </div>
      </div>
    </div>
  );
};

export default Categorys;
