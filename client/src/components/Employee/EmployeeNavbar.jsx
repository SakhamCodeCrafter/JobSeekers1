import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeNavbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");
      if (response.status === 200) {
        window.location.href = "/";
        console.log("logout successful");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1000);
      if (width > 768) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`grid grid-cols-2 justify-between px-4 py-3 bg-slate-300`}>
      <div>
        <img
          src="https://www.jobseeker.com/opengraph/image.png"
          className="w-[10%]"
        ></img>
      </div>
      <div
        className={`flex gap-4 justify-end ${
          isMobile ? "w-full  flex mt-4" : "w-auto"
        }`}
      >
        {!isMobile && (
          <ul className="flex mt-2 gap-4 items-center justify-center">
            <Link to={"/home"} className="linkStyle">
              <li className="font-semibold text-md">Home</li>
            </Link>
            <Link to={"/about"} className="linkStyle">
              <li className="font-semibold text-md">About</li>
            </Link>
           
          </ul>
        )}
        {isMobile && (
          <div className="flex w-full justify-end -mt-[5rem]">
            <GiHamburgerMenu
              className="inline-block top-0 text-3xl"
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </div>
        )}
        <div className="hidden md:flex">
          <button
            onClick={handleLogout}
            className="bg-blue-600 px-4 text-lg text-white"
          >
            Logout
          </button>
        </div>
      </div>
      {isMobile && toggle && (
        <ul className="flex flex-col gap-4 bg-gray-300 py-3 w-full">
          <Link to={"/main"}>
            <li className="font-semibold  text-md">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="font-semibold  text-md">About</li>
          </Link>
          <li className="font-semibold  text-md">Careers</li>

          <div
            className={`flex gap-2 ${
              isMobile ? "w-full justify-between flex mt-4" : "w-auto"
            }`}
          >
            <div className=" w-full justify-end items-center">
              {toggle && (
                <div className=" space-x-5">
                  <button
                    onClick={handleLogout}
                    className="bg-blue-600 py-2 px-4 text-lg text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default EmployeeNavbar;
