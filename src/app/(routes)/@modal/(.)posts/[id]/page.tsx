import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense} from "react";

export default async function PostInModal(props:{params: Promise<{id:string}>}) {
    const params = await props.params;

    const {
        id
    } = params;
    return (
        <Modal> 
            <Suspense fallback={<Preloader/>}>
                <ModalPostContent postId={id}/></Suspense></Modal>
);
}