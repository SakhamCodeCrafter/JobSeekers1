import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EmployerNavbar from "./EmployerNavbar";
import EditDummy from "../PostedContent/EditDummy";
import LineChart from "./LineChart";
const EmployerAbout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
    companyInformation: {
      companyName: "",
      industry: "",
      companySize: 0,
    },
    contactInformation: {
      contactName: "",
      contactTitle: "",
      contactEmail: "",
      contactPhone: "",
    },
    companyAddress: {
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const contactData = async () => {
    try {
      const res = await axios.get("/employerData", {
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
    <>
      <div className="bg-slate-100">
        <EmployerNavbar />

        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <div className="lg:col-span-2 lg:w-[80%] lg:mx-auto flex justify-center mt-2 mb-5">
            <div class="relative flex flex-col text-gray-700 bg-white shadow-xl w-[79%] pb-3 rounded-xl bg-clip-border">
              <div class="p-6">
                <h5 class=" flex mb-2 text-[18px] font-sans text-xl antialiased font-bold leading-snug tracking-normal justify-center text-blue-gray-900">
                  Personal Information
                </h5>
                <hr />
              </div>
              <div className="flex justify-center">
                <div class="p-6 grid grid-cols-2 gap-3">
                  <div className="font-bold justify-end">Name</div>
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

          <div className="flex justify-center mt-2 mb-5">
            <div class="relative flex flex-col text-gray-700 bg-white shadow-xl w-[79%] rounded-xl bg-clip-border">
              <div class="p-6">
                <h5 class=" flex mb-2 text-[18px] font-sans text-xl antialiased font-bold leading-snug tracking-normal justify-center text-blue-gray-900">
                  Company Information
                </h5>
                <hr />
              </div>
              <div className="flex justify-center">
                <div class="p-6 grid grid-cols-2 gap-3">
                  <div className="font-bold justify-end">Name</div>
                  <div>{formData.companyInformation.companyName}</div>
                  <div className="font-bold">Industry</div>
                  <div>{formData.companyInformation.industry}</div>
                  <div className="font-bold">Company Size</div>
                  <div>{formData.companyInformation.companySize}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-2 mb-5">
            <div class="relative flex flex-col text-gray-700 bg-white shadow-xl w-[79%]  rounded-xl bg-clip-border">
              <div class="p-6">
                <h5 class=" flex mb-2 text-[18px] font-sans text-xl antialiased font-bold leading-snug tracking-normal justify-center text-blue-gray-900">
                  Company Address
                </h5>
                <hr />
              </div>
              <div className="flex justify-center">
                <div class="p-6 grid grid-cols-2 gap-3">
                  <div className="font-bold justify-end">Address</div>
                  <div>{formData.companyAddress.streetAddress}</div>
                  <div className="font-bold">City</div>
                  <div>{formData.companyAddress.city}</div>
                  <div className="font-bold">Country</div>
                  <div>{formData.companyAddress.country}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-6 bg-slate-100 h-full">
        <h5 class=" flex mb-2 text-[18px] font-sans text-xl antialiased font-bold leading-snug tracking-normal justify-center text-blue-gray-900">
          Active Posts
        </h5>
        <hr />
        <EditDummy />
      </div>
      {/* <div>
        <LineChart />
      </div> */}
    </>
  );
};

export default EmployerAbout;
