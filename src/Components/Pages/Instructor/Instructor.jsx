import React, { useState } from "react";
import AddInstructor from "./AddInstructor";
import ViewInstructor from "./ViewInstructor";

const Course = () => {
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
            AddInstructor
          </button>
          <button
            onClick={myFunction2}
            className="border-2  text-3xl  px-2 mr-10 bg-[#0072C6] text-white py-2 rounded-xl">
            ViewInstructor
          </button>
          <div className="flex flex-col">
            {showaddcourse && <AddInstructor />}
          </div>
          <div>{showviewcourse && <ViewInstructor />}</div>
        </div>
      </div>
    </div>
  );
};

export default Course;
