import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./EmployeeNavbar";
import axios from "axios";
import UserDummyDash from "../PostedContent/userDummyDash";
const EmployeeHome = () => {
  const [userData, setUserData] = useState({
    name: "",
  });
  const callAboutUsPage = async () => {
    try {
      const res = await axios.get(`/about`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        setUserData(res.data);
      } else {
        const error = new Error(res.statusText);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutUsPage();
  }, []);

  return (
    <>
      <EmployeeNavbar />
      <div className="bg-slate-100">
      <div className="text-[16px] md:text-[32px] font-bold flex justify-center mb-10 pt-5">Welcome Back, {userData.name}</div>
      <UserDummyDash />
      </div>
    </>
  );
};

export default EmployeeHome;
