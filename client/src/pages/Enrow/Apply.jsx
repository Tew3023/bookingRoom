import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Resume from "../../components/job/Resume";

export default function Apply() {
  const { jobname } = useParams();
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState(""); // New state for cover letter
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_HOST}/careers/get`
        );
        if (result.status === 200) {
          const data = result.data.result;
          const filteredData = data.find((item) => item.career === jobname);
          setData(filteredData);
        }
      } catch (err) {
        console.log("Cannot fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [jobname]);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Job not found.</div>;
  }

  const isEmailValid = email.includes("@");

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1439130490301-25e322d88054?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsfGVufDB8fDB8fHww')`,
        }}
        className="bg-cover bg-center relative h-96"
      >
        <div className="absolute bottom-10 mx-auto w-full px-32 text-white text-5xl uppercase font-semibold">
          <h1>Discover Your Calling</h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl bg-white border-lg rounded-t-sm my-20 p-6">
        <section>
          <h2 className="uppercase text-3xl">{jobname}</h2>
          <div className="overflow-hidden">
            <div
              className="flex items-center space-x-10 cursor-pointer text-zinc-500"
              onClick={toggleDescription}
              aria-expanded={isOpen}
            >
              <div className="uppercase text-lg">Description</div>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
            <div
              className={`text-zinc-500 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "h-auto p-4" : "h-0 p-0"}`}
            >
              <div className="flex">
                <p className="w-32 font-semibold">Department</p> <p>{data.department}</p>
              </div>
              <div className="flex">
                <p className="w-32 font-semibold">Career</p> <p>{data.career}</p>
              </div>
              <div className="flex">
                <p className="w-32 font-semibold">Description</p> <p>{data.jobDescription}</p>
              </div>
              <div className="flex">
                <p className="w-32 font-semibold">Skills Required</p> <p>{data.skillsRequired}</p>
              </div>
              <div className="flex">
                <p className="w-32 font-semibold">Salary Range</p> <p>{data.salaryRange}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="my-6">
          {/* <div className="flex justify-between h-auto py-5">
            {["Start your application", "Personal information", "Compliance"].map((text, index) => (
              <div key={index} className="mx-auto uppercase text-center">
                <p className="text-gray-500 font-light">{text}</p>
                <div className="flex justify-center">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex justify-center items-center mt-2">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </section>
        <section className="my-2 space-y-2">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full py-2 px-4 border border-zinc-400 rounded-md"
          />
          {!isEmailValid && email && (
            <p className="text-red-500 text-sm">Please enter a valid email address.</p>
          )}

          <label htmlFor="coverLetter" className="block text-gray-700 font-medium mt-4">
            Cover letter
          </label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Enter your cover letter"
            className="w-full py-2 px-4 border border-zinc-400 rounded-md"
          />
          <div className="mt-4">
            <Resume career={data.career} email={email} coverLetter={coverLetter} careerId={data.id} />
          </div>
        </section>
      </div>
    </div>
  );
}
