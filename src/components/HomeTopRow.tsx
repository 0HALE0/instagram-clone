import Avatar from "./Avatar";
import { PlusIcon } from "lucide-react";
import { Follower, Profile } from "@prisma/client";

export default async function HomeTopRow({profiles,}:{follows:Follower[], profiles:Profile[]}){
    return (
        <div className="flex gap-3 lg:justify-center max-w-full overflow-x-auto">
            <div><button className="size-[85px] bg-gradient-to-tr from-ig-red to-ig-pink text-white rounded-full flex items-center justify-center">
                <PlusIcon size={52}/></button> <p className="text-center text-ig-red text-sm">New Story</p></div>
            {profiles.map(profile => (
            // eslint-disable-next-line react/jsx-key
            <div className="w-24 flex justify-center flex-col items-center"><div>
                <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-ig-pink to-ig-red">
                  <div className="inline-block p-1.5 bg-white rounded-full dark:bg-gray-950"> 
                    <Avatar size={6} radius="full" fallback={'avatar'} src={profile.avatar || ''}/>
                  </div></div></div><p className="text-center text-ig-red text-sm">{profile.username}</p> </div>))}</div>
    );
} 