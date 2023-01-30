import "./App.css";
// import Logo from "../../cms-new/public/index.html"
import React, { useState } from "react";
import Index from "./component/navigation/navbar/index";
import Pages from "./component/page/Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./component/page/Main";
import Category from "./component/category/Category";
import Enquiry from "./component/EnquiryList/Enquiry";
import EditCourse from "./component/EditCourse/EditCourse";
import QuickCall from "./component/QuickCall/QuickCall";
import EditEnquiry from "./component/EditEnquiry/EditEnquiry";
function App() {
  const [menuActive, setmenuActive] = useState(true);
  const [courseActive, setcourseActive] = useState(true);
  const [Categorys, setCategory] = useState(true)
  return (
    <div>
      <BrowserRouter>
        <Index setmenuActive={setmenuActive} menuActive={menuActive} />
        <div>
          <Pages
            menuActive={menuActive}
            setmenuActive={setmenuActive}
          // courseActive={courseActive}
          // setcourseActive={setcourseActive}
          />
          <Routes>
            <Route path="/" exact element={<Main setcourseActive={setcourseActive}
              courseActive={courseActive} />} />

            <Route path="/editcourse/:id" exact element={<EditCourse />} />
            <Route path="/category" exact element={<Category setCategory={setCategory} Categorys={Categorys} />} />
            <Route path="/enquiry" exact element={<Enquiry />} />
            <Route path="/quickcall" exact element={<QuickCall />} />
            <Route path="/editenquiry/:id" exact element={<EditEnquiry />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
