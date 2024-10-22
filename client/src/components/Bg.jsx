import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Guest from "./Guest";
import Calendar from "./Calendar";


export default function Bg() {
  const [popup, setPopup] = useState(false);
  const [calendar, setCalendar] = useState(false);

  const toggleComponent = () => {
    setPopup(!popup);
  };

  const toggleCalendar = () => {
    setCalendar(!calendar);
  };

  return (
    <>
      {popup && (
       <Guest toggle={toggleComponent} />
      )}
      {calendar && (
        <Calendar toggle={toggleCalendar} />
      )}

      <div className="bg-custom-image h-screen bg-cover bg-center relative">
        <div className="absolute bottom-0 w-full flex justify-center mb-8 space-x-20 text-white">
          <div>
            <div className="mb-5">check in check out</div>
            <button
              onClick={toggleCalendar}
              className="flex justify-between items-center border border-white  w-72 h-10 px-4"
            >
              <p>1 Adult, 1 Room</p>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <div>
            <div className="mb-5">guest & rooms</div>
            <button
              onClick={toggleComponent}
              className="flex justify-between items-center border border-white  w-72 h-10 px-4"
            >
              <p>1 Adult, 1 Room</p>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
