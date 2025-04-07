import Link from "next/link";
import FollowButton from "./FollowButton";
import { CheckIcon, ChevronLeft, Settings } from "lucide-react";
import { Follower, Profile } from "@prisma/client";

export default function ProfilePageInfo({profile, isOurProfile=false, ourFollow=null,}:{profile:Profile; isOurProfile?:boolean; ourFollow:Follower|null;}){
    return(
        <div>
            <section className="flex justify-between items-center">
        <button>
            <ChevronLeft/>
        </button>
        <div className="font-bold flex items-center gap-2">
            {profile.username}
            <div className="size-5 rounded-full bg-ig-pink inline-flex justify-center items-center text-white">
                <CheckIcon size={16}/>
            </div>
        </div><div> {isOurProfile && ( 
            <Link href='/settings'>
            <Settings/>
        </Link>)}
        </div>
    </section>
    <section className="mt-8 flex justify-center">
    <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-ig-pink to-ig-red">
        <div className="size-44 p-2 bg-white rounded-full dark:bg-gray-950">
        <div className="size-40 aspect-square overflow-hidden rounded-full">
        <img src= {profile.avatar ||''}/>
        </div>
        </div>
        </div>
    </section>
    <section className="text-center mt-4">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500 mb-1 mt-1" >{profile.subtitle}</p>
        <p>
            {profile.bio}<br/>
            contact: {profile.email}
        </p>
    </section>
    {!isOurProfile && ( 
        <section className="flex justify-center my-3"><FollowButton ourFollow={ourFollow} profileIdtoFollow={profile.id}/></section>)}
        </div>
    )
}