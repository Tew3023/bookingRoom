import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCheckfirst , setChecksec } from '../store/counterSlice'; 

export default function Calendar({ toggle }) {
  const dispatch = useDispatch()
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const confirmData = () => {
    if(!checkIn || !checkOut){
      return
    }
    dispatch(setCheckfirst(checkIn))
    dispatch(setChecksec(checkOut))
  }

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-white p-6 text-black absolute w-2/5 space-y-3 rounded-sm">
        <div className="flex justify-end">
          <X onClick={toggle} className="h-5 w-5 cursor-pointer" />
        </div>
        <div className="text-center font-semibold">DATE</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-2">
              <p className="text-center">Check-in Date</p>
              <DatePicker
                label="Select check-in date"
                value={checkIn}
                onChange={(newValue) => setCheckIn(newValue)}
              />
            </div>
            <div className="space-y-2">
              <p className="text-center">Check-out Date</p>
              <DatePicker
                label="Select check-out date"
                value={checkOut}
                onChange={(newValue) => setCheckOut(newValue)}
              />
            </div>
          </div>
        </LocalizationProvider>
        <div className="flex justify-center">
          <button onClick={confirmData} className="bg-black px-4 py-2 text-white">CONFIRM</button>
        </div>
      </div>
    </div>
  );
}
