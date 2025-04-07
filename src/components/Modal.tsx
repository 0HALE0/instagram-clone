'use client';
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
export default function Modal({children}:{children:ReactNode}){
    const router = useRouter();
    return (
        <div 
        onClick={()=> router.back()}
        className="bg-black/80 dark:bg-gray-700/80 fixed inset-0 z-20"> 
        <div className="bg-white dark:bg-gray-950 rounded-lg left-8 right-8 top-9 bottom-9">
        <div 
        onClick={ev=>ev.stopPropagation()}
        className="absolute top-4 bottom-4 z-30 overflow-y-auto rounded-lg">
            <div className="relative bg-white p-4 ">{children}</div></div></div></div>
    );

}