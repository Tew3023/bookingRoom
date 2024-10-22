import { AlignLeft } from "lucide-react";

export default function Nav() {
  return (
    <nav className="h-32 bg-white/75 w-full border border-b border-zinc-300 backdrop-blur-xl">
      <div className="h-full w-full mt-2">
        <div className="uppercase text-center text-2xl">kona village</div>
        <div className="uppercase text-center text-sm">a rosewood resort</div>
        <div className="flex justify-between items-center w-full mt-5 h-10 px-5">
          <AlignLeft className="h-6 w-6" />
          <div className="flex space-x-10 uppercase text-sm font-semibold">
            <p>overview</p>
            <p>accommodation</p>
            <p>dining</p>
            <p>offers</p>
            <p>wellness</p>
            <p>meeting & events</p>
            <p>experiences</p>
            <p>shop</p>
          </div>
          <div className="flex flex-col space-y-2">
            <button className="text-white rounded-lg py-1 px-2 uppercase text-sm border boder-zinc-50 bg-black ">
              sing in / up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
