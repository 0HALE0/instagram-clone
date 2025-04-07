import Comment from "@/components/Comment";
import SessionCommentForm from "@/components/SessionCommentForm";
import { Suspense } from "react";
import LikesInfo from "@/components/LikesInfo";
import { Bookmark, Comment as CommentModal, Like, Post, Profile } from "@prisma/client";
import Preloader from "./Preloader";
import BookmarkButton from "./BookmarkButton";


export default async function SinglePostContent({post,authorProfile,comments,commentsAuthors,myLike,myBookmark}:
    {post:Post; authorProfile:Profile; comments:CommentModal[]; commentsAuthors:Profile[]; myLike:Like|null; myBookmark:Bookmark|null;}){
        return (
            <div className="dark:bg-gray-950">
                <div className="grid md:grid-cols-2 gap-4 ">
                    <div>
                    <img className="rounded-md" src={post.image} alt={post.description}/>
                </div>  <div>
                <Comment createdAt={post.createdAt} text={post.description} authorProfile={authorProfile} />
                    <div className="pt-4 flex flex-col gap-4 ">{comments.map(comment=>(
                    <div key={comment.id}> <Comment createdAt={comment.createdAt} text= {comment.text} authorProfile={commentsAuthors.find(a => a.email === comment.email)}/> </div>
                    ))}</div>
                    <div className="flex items-center gap-2 justify-between text-gray-700 dark:text-gray-400 py-4 mt-4 border-t border-t-gray-300 dark:border-gray-700">
                        <LikesInfo post={post} sessionLike={myLike}/>
                        <div className="flex items-center"><BookmarkButton post={post} sessionBookmark={myBookmark}/>
                        </div></div>
                    <div className="pt-8 border-t border-t-gray-300 dark:border-gray-700">
                        <Suspense fallback={<Preloader/>}>
                            <SessionCommentForm postId={post.id}/>
                        </Suspense>
                    </div>
                </div>
                </div>
            </div>
        );
}