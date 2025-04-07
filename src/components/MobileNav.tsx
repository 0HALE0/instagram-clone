import Link from "next/link";
import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserCircleIcon } from "lucide-react";

export default function MobileNav(){
    return(
        <div className=" block lg:hidden fixed bottom-0 py-2 left-0 right-0">
          <div className="flex text-gray-700 dark:text-gray-300 *:flex *:items-center">  
          <div className="pl-2 bg-white dark:bg-gray-950 rounded-t-xl w-full relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
          <Link href="/"><HomeIcon/></Link>
          <Link href="/search"><SearchIcon/></Link>
          </div>
          <div className="size-14 relative -top-4 justify-center w-[140px]">
          <div className="absolute bg-blue-500 bg-clip-text border-white dark:border-gray-950 border-t-transparent border-l-transparent border-[50px] rounded-full rotate-45 ">
            <div className="border-4 size-15 border-transparent">
            <Link href="/create" className="-rotate-45 bg-gradient-to-tr from-ig-pink to-ig-red size-12 flex items-center justify-center text-white dark:text-gray-950 rounded-full"><CameraIcon/></Link>
          </div></div></div>
          <div className=" pr-2 w-full bg-white dark:bg-gray-950 rounded-t-xl relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
          <Link href="/browser"><LayoutGridIcon/></Link>
          <Link href="/profile" className="text-ig-red" ><UserCircleIcon/></Link>
          </div></div></div>
          
    )
}