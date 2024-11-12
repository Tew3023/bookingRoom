import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Resume from "../../components/job/Resume";

export default function Apply() {
  const { jobname } = useParams();
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_HOST}/careers/get`
        );
        if (result.status === 200) {
          const data = result.data.result;
          const filteredData = data.filter((item) => item.career === jobname);
          setData(filteredData[0]);
        }
      } catch (err) {
        console.log("cannot fetch data", err);
      }
    };
    getData();
  }, [jobname]);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

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
      <div className="mx-auto w-full max-w-screen-xl bg-white border-lg rounded-t-sm my-20">
        <section>
          <h2 className="uppercase text-3xl">{jobname}</h2>
          <div className="overflow-hidden">
            <div
              className="flex items-center space-x-10 cursor-pointer text-zinc-500"
              onClick={toggleDescription}
            >
              <div className="uppercase text-lg">Description</div>
              <div className="uppercase text-lg">
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              className={`text-zinc-500 transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "h-auto p-4" : "h-0 p-0"
              }`}
            >
              <div className="flex">
                <p className="w-32">DEPARTMENT</p> <p>{data.department}</p>
              </div>
              <div className="flex">
                <p className="w-32">CAREER</p> <p>{data.career}</p>
              </div>
              <div className="flex">
                <p className="w-32">DESCRIPTION</p> <p>{data.jobDescription}</p>
              </div>
              <div className="flex">
                <p className="w-32">SKILLREQUIRED</p>{" "}
                <p>{data.skillsRequired}</p>
              </div>
              <div className="flex">
                <p className="w-32">SALARYRANGE</p> <p>{data.salaryRange}</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-between h-auto py-5">
            <div className="mx-auto uppercase">
              <p className="text-gray-500 font-light">Start your application</p>
              <div className="flex justify-center">
                <p className="w-5 h-5 rounded-full bg-black text-white flex justify-center items-center mt-2">
                  1
                </p>
              </div>
            </div>
            <div className="mx-auto uppercase">
              <p className="text-gray-500 font-light">Personal information</p>
              <div className="flex justify-center">
                <div className="w-5 h-5 rounded-full bg-black text-white flex justify-center items-center mt-2">
                  2
                </div>
              </div>
            </div>
            <div className="mx-auto uppercase">
              <p className="text-gray-500 font-light">Compliance</p>
              <div className="flex justify-center">
                <div className="w-5 h-5 rounded-full bg-black text-white flex justify-center items-center mt-2">
                  3
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-between ">
            <div><Resume /></div>
            <div className="px-6 py-2 bg-black text-white">Next</div>
          </div>
        </section>
      </div>
    </div>
  );
}
