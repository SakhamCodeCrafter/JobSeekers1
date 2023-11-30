import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EditConfigration = ({ submittedData, updateSubmittedData }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState({});
  const [tempFormData, setTempFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setTempFormData(editedJob);

    return () => {
      // Cleanup function to dismiss any active toasts
      toast.dismiss();
    };
  }, [editedJob]);

  const handleEdit = (job) => {
    setEditMode(true);
    setEditedJob(job);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedJob({});
    setTempFormData({});
  };

  const handleChange = (e) => {
    setTempFormData({
      ...tempFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/jobs/${editedJob._id}`, tempFormData);
      const updatedJob = response.data;

      const updatedData = submittedData.map((job) =>
        job._id === updatedJob._id ? updatedJob : job
      );

      updateSubmittedData(updatedData);
      setEditMode(false);
      setEditedJob({});
      setTempFormData({});

      toast.success('Job updated successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/emphome');
    } catch (error) {
      alert('Error occurred');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    try {
      await axios.delete(`/jobs/${id}`);
      const updatedData = submittedData.filter(
        (job) => job._id.toString() !== id.toString()
      );
      updateSubmittedData(updatedData);
      toast.success('Job deleted successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/emphome');
    } catch (error) {
      alert('Error occurred');
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setEditMode(false);
      setEditedJob({});
      setTempFormData({});
    };
  }, []);
  return (
    <div className="flex justify-center p-9">
      {submittedData && submittedData.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {submittedData.map((job) => (
            <div key={job._id} className="rounded shadow p-4 w-full">
              <div className="flex items-center">
                <img className="pr-3 w-20 h-20 object-cover" src={job.image} alt="" />
                <div>
                  <h1 className="text-xl font-bold " title={job.title}>{job.title}</h1>
                  <p>{job.companyName}</p>
                  <p><span className="font-semibold">Deadline:</span> {job.applicationDeadline}</p>
                </div>
              </div>
              {!editMode && (
                <div
                  onClick={() => handleEdit(job)}
                  className="text-blue-500 cursor-pointer mt-2 hover:underline"
                >
                  Edit
                </div>
              )}
              {editMode && editedJob._id === job._id && (
                <div className="mt-4">
 <input
                    type="text"
                    name="title"
                    value={tempFormData.title || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="companyName"
                    value={tempFormData.companyName || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="applicationDeadline"
                    value={tempFormData.applicationDeadline || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="image"
                    value={tempFormData.image || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="salaryRange"
                    value={tempFormData.salaryRange || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="location"
                    value={tempFormData.location || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="Experience"
                    value={tempFormData.Experience || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="employmentType"
                    value={tempFormData.employmentType || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
              
              <div className="mt-4">
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Salary: {job.salaryRange}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Experience: {job.Experience}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>job Location: {job.location}</div></div>
              </div>
              <div className='bg-blue-300 mt-4 text-blue-600 rounded-xl flex justify-center w-[40%]'>{job.employmentType}</div>
              <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white p-2 rounded-md mt-2 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white p-2 rounded-md mt-2 ml-2 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div onClick={() => handleDelete(job._id)} className="text-red-500 cursor-pointer mt-2 hover:underline">
                Delete
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


export default EditConfigration;


