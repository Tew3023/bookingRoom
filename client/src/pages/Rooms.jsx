import axios from "axios";
import { useEffect, useState } from "react";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [editRoom, setEditRoom] = useState(null);
  const [updatedData, setUpdatedData] = useState({ price: '', available: false });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/room`);
        if (response.status === 200) {
          setRooms(response.data);
        }
      } catch (err) {
        console.log("Cannot get rooms data", err);
      }
    };
    fetchRooms();
  }, []);

  const handleEditClick = (room) => {
    setEditRoom(room);
    setUpdatedData({ price: room.price, available: room.available });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_HOST}/room/update/${editRoom.id}`, updatedData);
      if (response.status === 200) {
        setRooms((prevRooms) =>
          prevRooms.map((room) => (room.id === editRoom.id ? { ...room, ...updatedData } : room))
        );
        setEditRoom(null);
      }
    } catch (err) {
      console.error("Failed to update room", err);
    }
  };

  return (
    <div className="p-6">
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rooms.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-lg bg-white">
              <div className="text-lg font-bold mb-2">Room {item.number}</div>
              <div className="text-gray-600">Type: {item.type}</div>
              <div className="text-gray-600">Price: ${item.price}</div>
              <div className="text-gray-600">Status: 
                <span className={item.available ? "text-green-500 ml-1" : "text-red-500 ml-1"}>
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
              <button 
                onClick={() => handleEditClick(item)} 
                className="mt-2 text-blue-500 hover:underline"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center text-red-500 uppercase">Cannot fetch data</div>
      )}

      {editRoom && ( 
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">Edit Room {editRoom.number}</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={updatedData.price}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="available">
                  Available
                </label>
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={updatedData.available}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Room
              </button>
              <button
                type="button"
                onClick={() => setEditRoom(null)} // Close the edit form
                className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
