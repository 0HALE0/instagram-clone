'use server';
import { prisma } from "@/db";
import { auth } from "./auth";
import { uniq } from "lodash";

export async function getSessionEmail(): Promise<string|null|undefined> {
    const session = await auth();
    return session?.user?.email;
}

export async function getSessionEmailOrThrow(): Promise<string> {
    const userEmail = await getSessionEmail();
    if (!userEmail){
        throw 'not logged in';
    }
    return userEmail;
}

export async function updateProfile(data: FormData, userEmail: string){
    //const userEmail = await getSessionEmailOrThrow();
    const newUserInfo={username: data.get('username') as string, //make getting values easy
        name: data.get('name') as string,
        subtitle: data.get('subtitle') as string,
        bio: data.get('bio') as string,
        avatar: data.get('avatar') as string,}
    
    await prisma.profile.upsert({
        where:{
            email: userEmail, //if we have email 
       },
        update: newUserInfo,
        create:{ //if we don't have an email create a new user
            email: userEmail,
          ...newUserInfo,
       },
    });
}

export async function postEntry(data: FormData){
    const sessionEmail = await getSessionEmailOrThrow();
    const postDoc = await prisma.post.create({
        data:{
            email: sessionEmail,
            image: data.get('image') as string,
            description: data.get('description') as string || '',
        },
    });

    return postDoc.id;
}

export async function postComment(data:FormData){
    const authorEmail=await getSessionEmailOrThrow();
    return await prisma.comment.create({
        data:{
            email: authorEmail,
            postId: data.get('postId') as string,
            text: data.get('text')as string,
        },
    });
}

async function updatePostLikesCount(postId: string){
    await prisma.post.update({where:{id:postId},
    data:{likesCount: await prisma.like.count({where:{postId}}),},})
}

export async function likePost(data:FormData){
    const postId = data.get('postId') as string;
    await prisma.like.create({data:{
        email: await getSessionEmailOrThrow(),
        postId,
    },});
    await updatePostLikesCount(postId);
}

export async function removeLikeFromPost(data:FormData){
    const postId = data.get('postId') as string;
    await prisma.like.deleteMany({where:{
        email: await getSessionEmailOrThrow(),
        postId,
    },});
    await updatePostLikesCount(postId);
}

export async function getSinglePostData(postId:string){
     const post = await prisma.post.findFirstOrThrow({where:{id:postId}});
            const authorProfile = await prisma.profile.findFirstOrThrow({where:{email:post.email}});
            const comments = await prisma.comment.findMany({where:{postId:post.id}});
            const commentsAuthors = await prisma.profile.findMany({where:{email:{in: uniq (comments.map(c=>c.email))},},})
            const myLike = await prisma.like.findFirst({
                where:{
                    email: await getSessionEmailOrThrow(),
                    postId: post.id,
                }});
            const myBookmark = await prisma.bookmark.findFirst({
                where:{
                    email: await getSessionEmailOrThrow(),
                    postId: post.id,
                
                }
            });
return{
    post, authorProfile, comments, commentsAuthors, myLike, myBookmark
};
}

export async function followProfile(profileIdtoFollow: string){
    const sessionProfile = await prisma.profile.findFirstOrThrow({where:{email: await getSessionEmailOrThrow()},});
    await prisma.follower.create({
        data:{
            followingProfileEmail: sessionProfile.email,
            followingProfileId: sessionProfile.id,
            followedProfileId: profileIdtoFollow,

        },
    });
}
export async function unfollowProfile(){
    const sessionProfile = await prisma.profile.findFirstOrThrow({where:{email: await getSessionEmailOrThrow()},});
    await prisma.follower.deleteMany({
        where:{
            followingProfileEmail: sessionProfile.email,
            followingProfileId: sessionProfile.id,
        },
    });
}

export async function bookmarkPost(postId:string){
    const sessionEmail = await getSessionEmailOrThrow();
    await prisma.bookmark.create({data:{
        email:sessionEmail,
        postId,
    },});
}

export async function unbookmarkPost(postId:string){
    const sessionEmail = await getSessionEmailOrThrow();
    await prisma.bookmark.deleteMany({where:{
        email:sessionEmail,
        postId,
    },});
}