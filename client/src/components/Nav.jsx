import { AlignLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <nav className="h-32 bg-white w-full border-b border-zinc-300 backdrop-blur-xl">
      <div className="h-full w-full mt-2">
        {/* Brand Logo */}
        <Link to="/">
          <div className="flex justify-center items-center w-full">
            <div className="text-center">
              <div className="uppercase text-2xl">kona village</div>
              <div className="uppercase text-sm">a rosewood resort</div>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex justify-between items-center w-full mt-5 h-10 px-5">
          <AlignLeft className="h-6 w-6" />
          <div className="flex space-x-10 uppercase text-sm font-semibold">
            {[
              "overview",
              "accommodation",
              "dining",
              "offers",
              "wellness",
              "meeting & events",
              "experiences",
              "shop",
            ].map((item) => (
              <p key={item} className="cursor-pointer hover:underline underline-offset-8 transition-all">
                {item}
              </p>
            ))}
          </div>

          {/* Authentication Button */}
          {token ? (
            <button
              onClick={handleLogout}
              className="text-white rounded-lg py-1 px-2 uppercase text-sm bg-black border border-zinc-50"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="text-white rounded-lg py-1 px-2 uppercase text-sm bg-black border border-zinc-50">
                Sign In / Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
