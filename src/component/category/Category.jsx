import React from 'react'
import { Link } from 'react-router-dom';
import AddCategory from './AddCategory'
import ViewCategory from './ViewCategory'
import { GrAddCircle } from "react-icons/gr"
function Category({ Categorys, setCategory }) {
    // const [Category, setCategory] = useState(false)
    return (
        <div className=' selection:text-white selection:bg-[#a0047d]'>
            <div className="  flex gap-4  border-black web  right-20 items-center ">
                <div className="flex items-center gap-5 m-auto mt-[10%]">
                    {/* Main page starts contain Add course And View Course Buttons */}
                    <div
                        className={`select-none cursor-pointer border-2 border-[#a0047d] h-fit w-fit p-2 rounded-lg  ${Categorys
                            ? "bg-[#a0047d] text-white scale-105"
                            : "bg-[white] text-[#a0047d] scale-90"
                            }`}
                        onClick={() => {
                            setCategory(true);
                            console.log(Categorys);
                        }}
                    >
                        Add Category
                        {/* {courseActive ? "View  Course" : "Add Course"} */}
                    </div>

                    <div
                        className={`select-none cursor-pointer border-2 border-[#a0047d] h-fit w-fit px-2 p-2 rounded-lg ${Categorys
                            ? "bg-[white] text-[#a0047d] scale-90"
                            : "bg-[#a0047d] text-white scale-105"
                            }`}
                        onClick={() => {
                            setCategory(false);
                            console.log(setCategory);
                        }}
                    >
                        View Category
                    </div>
                    <Link className=" rounded-full  shadow-lg shadow-gray-500 text-4xl w-fit fixed top-[50%] right-[5%] hover:<p>ADD MORE</p>"
                        to="/"
                    ><GrAddCircle /></Link>
                </div>
            </div>
            <AddCategory Categorys={Categorys} setCategory={setCategory} />
            <ViewCategory setCategory={setCategory} Categorys={Categorys} />

        </div>

    )


}

export default Category