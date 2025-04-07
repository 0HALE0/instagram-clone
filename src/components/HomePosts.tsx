import { prisma } from "@/db";
import { Follower, Profile } from "@prisma/client";
import Avatar from "./Avatar";
import { getSessionEmailOrThrow } from "@/actions";
import LikesInfo from "./LikesInfo";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

export default async function HomePosts({profiles,}:{follows:Follower[],profiles:Profile[],}){
    const posts = await prisma.post.findMany({
        where:{email: {in: profiles.map(p=>p.email)},},
        orderBy: {createdAt: 'desc',},
        take: 100,
    });

    const likes = await prisma.like.findMany({where:{email:await getSessionEmailOrThrow(), postId:{in:posts.map(p=>p.id)},},});
    const bookmarks = await prisma.bookmark.findMany({where:{email:await getSessionEmailOrThrow(), postId:{in:posts.map(p=>p.id)},},});
    return (
        <div className="max-w-md mx-auto flex flex-col gap-8">{posts.map(post=>{ 
            const profile = profiles.find(p=>p.email===post.email);
            return ( 
            <div key={post.id} className="">
                <Link href={`/posts/${post.id}`}><img className="block rounded-lg shadow-md shadow-black" src={post.image} alt=""/></Link>
                <div className="flex items-center gap-2 mt-4 justify-between">
                    <div className="flex gap-2 items-center"><Avatar radius="full" src={profile?.avatar || ''} size="2" fallback="avatar" />
                    <Link className="font-bold text-gray-700 dark:text-gray-300" href={`/users/${profile?.username}`}>{profile?.name}</Link>
                    <p className="text-gray-700 dark:text-gray-400">{post.description}</p></div>
                <div className="flex gap-2 items-center"><LikesInfo post={post} showText={false} sessionLike={likes.find(like=>like.postId===post.id) || null}/>
                    <BookmarkButton post={post} sessionBookmark={bookmarks.find(b=>b.postId == post.id) || null}></BookmarkButton>
                </div>
                </div></div>
        );})}</div>
    );
}