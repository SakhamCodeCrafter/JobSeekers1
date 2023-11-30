import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import login1 from "./login.png";

const EmployeeLogin = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuccess = () => {
    toast.success("Login Successful", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/home");
  };

  const postData = async () => {
    try {
      const { email, password } = formData;
      const res = await axios.post("/signin", {
        email,
        password,
      });

      if (res.status === 201) {
        console.log("Login successful");
        handleSuccess();
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Invalid Credentials");
        toast.error("Invalid Credentials. Try Again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response.status === 422) {
        console.log("Invalid Password");
        toast.error("Invalid Password. Try Again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      console.error("Error occurred during login:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData();
    console.log(formData);
  };

  return (
    <>
      <div className="my-20 mx-auto grid grid-cols-1 lg:grid-cols-3 w-[90%] bg-slate-100 rounded-2xl">
        <div className=" mb-0 lg:block relative">
          <img
            src={login1}
            className="p-2 absolute inset-0 w-full h-full object-cover rounded-l-xl lg:rounded-l-xl"
            alt="Login Image"
          />
        </div>

        <div className="col-span-2 pt-2 pb-5">
          <div className="flex justify-center align-middle">
            {" "}
            <div className="inline-grid grid-cols-2  w-[100%] ">
              <p className="ml-2 md:ml-10">
                <Link to="/">
                  <img
                    src="https://www.jobseeker.com/opengraph/image.png"
                    className="w-[65%] md:w-[30%] lg:w-[25%]"
                  ></img>{" "}
                </Link>
              </p>
              <p className="flex pt-3 justify-end align-middle mr-2 md:mr-10 text-[10px] md:text-[15px]">
                Don't have a account? &ensp; <Link to="/signup"><p className="text-blue-500">Sign Up</p></Link>
              </p>
            </div>
          </div>
          <div className="flex justify-center text-[18px] md:text-[28px] mt-10 font-bold">
            Login to JobSeeker
          </div>
          <p className="flex justify-center text-[#696969] ml-2 text-[10px] md:text-[14px] md:ml-10 mt-5">
            Now you can apply for your dream job here at JobSeekers
          </p>
          <div className="flex justify-center col-span-2">
            <div className="grid">
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium md:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium md:text-base"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mt-5 flex justify-around">
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-md text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0"
                    data-primary="green-400"
                    data-rounded="rounded-2xl"
                    data-primary-reset="{}"
                  >
                    Login
                    <svg
                      class="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeLogin;
