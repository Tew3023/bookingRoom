import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error,setError] = useState(null)

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/user/login", {
        email: userData.email,
        password: userData.password,
      });
  
      if (res.status === 200) { 
        const token =res.data.token
        localStorage.setItem('token',token)
        window.location.replace('/')
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Failed to log in"); 
    }
  };
  

  return (
    <div className="grid grid-cols-2 gap-10 h-screen">
      <div className="flex justify-center">
        <div className="space-y-3 w-full md:px-16">
          <div className="text-2xl font-bold my-10 text-blue-900">
            SIGN IN TO YOUR ACCOUNT
          </div>
          <div className="uppercase text-blue-900 font-bold">Email address</div>
          <input
            type="text"
            className="w-full py-1 px-2 border border-zinc-200"
            name="email"
            onChange={handlechange}
          />
          <div className="uppercase text-blue-900 font-bold">password</div>
          <input
            type="password"
            className="w-full py-1 px-2 border border-zinc-200"
            name="password"
            onChange={handlechange}
          />
          <div  className="grid grid-cols-2 gap-5">
            <button onClick={login} className="bg-blue-950 text-white py-3 uppercase text-sm">
              sign in
            </button>
            <Link to="/register">
              <button className="py-3 border border-blue-950 text-blue-950 uppercase text-sm hover:bg-blue-950 hover:text-white transition-all w-full ">
                create new accout
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
