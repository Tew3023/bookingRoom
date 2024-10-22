import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="p-10">
        <div className="grid grid-cols-2">
          <div >
            <p className="text-xl">
            KONA VILLAGE, A ROSEWOOD RESORT
            </p>
            
        </div>
          <div className="space-x-5  flex flex-row">
            <div className="text-sm text-muted-foreground" href="#">
              <Link to='*' className="">Term</Link>
            </div>
            <div className="text-sm text-muted-foreground" href="#">
              <Link to='*' className="">Privacy Policy</Link>
            </div>
            <div className="text-sm text-muted-foreground" href="#">
              <Link to='*' className="">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
