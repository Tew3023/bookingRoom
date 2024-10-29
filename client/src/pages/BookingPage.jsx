import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3001/booking");
        if (response.status === 200) {
          setBookings(response.data.result); // Set the bookings from the response
        }
      } catch (err) {
        console.log("Cannot get booking data", err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      {bookings.length > 0 ? (
        <div>
          {bookings.map((booking) => (
            <div key={booking.id} className="mb-6 border rounded-lg p-4 shadow-lg bg-white">
              <div className="text-xl font-bold mb-2">Booking ID: {booking.id}</div>
              <div className="text-gray-600 mb-2">Check-In: {booking.checkInDate}</div>
              <div className="text-gray-600 mb-2">Check-Out: {booking.checkOutDate}</div>
              <div className="text-gray-600 mb-2">Total Price: ${booking.price}</div>
              <div className="text-gray-600 mb-2">Guests: {booking.guests.adult} Adult(s), {booking.guests.children} Child(ren)</div>
              <div className="font-bold mb-2">Rooms:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {booking.rooms.map((room) => (
                  <div key={room.roomId} className="border rounded-lg p-4 shadow-md bg-gray-100">
                    <div className="text-lg font-bold">Room {room.number}</div>
                    <div className="text-gray-600">Type: {room.type}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center text-red-500 uppercase">Cannot fetch data</div>
      )}
    </div>
  );
}
