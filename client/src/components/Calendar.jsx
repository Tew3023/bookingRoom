import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {  X } from "lucide-react";

export default function Calendar({toggle}) {
    return(
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 text-black absolute w-2/5 space-y-3 rounded-sm" >
            <div className="flex justify-end">
              <X onClick={toggle} className="h-5 w-5 cursor-pointer" />
            </div>
            <div className="text-center font-semibold">DATE</div>
            <div className="grid grid-cols-2 gap-10">
              <div>
                {" "}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="check in date" />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                {" "}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="check out date" />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
    )
}