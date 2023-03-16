import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCategorys from "./Components/Pages/Categorys/AddCategorys";
import Categorys from "./Components/Pages/Categorys/Categorys";
// import NewCategorys from "./Components/Pages/Categorys/NewCategorys";
import Course from "./Components/Pages/Courses/Course";
import EditCourse from "./Components/Pages/EditCourse/EditCourse";
import Enquiry from "./Components/Pages/EnquiryList/Enquiry";
import Instructor from "./Components/Pages/Instructor/Instructor";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import MainPage from "./Components/Pages/MainPage";
import OnlineForm from "./Components/Pages/OnlineForm/OnlineForm";
import QuickCall from "./Components/Pages/QuickCall/QuickCall";
import SubSection from "./Components/Pages/Syallabus/SubSection";
import SubCourse from "./Components/Pages/Syallabus/SubSection";
import Syallabus from "./Components/Pages/Syallabus/Syallabus";
import ViewSyallabus from "./Components/Pages/Syallabus/ViewSyallabus";
import Layout from "./HOC/Layout/Layout";

const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/course" element={<Course />} />
            <Route exact path="/addcategory" element={<AddCategorys />} />
            <Route exact path="/category" element={<Categorys />} />
            <Route exact path="/enquiry" element={<Enquiry />} />
            <Route exact path="/quickcall" element={<QuickCall />} />
            <Route exact path="/editcourse/:id" element={<EditCourse />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/syallabus" element={<Syallabus />} />
            <Route exact path="/onlineform" element={<OnlineForm />} />
            <Route exact path="/instructor" element={<Instructor />} />
            <Route exact path="/syllabus/:id" element={<ViewSyallabus />} />
            <Route exact path="/subcourse/:id" element={<SubSection />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
