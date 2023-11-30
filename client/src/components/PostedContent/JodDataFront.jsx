import React, { useState } from "react";

const JobDataFront = ({ submittedData, updateSubmittedData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleApplyNow = (job) => {
    const subject = `Application for ${job.title} at ${job.companyName}`;
    const body = `Dear Hiring Manager,\n\nI am interested in the position of ${job.title} at ${job.companyName}. Please find my application attached.\n\nSincerely, [Your Name]`;

    const mailtoLink = `mailto:${job.contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  const handleShareClick = async () => {
    try {
      console.log("button clicked");
  
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } else {
        throw new Error("Clipboard API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      
      alert("Sharing not supported on this platform");
    }
  };
  

  
  const filteredJobs = submittedData.filter((job) =>
    job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-9">
      <input
        type="text"
        placeholder="Search by job title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-lg"
      />
      {filteredJobs.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <div
            key={job._id}
            className="rounded shadow p-4 w-full text-[14px]"
          >
            <div className="flex items-center">
              <img
                className="pr-3 w-20 h-20 object-cover"
                src={job.image}
                alt=""
              />
              <div className="text-[10px]  md:text-[14px]">
                <h1
                  className="text-l md:text-xl font-bold "
                  title={job.title}
                >
                  {job.title}
                </h1>
                <p>{job.companyName}</p>
                <p className="text-[8px]  md:text-[12px]">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {job.applicationDeadline}
                </p>
              </div>
            </div>
            <div className="mt-4 text-[10px]  md:text-[14px]">
              <div className="grid grid-cols-2">
                <div className="font-bold">Salary </div>
                <div> {job.salaryRange}</div>

                <div className="font-bold">Experience</div>
                <div> {job.Experience}</div>

                <div className="font-bold">Job Location</div>
                <div> {job.location}</div>
              </div>
            </div>
            <div className="flex justify-center text-[8px]  md:text-[14px]">
              <button className="bg-blue-300 mt-4 text-blue-600 rounded-xl py-2  flex justify-center w-[50%]">
                {job.employmentType}
              </button>
            </div>
              {/* Buttons for applying and sharing */}
              <div className="mt-3 flex justify-around text-[8px] md:text-[14px]">
                <button
                  onClick={handleApplyNow}
                  class="relative rounded px-6 py-3 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                >
                  <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span class="relative">Apply</span>
                </button>
                <button
                  onClick={handleShareClick}
                  class="relative inline-flex items-center justify-center px-12 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
                >
                  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                   Share
                  </span>
                  <span class="relative invisible"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default JobDataFront;
