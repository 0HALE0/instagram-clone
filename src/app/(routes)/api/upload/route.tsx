import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config"

export const config = {
    api: {
        bodyParser :false,
    },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    //const info = await pinata.groups.create({name:'ig-photos', isPublic:true});
    const uploadData = await pinata.upload.file(file, {groupId: '40ad520a-8bf9-425c-975c-76edb43db7b7',});
    const fileUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/files/${uploadData.IpfsHash}`;
    //const url = await pinata.gateways.createSignedURL({
      //  cid: uploadData.cid,
      //  expires: 3600,
   // });
   //console.log({info});
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}