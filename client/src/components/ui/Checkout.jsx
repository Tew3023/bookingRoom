import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setChecksec } from "../../store/counterSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [calendar, setCalendar] = useState(null);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const formattedDate = calendar
    ? dayjs(calendar).format("MM/DD/YYYY")
    : "Select Date";

  useEffect(() => {
    dispatch(setChecksec(formattedDate));
  }, [formattedDate]);
  return (
    <>
      {popup && (
        <div className="relative">
          <div className="absolute top-12 bg-white shadow-lg p-2 rounded-md z-10">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]}>
                <DemoItem label="Check-out-date">
                  <DateCalendar
                    value={calendar}
                    onChange={(newValue) => {
                      setCalendar(newValue);
                      setPopup(false);
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
      )}

      <button
        onClick={handlePopup}
        className="w-full h-full p-2 flex gap-5 items-center"
      >
        <CalendarDays className="w-5 h-5" />
        <div className="flex flex-col text-start">
          <p className="text-sm ">Check - Out</p>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
      </button>
    </>
  );
}
