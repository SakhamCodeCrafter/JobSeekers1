import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import EmployeeNavbar from "./EmployeeNavbar";

const EmployeeAbout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
  });
  const contactData = async () => {
    try {
      const res = await axios.get("/getData", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        setFormData(res.data);
        console.log(res.data);
      } else {
        const error = new Error(res.statusText);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    contactData();
    console.log(formData);
  }, []);
  return (
    <div className="bg-slate-100 h-[100vh]">
      <EmployeeNavbar />

      <div className="grid grid-cols-1">
        <div className="flex justify-center mt-[25vh] mb-5">
          <div class="relative flex flex-col text-gray-700 bg-white shadow-xl w-[92%] md:w-[70%] lg:w-[60%] pb-3 rounded-xl bg-clip-border">
            <div class="p-6">
              <h5 class=" flex mb-2 text-[18px] font-sans antialiased font-bold leading-snug tracking-normal justify-center text-blue-gray-900">
                Personal Information
              </h5>
              <hr />
            </div>
            <div className="flex justify-center ">
              <div class="pl-2 pr-6 grid grid-cols-2 md:gap-3">
                <div className="font-bold">Name</div>
                <div>{formData.name}</div>
                <div className="font-bold">Email</div>
                <div>{formData.email}</div>
                <div className="font-bold">Phone</div>
                <div>{formData.phone}</div>
                <div className="font-bold">Work</div>
                <div>{formData.work}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAbout;
