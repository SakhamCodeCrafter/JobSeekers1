import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import login1 from "./login.png";
const EmployeeSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToast = (type, message) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const postData = async () => {
    try {
      const { name, email, phone, work, password, cpassword } = formData;
      const response = await axios.post("/register", {
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful");
        handleToast("success", "Registration successful");
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 422) {
        console.log("Invalid registration");
        handleToast("error", "Invalid registration");
      } else if (error.response.status === 406) {
        console.log("Invalid registration");
        handleToast("error", "Please fill all the fields");
      } else {
        console.error("Error occurred during registration:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData();
    console.log(formData);
  };

  return (
    <>
      <div className="mt-10 mx-auto grid grid-cols-1 lg:grid-cols-3 w-[95%] md:w-[90%] bg-slate-100 rounded-2xl">
        <div className="col-span-2 pt-2 pb-2">
          <div className="inline-grid grid-cols-2  w-[100%] pt-2 ">
            <p className="ml-2 md:ml-10 ">
              <Link to="/">
                <img
                  src="https://www.jobseeker.com/opengraph/image.png"
                  className="w-[65%] md:w-[30%] lg:w-[25%]"
                ></img>{" "}
              </Link>
            </p>
            <p className="flex pt-3 justify-end mr-2 text-[8px] md:mr-10 md:text-[15px]">
              Already have a account? &ensp; <Link to="/login"><p className="text-blue-500">Login</p></Link>
            </p>
          </div>
          <div className="flex justify-center text-[18px] md:text-[28px] mt-5 font-bold">
            Sign Up to JobSeeker
          </div>
          <p className="flex justify-center text-[#696969] ml-2 text-[10px] md:text-[14px] md:ml-10 mt-2">
            Now you can apply for your dream job here at JobSeekers
          </p>
          <div className="flex justify-center p-2">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium md:text-base"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
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
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium md:text-base"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="work"
                    className="block mb-1 text-sm font-medium md:text-base"
                  >
                    Work
                  </label>
                  <input
                    type="text"
                    id="work"
                    name="work"
                    value={formData.work}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
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
                <div>
                  <label
                    htmlFor="cpassword"
                    className="block mb-1 text-sm font-medium md:text-base"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mt-1 col-span-2 flex justify-center">
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-md text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0"
                    data-primary="green-400"
                    data-rounded="rounded-2xl"
                    data-primary-reset="{}"
                  >
                    Submit
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
              </div>
            </form>
          </div>
        </div>
        <div className=" mb-0 lg:block relative">
          <img
            src={login1}
            className="p-2 absolute inset-0 w-full h-full object-cover rounded-l-xl lg:rounded-l-xl"
            alt="Login Image"
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeSignUp;
