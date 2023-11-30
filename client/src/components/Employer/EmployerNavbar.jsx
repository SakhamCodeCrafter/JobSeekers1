import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployerNavbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("/logoutEmp");
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
    <div
      className={`w-full grid grid-cols-2 justify-between px-1 py-1 bg-slate-200 mb-10`}
    >
      <div>
        <img
          src="https://www.jobseeker.com/opengraph/image.png"
          className="w-[41%] md:w-[21%]"
          alt="Logo"
        />
      </div>
      <div className="flex justify-end align-middle mt-1 lg:mt-[15px]">
        <div className="grid grid-cols-3">
          <div className="col-span-2 flex justify-end gap-4 mt-2.5 mr-5 lg:mr-5 lg:mt-4">
            <div className="font-bold text-[8px] md:text-[14px]"><Link to="/emphome">Home</Link></div>

            <div className="font-bold text-[8px] md:text-[14px]"><Link to="/empAbout">About</Link></div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              class="inline-flex items-center justify-center lg:mt-2  px-3 py-1 md:px-4 md:py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              data-rounded="rounded-md"
              data-primary="blue-600"
              data-primary-reset="{}"
            >
              <p className="text-[8px] md:text-[14px]">LogOut</p>
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerNavbar;
