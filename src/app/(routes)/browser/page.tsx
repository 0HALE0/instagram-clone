import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";

export default async function BrowserPage(){
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        take: 100,
    });
    return( 
        <div>
        <div className="mb-4"><h1 className="text-xl font-bold text-slate-700">Browse</h1>
        <p className="text-gray-600">Check trending posts and find some inspiration in here!</p></div>
        <PostsGrid posts={posts}/></div>
    );
}