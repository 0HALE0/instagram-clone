import { prisma } from "@/db"
import { Avatar } from "@radix-ui/themes";
import Link from "next/link";
import PostsGrid from "./PostsGrid";

export default async function SearchResults({query}:{query:string}){
    const profiles = await prisma.profile.findMany({where: {
        OR: [ 
            {username:{contains:query},},
            {name: {contains: query},},
        ],
    },
take:10,});

    const posts = await prisma.post.findMany({where:{description: {contains:query},},
    take:100,})

    return(
        <div><h1 className="text-lg mt-4">Search results for : {query}</h1>
        {profiles?.length > 0 && (
                    <div className="grid mt-4 sm:grid-cols-2 gap-2">
                    {profiles.map(profile=>(
                        <Link  key={profile.username}  href={`/users/${profile.username}`} 
                        className="flex gap-2 bg-pink-100 border border-pink-300 dark:border-pink-700 dark:bg-pink-600 p-2 rounded-full"> 
                            <div className=""><Avatar 
                            size="4"
                            radius="full"
                            src={profile.avatar || ''} 
                            fallback={"user avatar"} />
                            </div>
                    <div>
                        <h3 className="dark:text-gray-300">{profile.name}</h3>
                        <h4 className="text-gray-700 text-sm">
                        @{profile.username}</h4></div>
                    </Link>))}
                </div>
        )}
        <div className="mt-4"><PostsGrid posts={posts}/></div></div>
    )
}