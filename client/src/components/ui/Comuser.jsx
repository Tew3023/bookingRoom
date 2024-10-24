import { User } from "lucide-react";

export default function Comuser() {
  return (
    <>
    <button   className="w-full h-full p-2 flex gap-5 items-center">
      <User className="w-5 h-5" />
      <div className="flex flex-col text-start">
        <p className="text-sm">Guest</p>
        <p className="text-sm">
          <span>1 Adult </span>
          <span>, </span>
          <span>0 Children</span>
        </p>
      </div>
    </button>
    </>
    
  );
}
