import { User } from "lucide-react";
import { useState } from "react";
import Guest2 from "../Guest2";
import { useSelector } from "react-redux";

export default function Comuser() {
  const [popup, setPopup] = useState(false);
  const data = useSelector((state) => state.counter.guest)
  const handdle = () => {
    setPopup(!popup);
  };
  return (
    <>
      {popup && (
        <div>
          <Guest2 toggle={handdle} />
        </div>
      )}
      <button
        onClick={handdle}
        className="w-full h-full p-2 flex gap-5 items-center"
      >
        <User className="w-5 h-5" />
        <div className="flex flex-col text-start">
          <p className="text-sm">Guest</p>
          <p className="text-sm">
            <span>{data.adult} Adult </span>
            <span>, </span>
            <span>{data.children} Children</span>
          </p>
        </div>
      </button>
      {popup && <div></div>}
    </>
  );
}
