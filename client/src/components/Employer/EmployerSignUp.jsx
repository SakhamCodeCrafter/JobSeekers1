import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login1 from "./signup.png";
const EmployerSignUp = () => {
  const navigate = useNavigate();
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
    companyAddress: {
      streetAddress: "",
      city: "",
      country: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/registerEmployer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Registeration Successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/emplogin");
      } else {
        const errorData = await response.json();
        toast.error("Invalid Data. Try Again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/empsignup");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred! Try Again.", {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <div className="p-2 mx-auto mt-2 grid grid-cols-1 lg:grid-cols-3 w-[80%] bg-slate-100 rounded-2xl">
        

        <div className="col-span-2 pt-2 pb-2">
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
                Already have a account? &ensp; <Link to="/emplogin"><p className="text-blue-500">Login</p></Link>
              </p>
            </div>
        <form className="w-[90%] md:w-[60%] mx-auto p-6 rounded-md">
         
          <div class="p-6">
            <h5 class=" flex mb-2 text-[18px] font-sans text-xl antialiased font-bold leading-snug tracking-normal justify-center text-blue-gray-900">
              Personal Information
            </h5>
            <hr />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
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

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
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

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-1 font-medium">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Work */}
            <div className="mb-4">
              <label htmlFor="work" className="block mb-1 font-medium">
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

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-medium">
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

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="cpassword" className="block mb-1 font-medium">
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
          </div>


          <div class="p-6">
            <h5 class=" flex mb-2 text-[18px] font-sans text-xl antialiased font-bold leading-snug tracking-normal justify-center text-blue-gray-900">
              Company Information
            </h5>
            <hr />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Company Information */}
            <div className="mb-4">
              <label htmlFor="companyName" className="block mb-1 font-medium">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyInformation.companyName"
                value={formData.companyInformation.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="industry" className="block mb-1 font-medium">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                name="companyInformation.industry"
                value={formData.companyInformation.industry}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="companySize" className="block mb-1 font-medium">
                Company Size
              </label>
              <input
                type="number"
                id="companySize"
                name="companyInformation.companySize"
                value={formData.companyInformation.companySize}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div class="p-6">
            <h5 class=" flex mb-2 text-[18px] font-sans text-xl antialiased font-bold leading-snug tracking-normal justify-center text-blue-gray-900">
              Company Address
            </h5>
            <hr />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Company Address */}
            <div className="mb-4">
              <label htmlFor="streetAddress" className="block mb-1 font-medium">
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="companyAddress.streetAddress"
                value={formData.companyAddress.streetAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block mb-1 font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                name="companyAddress.city"
                value={formData.companyAddress.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="block mb-1 font-medium">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="companyAddress.country"
                value={formData.companyAddress.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          <div className="col-span-3 flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-black text-white font-semibold py-2 px-4 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
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

export default EmployerSignUp;
