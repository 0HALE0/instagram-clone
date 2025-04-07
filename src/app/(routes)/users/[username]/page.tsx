import { getSessionEmail } from "@/actions";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/db";

export default async function UserProfilePage({params:{username},}:{params:{username:string};}){
    const profile = await prisma.profile.findFirstOrThrow({where:{username:username}});
     // Check if the profile belongs to the current user
    const isOurProfile = (await getSessionEmail()) === profile.email;
    const ourFollow = await prisma.follower.findFirst({
        where:{
            followingProfileEmail: await getSessionEmail() || '',
            followedProfileId: profile.id,
    },});
    return (
          <ProfilePageContent ourFollow={ourFollow} profile={profile} isOurProfile={isOurProfile}/>
    );
}