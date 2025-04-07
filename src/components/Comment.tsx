import { Profile } from "@prisma/client";
import Avatar from "./Avatar";
import {format} from "date-fns";

export default function Comment({text, authorProfile, createdAt,}:{text:string; authorProfile?:Profile; createdAt:Date;}){
    return(
        <div className="flex gap-2"> <div>   
                        <Avatar src={authorProfile?.avatar ||''}/>
                    </div> <div className="w-full">
                        <div className="flex  justify-between gap-2">
                            <div><h3 className="flex gap-1 dark:text-gray-300">{authorProfile?.name}
                    </h3>
                    <h4 className="text-pink-600 text-sm -mt-1">@{authorProfile?.username}</h4></div>
                        </div>
                    <div>  <div className="bg-gray-200 border dark:bg-gray-700 dark:text-gray-300 border-pink-300 rounded-md p-4 mt-2">
                    <p>{text}</p></div>
                    <div className="text-xs text-gray-400 text-right">{format(createdAt, 'yyyy-MM-dd HH:mm:ss')}</div></div></div></div>
    );
}