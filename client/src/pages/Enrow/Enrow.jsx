import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Enrow() {
  const [careers, setCareers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCareerData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_HOST}/careers/get`
        );
        if (result.status === 200) {
          setCareers(result.data.result);
        }
      } catch (err) {
        setError("Unable to fetch careers data");
        console.log("Cannot fetch careers data", err);
      }
    };
    getCareerData();
  }, []);

  return (
    <div className="bg-blue-900">
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
      <div className="mx-auto w-full max-w-screen-xl bg-white border-lg rounded-t-sm mt-20">
        <div className="p-10">
          <h1 className="text-5xl">Start your journey with us</h1>
          <div className="my-5 border-y border-zinc-500 py-2">
            {error && <p className="text-red-500">{error}</p>}
            {careers.length > 0 ? (
              careers.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 py-4 flex justify-between items-center w-full"
                >
                  <div>
                    <h3 className="text-2xl">{item.career}</h3>
                    <div className="text-gray-400 flex flex-row space-x-4">
                      <p className="w-32">{item.location}</p>
                      <p>Kona Village Resort, A Rosewood Resort</p>
                      <p>{item.jobDescription}</p>
                    </div>
                  </div>
                  <Link to={`apply/${encodeURIComponent(item.career)}`}>
                    <div className="ml-auto text-right cursor-pointer border border-zinc-700 px-14 py-2 uppercase hover:text-white hover:bg-black transition-all">
                      Apply
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No careers available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
