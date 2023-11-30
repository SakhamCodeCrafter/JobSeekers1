import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./components/Main";
import EmployerLogin from "./components/Employer/EmployerLogin";
import EmployerSignUp from "./components/Employer/EmployerSignUp";
import EmployerHome from "./components/Employer/EmployerHome";
import EmployeeLogin from "./components/Employee/EmployeeLogin";
import EmployeeSignUp from "./components/Employee/EmployeeSignUp";
import EmployeeHome from "./components/Employee/EmployeeHome";
import EmployerAbout from "./components/Employer/EmployerAbout";
import EmployeeAbout from "./components/Employee/EmployeeAbout";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/home" element={<EmployeeHome />} />
      <Route path="/about" element={<EmployeeAbout />} />
      <Route path="/signup" element={<EmployeeSignUp />} />
      <Route path="/login" element={<EmployeeLogin />} />
      <Route path="/emplogin" element={<EmployerLogin />} />
      <Route path="/empsignup" element={<EmployerSignUp />} />
      <Route path="/empAbout" element={<EmployerAbout />} />
      <Route path="/emphome" element={<EmployerHome />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

const App = () => {

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routing />
      </Router>
    </>
  );
};

export default App;
