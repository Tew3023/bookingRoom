import { CalendarDays } from "lucide-react"
export default function Checkin(){
    return (
        <button className="w-full h-full p-2 flex gap-5 items-center">
      <CalendarDays className="w-5 h-5" />
      <div className="flex flex-col text-start">
        <p className="text-sm">Check - In</p>
      </div>
    </button>
    )
}