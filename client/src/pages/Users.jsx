import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null); 
  const [updatedData, setUpdatedData] = useState({ email: '', role: '' }); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user");
        if (response.status === 200) {
          setUsers(response.data.result); 
        }
      } catch (err) {
        console.error("Cannot get users data", err);
        setError("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditUser(user);
    setUpdatedData({ email: user.email, role: user.role }); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/user/edit/${editUser.id}`, updatedData);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === editUser.id ? { ...user, ...updatedData } : user))
        );
        setEditUser(null); 
      }
    } catch (err) {
      console.error("Failed to update user", err);
      setError("Failed to update user.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (user) => {
    try {
      const response = await axios.delete(`http://localhost:3001/user/delete/${user.id}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      }
    } catch (err) {
      console.error("Failed to delete user", err);
      setError("Failed to delete user.");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : users.length > 0 ? (
        <>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Edit</th>
                <th className="py-3 px-6 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-3 px-6">{user.id}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-6">
                    <button onClick={() => handleEditClick(user)} className="text-blue-500 hover:underline">
                      Edit
                    </button>
                  </td>
                  <td className="py-3 px-6">
                    <button onClick={() => handleDelete(user)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {editUser && ( // Show edit form if a user is selected for editing
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Edit User</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={updatedData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="role">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={updatedData.role}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => setEditUser(null)} // Close the edit form
                  className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500">No users found.</div>
      )}
    </div>
  );
}
