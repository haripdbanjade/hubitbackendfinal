import React, { useState } from "react";
import AddSubSection from "./AddSubSection";
import AddSyallabus from "./AddSyallabus";
import ViewSubSection from "./ViewSubSection";
import ViewSyallabus from "./ViewSyallabus";

const SubSection = () => {
  const [showaddcourse, setShowAddCourse] = useState(false);
  const [showviewcourse, setShowViewCourse] = useState(true);

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
            AddSubSection
          </button>
          <button
            onClick={myFunction2}
            className="border-2  text-3xl  px-2 mr-10 bg-[#0072C6] text-white py-2 rounded-xl">
            ViewSubSection
          </button>
          <div className="flex flex-col">
            {showaddcourse && <AddSubSection />}
          </div>
          <div className="">{showviewcourse && <ViewSubSection />}</div>
        </div>
      </div>
    </div>
  );
};

export default SubSection;
