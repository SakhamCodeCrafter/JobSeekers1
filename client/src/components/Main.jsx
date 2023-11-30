import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Screenshot 2023-11-26 at 7.51.31 PM.png";
const Main = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleEmployerLogin = () => {
    navigate("/emplogin");
  };
  const handleEmployerSignUp = () => {
    navigate("/empsignup");
  };
  return (
    <>
      <div className="grid grid-cols-2 p-2 bg-slate-300">
        <div className="ml-1">
          <img
            src="https://www.jobseeker.com/opengraph/image.png"
            className="w-[41%] md:w-[21%]"
          ></img>
        </div>
        <div>
          <div className="flex justify-end gap-3 mt-1 xl:pt-3 lg:mt-3 pr-3">
            <div>
              <button
                class="box-border relative z-30 inline-flex items-center justify-center w-auto p-2 md:px-6 md:py-2 md:p-0 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
                onClick={handleEmployerLogin}
              >
                <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="relative z-20 flex items-center text-sm">
                  Employer Login
                </span>
              </button>
            </div>
            <div className="hidden md:block">
              <button
                class="box-border relative z-30 inline-flex items-center justify-center w-auto md:px-6 md:py-2 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
                onClick={handleEmployerSignUp}
              >
                <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="relative z-20 flex items-center text-sm">
                  Employer Sign Up
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="h-[70vh] mt-[17%] z-10">
          <p className="font-bold text-[22px] md:text-[30px] lg:text-[42px] ml-10">
            <p>Remote Job</p>
            <p> for anyone</p> anywhere
          </p>
          <p className="text-[#696969] ml-10 mt-3">
            Thousands of job listed here
          </p>
          <div className="inline-grid grid-cols-2 gap-5 mt-10 ml-10">
            <div>
              <button
                className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
                onClick={handleLogin}
              >
                <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span className="relative z-20  flex items-center text-sm">
                  Login
                </span>
              </button>
            </div>
            <div>
              <button
                class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
                onClick={handleSignUp}
              >
                <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="relative z-20 flex items-center text-sm">
                  Sign Up
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[-30vh] md:h-[50vh] md:mt-5">
          <img src="https://static.devitjobs.uk/uploads/blog/software-developer-interview.png"></img>
        </div>
      </div>
    </>
  );
};

export default Main;
