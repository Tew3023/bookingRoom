import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Modal from "../components/ui/Modal";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Return empty string for invalid dates
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

const validateBooking = (formData) => {
  const errors = {};
  
  if (!formData.checkInDate) {
    errors.checkInDate = "Check-in date is required";
  }
  if (!formData.checkOutDate) {
    errors.checkOutDate = "Check-out date is required";
  }
  if (formData.checkInDate && formData.checkOutDate && 
      new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
    errors.checkOutDate = "Check-out date must be after check-in date";
  }
  if (!formData.price || formData.price <= 0) {
    errors.price = "Valid price is required";
  }
  if (formData.guests.adult < 1) {
    errors.adult = "At least one adult is required";
  }
  if (formData.guests.children < 0) {
    errors.children = "Number of children cannot be negative";
  }

  return errors;
};

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    price: "",
    guests: {
      adult: 1,
      children: 0,
    },
  });

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3001/booking");
      setBookings(response.data.result);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
      console.error("Cannot get booking data", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setFormData({
      checkInDate: formatDate(booking.checkInDate),
      checkOutDate: formatDate(booking.checkOutDate),
      price: booking.price,
      guests: booking.guests,
      rooms: booking.rooms
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    const numValue = Math.max(0, parseInt(value) || 0);
    setFormData((prevData) => ({
      ...prevData,
      guests: {
        ...prevData.guests,
        [name]: numValue,
      },
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updateData = {
        ...formData,
        checkInDate: new Date(formData.checkInDate).toISOString(),
        checkOutDate: new Date(formData.checkOutDate).toISOString(),
        price: parseFloat(formData.price),
      };

      const response = await axios.put(
        `http://localhost:3001/booking/update/${id}`, 
        updateData
      );
      
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === id ? { ...booking, ...updateData } : booking
          )
        );
        setEditingBooking(null);
        setFormErrors({});
      }
    } catch (err) {
      setError("Failed to update booking. Please try again.");
      console.error("Error updating booking:", err);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3001/booking/delete/${id}`);
      if (response.status === 200) {
        setBookings((prev) => prev.filter((booking) => booking.id !== id));
      }
    } catch (err) {
      setError("Failed to delete booking. Please try again.");
      console.error("Error deleting booking", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 shadow-lg bg-white">
              <div className="text-xl font-bold mb-2">Booking ID: {booking.id}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-600">Check-In: {formatDate(booking.checkInDate)}</div>
                  <div className="text-gray-600">Check-Out: {formatDate(booking.checkOutDate)}</div>
                  <div className="text-gray-600">Total Price: ${booking.price}</div>
                  <div className="text-gray-600">
                    Guests: {booking.guests.adult} Adult(s), {booking.guests.children} Child(ren)
                  </div>
                </div>
                
                <div>
                  <div className="font-bold mb-2">Rooms:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {booking.rooms.map((room) => (
                      <div key={room.roomId} className="border rounded p-2 bg-gray-50">
                        <div className="font-semibold">Room {room.number}</div>
                        <div className="text-sm text-gray-600">Type: {room.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-x-2">
                <button
                onClick={()=>handleEditClick(booking)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Booking
                </button>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">No bookings found</div>
      )}

      {editingBooking && (
        <Modal onClose={() => setEditingBooking(null)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-In Date:
                </label>
                <input
                  onChange={handleInputChange}
                  type="date"
                  name="checkInDate"
                  value={formatDate(formData.checkInDate)}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                    formErrors.checkInDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.checkInDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.checkInDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-Out Date:
                </label>
                <input
                  type="date"
                  onChange={handleInputChange}
                  name="checkOutDate"
                  value={formatDate(formData.checkOutDate)}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                    formErrors.checkOutDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.checkOutDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.checkOutDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Price:
                </label>
                <input
                onChange={handleInputChange}
                  type="number"
                  name="price"
                  value={formData.price}
                  min="0"
                  step="0.01"
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                    formErrors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.price && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adults:
                </label>
                <input
                  onChange={handleGuestChange}
                  type="number"
                  name="adult"
                  value={formData.guests.adult}
                  min="1"
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                    formErrors.adult ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.adult && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.adult}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Children:
                </label>
                <input
                onChange={handleGuestChange}
                  type="number"
                  name="children"
                  value={formData.guests.children}
                  min="0"
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                    formErrors.children ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.children && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.children}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setEditingBooking(null)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
              onClick={()=>handleUpdate(editingBooking.id)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Booking
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}