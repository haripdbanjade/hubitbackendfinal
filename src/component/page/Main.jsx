import React from 'react'
import AddCourse from './AddCourse'
import ViewCourse from './ViewCourse'

function Main({ courseActive, setcourseActive }) {
    // const [courseActive, setcourseActive] = useState(true);
    return (
        <div className=' selection:text-white selection:bg-[#a0047d]'>
            <div className="  flex gap-4  border-black web  right-20 items-center ">
                <div className="flex items-center gap-5 m-auto mt-[10%]">
                    {/* Main page starts contain Add course And View Course Buttons */}
                    <div
                        className={`select-none cursor-pointer border-2 border-[#a0047d] h-fit w-fit p-2 rounded-lg  ${courseActive
                            ? "bg-[#a0047d] text-white scale-105"
                            : "bg-[white] text-[#a0047d] scale-90"
                            }`}
                        onClick={() => {
                            setcourseActive(true);
                            console.log(courseActive);
                        }}
                    >
                        Add Course
                        {/* {courseActive ? "View  Course" : "Add Course"} */}
                    </div>

                    <div
                        className={`select-none cursor-pointer border-2 border-[#a0047d] h-fit w-fit px-2 p-2 rounded-lg ${courseActive
                            ? "bg-[white] text-[#a0047d] scale-90"
                            : "bg-[#a0047d] text-white scale-105"
                            }`}
                        onClick={() => {
                            setcourseActive(false);
                            console.log(courseActive);
                        }}
                    >
                        View Course
                    </div>
                </div>
            </div>
            <AddCourse setcourseActive={setcourseActive}
                courseActive={courseActive} />
            <ViewCourse setcourseActive={setcourseActive}
                courseActive={courseActive} />

        </div>

    )
}

export default Main