import React, { useState } from "react";
import axios from "axios";

const JobData = ({ submittedData, updateSubmittedData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      const updatedData = submittedData.filter(
        (job) => job._id.toString() !== id.toString()
      );
      updateSubmittedData(updatedData);
      alert("Job deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting job", error);
      alert("Error deleting job");
    }
  };
  const filteredJobs = submittedData.filter(
    (job) =>
      job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
    <div className="flex justify-center mt-5">
    <input
          type="text"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
          className="border p-2 rounded mb-4 w-full max-w-lg"
        />
        </div>
      <div className="flex justify-center p-9">
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
                <div className="mt-3 flex justify-around text-[8px] md:text-[14px]">
                  <button
                    onClick={() => handleDelete(job._id)}
                    class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                  >
                    <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span class="relative w-full text-left font-bold text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </>
  );
};

export default JobData;
