'use client';
import { followProfile, unfollowProfile } from "@/actions";
import { Follower } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton ({isOurProfile=false, profileIdtoFollow,ourFollow=null,}:{profileIdtoFollow:string; isOurProfile?:boolean; ourFollow:Follower|null;}){
    const router = useRouter();
    const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow)
      // Don't render the button if it's the current user's profile
    if (isOurProfile) {
       return null;}
       
    return(
        <form action={async() => {
         setIsFollowed(prev=>!prev);
         if (isFollowed){
            //setIsFollowed(false);
            await unfollowProfile(profileIdtoFollow); //unfollow

         } else {
            //setIsFollowed(true);
            await followProfile(profileIdtoFollow) //follow
         }
         router.refresh();
}}>
   <Button size="3" color={ isFollowed ? "gray" : "ruby"}>{isFollowed ?<UserMinusIcon/>:<UserPlusIcon/>}{isFollowed ? 'Unfollow': 'Follow'}</Button>
        </form>
     
    );
}