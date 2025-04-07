'use client';
import { bookmarkPost, unbookmarkPost } from "@/actions";
import { Bookmark, Post } from "@prisma/client";
import { BookmarkIcon} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookmarkButton({post, sessionBookmark,}:{post:Post;sessionBookmark:Bookmark|null;showText?:boolean;}){
    const router = useRouter();
    const [bookmarkedByMe, setBookmarkedByMe] = useState(!!sessionBookmark);
    return(
        <form action={async()=>{
            setBookmarkedByMe(prev=>!prev);
            if (bookmarkedByMe){
                // remove bookmark
                await unbookmarkPost(post.id)
            } else {
                //add bookmark
                await bookmarkPost(post.id);
            }
            router.refresh();

        }} className="flex gap-2 items-center">
            <input type="hidden" name="postId" value={post.id}/>
            <button type="submit" ><BookmarkIcon className={bookmarkedByMe ? ' fill-gray-800 dark:fill-white'  : 'dark:text-white'}/></button>
           </form>
    ); 

}