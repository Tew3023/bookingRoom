import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import getCookiesData from "../../Function/getCookiesData";

export default function TotalPrice({ totalPrice, roomtypes }) {
  const data = useSelector((state) => state.counter.date);
  const guests = useSelector((state) => state.counter.guest);
  const checkInDate = new Date(data.checkin);
  const checkOutDate = new Date(data.checkout);
  const Difdate =
    checkOutDate > checkInDate
      ? Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
      : 0;
  const Price = totalPrice * Difdate || totalPrice;
  const booking = async () => {
    const cookiesData = await getCookiesData();
    if (!cookiesData) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/room/booking", {
        userId: cookiesData.payload.id,
        roomTypes: roomtypes,
        guests: {
          adult: guests.adult,
          children: guests.children,
        },
        checkInDate: data.checkin,
        checkOutDate: data.checkout,
        totalPrice: Price,
      });
      return response.data;
    } catch (error) {
      console.error("Error booking rooms:", error);
      alert("Failed to book rooms. Please try again.");
    }
  };

  useEffect(() => {
    console.log(roomtypes);
  }, [roomtypes]);

  return (
    <div className="my-2">
      <Typography variant="h6">${Price}</Typography>
      <button
        onClick={booking}
        className="my-5 border border-blue-950 text-black w-full py-2 uppercase hover:bg-blue-950 transition-all hover:text-white rounded-md"
      >
        Book
      </button>
    </div>
  );
}
