import { useState } from "react";
import { Asterisk } from "lucide-react";
import axios from 'axios';

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  });
  const [error, setError] = useState('');

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const registeration = async () => {
    if(!userData.email || !userData.password || !userData.confirmpassword){
      return
    }
    if (userData.password !== userData.confirmpassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const res = await axios.post('http://localhost:3001/user/register', {
        email: userData.email,
        password: userData.password,
      });

    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to create an account');
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex justify-center">
        <div className="space-y-3 w-full md:p-28">
          <div className="text-2xl font-bold my-10 text-blue-900">
            CREATE AN ACCOUNT
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="uppercase text-blue-900 font-bold">Email address</div>
          <input
            type="text"
            className="w-full py-1 px-2 border border-zinc-200"
            name="email"
            onChange={handlechange}
          />
          <div className="uppercase text-blue-900 font-bold">Password</div>
          <input
            type="password"
            className="w-full py-1 px-2 border border-zinc-200"
            name="password"
            onChange={handlechange}
          />
          <div className="uppercase text-blue-900 font-bold flex">
            CONFIRM PASSWORD <Asterisk className="w-5 h-5 text-red-500" />
          </div>
          <input
            type="password"
            className="w-full py-1 px-2 border border-zinc-200"
            name="confirmpassword"
            onChange={handlechange}
          />
          <button onClick={registeration} className="bg-blue-950 text-white py-3 uppercase text-sm w-full">
            Create account
          </button>
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
