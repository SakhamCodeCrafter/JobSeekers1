import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import UserDash from "../PostedContent/UserDash";
import EmployerNavbar from "./EmployerNavbar";
const EmployerHome = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const callAboutUsPage = async () => {
      try {
        const res = await axios.get("/employerData", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setUserData(res.data);
          console.log(res.data);
        } else {
          throw new Error(res.statusText);
        }
      } catch (err) {
        console.log(err);
      }
    };

    callAboutUsPage();
  }, []);
  return (
    <div>
      <div className=" w-full">
        <EmployerNavbar />
        <h1 className="text-[24px] md:text-[34px] font-bold items-center justify-center flex">
          Welcome Back, {userData.name}
        </h1>
      </div>
      <UserDash />
    </div>
  );
};

export default EmployerHome;
