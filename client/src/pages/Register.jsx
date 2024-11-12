import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_HOST}/user/login`, {
        email: userData.email,
        password: userData.password,
      });

      if (res.status === 200) { 
        const token = res.data.token;
        localStorage.setItem("token", token);
        const redirectUrl = res.data.redirectUrl;
        navigate(redirectUrl); 
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to log in"); 
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex justify-center">
        <div className="space-y-3 w-full md:p-28">
          <div className="text-2xl font-bold my-10 text-blue-900">
            SIGN IN TO YOUR ACCOUNT
          </div>
          <div className="uppercase text-blue-900 font-bold">Email address</div>
          <input
            type="text"
            className="w-full py-1 px-2 border border-zinc-200"
            name="email"
            onChange={handleChange}
          />
          <div className="uppercase text-blue-900 font-bold">Password</div>
          <input
            type="password"
            className="w-full py-1 px-2 border border-zinc-200"
            name="password"
            onChange={handleChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={login}
              className="bg-blue-950 text-white py-3 uppercase text-sm cursor-pointer"
            >
              Sign in
            </button>
            <Link to="/register">
              <button className="py-3 border border-blue-950 text-blue-950 uppercase text-sm hover:bg-blue-950 hover:text-white transition-all w-full cursor-pointer">
                Create new account
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('https://assets.talentronic.com/photos/employers/290440/938551_l.jpg')`,
        }}
        className="bg-cover bg-center h-full w-full"
      ></div>
    </div>
  );
}
