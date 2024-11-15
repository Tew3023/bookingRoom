import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function Adminjob() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_HOST}/job/get`);
      if (result.status === 200) {
        setJobs(result.data.result);
        console.log(result.data.result);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch job applications. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 text-lg font-medium">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Job Applications</h2>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">{job.applicantName}</h2>
              <p className="text-gray-700 mt-1"><span className="font-medium">Email:</span> {job.email}</p>
              <p className="text-gray-700 mt-1"><span className="font-medium">Resume:</span> <a href={job.resumeUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View Resume</a></p>
              <p className="text-gray-700 mt-1"><span className="font-medium">Cover Letter:</span> {job.coverLetter}</p>
              <p className="text-gray-700 mt-1"><span className="font-medium">Status:</span> <span className={`px-2 py-1 rounded-full text-sm font-semibold ${job.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{job.status}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No job applications available.</p>
      )}
    </div>
  );
}
