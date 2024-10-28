import { useEffect, useState } from "react";
import Bg2 from "../components/Bg2";
import Comuser from "../components/ui/Comuser";
import Checkin from "../components/ui/Checkin";
import Checkout from "../components/ui/Checkout";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Total from "../components/ui/Totalprice";

export default function Booking() {
  const [roomCount, setRoomCount] = useState(1);
  const [roomTypes, setRoomTypes] = useState(["Single"]);

  const roomPrices = {
    Single: 100,
    Double: 150,
    Suite: 200,
  };

  const singleroom = roomTypes.filter((item) => item === "Single");
  const doubleroom = roomTypes.filter((item) => item === "Double");
  const suitroom = roomTypes.filter((item) => item === "Suite");

  const handleRoomCountChange = (event) => {
    const count = Number(event.target.value);
    setRoomCount(count);

    if (count > roomTypes.length) {
      setRoomTypes([
        ...roomTypes,
        ...Array(count - roomTypes.length).fill("Single"),
      ]);
    } else {
      setRoomTypes(roomTypes.slice(0, count));
    }
  };

  const handleRoomTypeChange = (index) => (event) => {
    const newRoomTypes = [...roomTypes];
    newRoomTypes[index] = event.target.value;
    setRoomTypes(newRoomTypes);
  };

  const totalPrice = roomTypes.reduce((total, roomType) => {
    return total + (roomPrices[roomType] || 0);
  }, 0);

  return (
    <>
      <Bg2 />
      <section className="w-full h-full px-2.5 mx-auto md:px-20 my-5">
        <div className="border border-zinc-300">
          <div className="grid grid-cols-3">
            <div className="border border-zinc-300">
              <Comuser />
            </div>
            <div className="border border-zinc-300 p-2">
              <Checkin />
            </div>
            <div className="border border-zinc-300 p-2">
              <Checkout />
            </div>
          </div>
          <div className="p-2 my-5">
            <p className="uppercase text-xl font-semibold">Select room type</p>
            <div className="grid grid-cols-3 gap-10 my-5">
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      How many rooms do you want?
                    </InputLabel>
                    <NativeSelect
                      value={roomCount}
                      onChange={handleRoomCountChange}
                      inputProps={{
                        name: "Room count",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </div>
              <div>
                {roomCount > 0 ? (
                  Array.from({ length: roomCount }, (_, index) => (
                    <div className="my-2" key={index}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor={`room-type-${index}`}
                          >
                            Room's type {index + 1}
                          </InputLabel>
                          <NativeSelect
                            value={roomTypes[index]}
                            onChange={handleRoomTypeChange(index)}
                            inputProps={{
                              name: "Room's type",
                              id: `room-type-${index}`,
                            }}
                          >
                            <option value={"Single"}>Single</option>
                            <option value={"Double"}>Double</option>
                            <option value={"Suite"}>Suite</option>
                          </NativeSelect>
                        </FormControl>
                      </Box>
                    </div>
                  ))
                ) : (
                  <>No room count selected</>
                )}
              </div>
              <div className="text-md my-5">
                <div>
                  {singleroom && singleroom.length > 0 && (
                    <div className=" px-4 py-2 rounded-xl my-2">
                      <p className=" px-4 py-2 rounded-md  w-full space-x-5 uppercase">
                        <span>{singleroom.length}</span>
                        <span>Single Room</span>
                      </p>
                    </div>
                  )}
                  {doubleroom && doubleroom.length > 0 && ( 
                    <div className=" px-4 py-2 rounded-xl my-2">
                      <p className=" px-4 py-2 rounded-md  w-full space-x-5 uppercase">
                        <span>{doubleroom.length}</span>
                        <span>Double Room</span>
                      </p>
                    </div>
                  )}
                  {suitroom && suitroom.length > 0 && (
                    <div className=" px-4 py-2 rounded-xl my-2">
                      <p className=" px-4 py-2 rounded-md  w-full space-x-5 uppercase">
                        <span>{suitroom.length}</span>
                        <span>Suite Room</span>
                      </p>
                    </div>
                  )}
                </div>
                <Total roomtypes={roomTypes} totalPrice={totalPrice} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
