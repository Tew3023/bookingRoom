import { Phone , Hotel   } from "lucide-react";
export default function Bg2() {
  
  return (
    <>
      <div className="bg-custom-image bg-cover bg-center relative h-96 px-20">
        <div className="absolute bottom-0 px-8 py-8 bg-white/75 backdrop-blur-sm w-max h-max space-y-2 rounded-t-md">
            <h1 className="text-3xl uppercase">Kona Village, A Rosewood Resort</h1>
            <p className="flex space-x-2"><Hotel className="w-5 h-5" /> <span>Address:
            72 300 Maheawalu Drive, Kailua-Kona, Hawaii, United States, 96740</span></p>
            <p className="flex space-x-2"><Phone className="w-5 h-5" /><span>
            +1 808 865 0100</span></p>
        </div>
      </div>
      
    </>
  );
}
