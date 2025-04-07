'use client' ;
import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { UploadCloudIcon } from "lucide-react";
import { updateProfile } from "@/actions";
import { useRouter } from "next/navigation";
import { Profile } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({userEmail, profile }:{userEmail:string, profile:Profile | null}) {
    const router = useRouter();
    const fileInRef = useRef <HTMLInputElement>(null);
    const [file, setFile] = useState <File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const[avatarUrl, setAvatarUrl]= useState (profile?.avatar || null);
    useEffect(() => {
        if (file){
            setIsUploading(true);
            const data= new FormData();
            data.set("file", file);
            fetch("/api/upload", {
              method: "POST",
              body: data,
            }).then(response => {response.json().then(url=>{setAvatarUrl(url); setIsUploading(false);})});
        }
    }, [file]);
    return(
     <form action={async (data: FormData) =>{
        //console.log(data.get('username'));
        await updateProfile(data, userEmail);
        router.push('/profile');
        router.refresh();
        }}>
        <input type="hidden" name="avatar" value={avatarUrl ||''} />
        <div className="flex gap-4 items-center">
            <div>
            <div className="bg-gray-400 size-24 overflow-hidden rounded-full aspect-square shadow-md shadow-gray-400">
            <img src={avatarUrl ||''} alt="" />
            </div></div>
            <div>
                <input type="file" ref={fileInRef} className="hidden" onChange={ev => setFile(ev.target.files?.[0] || null)}/>
                <Button disabled={isUploading} type="button" variant="surface" onClick={() => fileInRef.current?.click()}>
                {!isUploading &&(<UploadCloudIcon/>)}{isUploading ? 'Uploading...' : 'Change Avatar'}</Button>
            </div>
        </div>
        <p className="mt-2 font-bold">username</p>
        <TextField.Root name="username" defaultValue={profile?.username || ''}
        placeholder="your_username"/>
        <p className="mt-2 font-bold">name</p>
        <TextField.Root name="name" defaultValue={profile?.name || ''} placeholder="your_name" />
        <p className="mt-2 font-bold">subtitle</p>
        <TextField.Root name="subtitle" defaultValue={profile?.subtitle || ''} placeholder="your_subtitle" />
        <p className="mt-2 font-bold">bio</p>
        <TextArea name="bio" defaultValue={profile?.bio || ''} placeholder="your_bio"/>
        <label className="flex gap-2 items-center mt-2"><span>Dark Mode: </span><Switch 
        defaultChecked={localStorage.getItem('theme')=='dark'}
        onCheckedChange={(isDark)=>{
            const html = document.querySelector('html'); 
            const theme = isDark ? 'dark': 'light';
            if(html) {
                html.dataset.theme = theme;
            }
            localStorage.setItem('theme', theme);
            window.location.reload();}}/> </label>
        <div className="mt-4 flex justify-center">
        <Button variant="solid">Save settings</Button>
        </div>
        
    </form>
    
    );
}


