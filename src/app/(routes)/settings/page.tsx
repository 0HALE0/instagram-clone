import { prisma } from "@/db";
import { auth, signOut } from "@/auth";
import SettingsForm from "@/components/SettingsForm";
import { Button } from "@radix-ui/themes";


export default async function SettingsPage(){
    const session = await auth();
    if (!session?.user?.email){
        return 'not logged in';
    }
    
    const profile = await prisma.profile.findFirst({where:{email:session?.user?.email as string}});
    
    return(
        <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>
            <p className="text-ig-pink text text-xs text-center -mt-4 mb-4">{session.user.email}</p>
       <SettingsForm userEmail={session.user.email} profile={profile}/>
       <div className="flex justify-center mt-4 pt-4 border-t border-gray-200">
        <form action={async() => {'use server'; await signOut();}}>
        <Button type="submit" variant="outline">Logout</Button></form></div>
        </div>
    )

}