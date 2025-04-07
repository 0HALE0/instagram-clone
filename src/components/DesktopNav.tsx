import Image from "next/image";
import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserCircleIcon} from "lucide-react";
import Link from "next/link";
import logo from '../app/ig.png'

export default function DesktopNav(){
    return(
        <div className="hidden lg:block shadow-xl shadow-gray-400 px-1 pb-1 w-48 sticky">
            <div className="sticky top-1">
            <Image className="dark:invert" src={logo} alt=""/>
              <div className=" ml-2 inline-flex flex-col gap-6 mt-1 *:flex *:items-center *:gap-2">
              <Link href={'/'}><HomeIcon/>Home</Link>
              <Link href={'/search'}><SearchIcon/>Search</Link>
              <Link href={'/browser'}><LayoutGridIcon/>Browse</Link>
              <Link href={'/profile'}><UserCircleIcon/>Profile</Link>
              <Link href={'/create'}><CameraIcon/>Create</Link>
              </div></div></div>
    )
}