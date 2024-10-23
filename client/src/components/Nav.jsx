import { AlignLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="h-32 bg-white w-full border border-b border-zinc-300 backdrop-blur-xl">
      <div className="h-full w-full mt-2">
        <Link to="/">
          <div className="flex justify-center items-center w-full">
            <div className="text-center">
              <div className="uppercase text-2xl">kona village</div>
              <div className="uppercase text-sm">a rosewood resort</div>
            </div>
          </div>
        </Link>
        <div className="flex justify-between items-center w-full mt-5 h-10 px-5">
          <AlignLeft className="h-6 w-6" />
          <div className="flex space-x-10 uppercase text-sm font-semibold">
            <p className="cursor-pointer hover:underline underline-offset-8 transition-all">
              overview
            </p>
            <p className="cursor-pointer hover:underline underline-offset-8 transition-all">
              accommodation
            </p>
            <p className="cursor-pointer hover:underline underline-offset-8 transition-all">
              dining
            </p>
            <p className="cursor-pointer hover:underline underline-offset-8 transition-all">
              offers
            </p>
            <p className="cursor-pointer hover:underline underline-offset-8 transition-all">
              wellness
            </p>
            <p className="cursor-pointer hover:underline underline-offset-8 transition-all">
              meeting & events
            </p>
            <p className="cursor-pointer hover:underline underline-offset-8 transition-all">
              experiences
            </p>
            <p className="cursor-pointer hover:underline underline-offset-8 transition-all">
              shop
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Link to="/login">
              {" "}
              <button className="text-white rounded-lg py-1 px-2 uppercase text-sm border boder-zinc-50 bg-black ">
                sing in / up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
