'use client'; 
import { PulseLoader } from "react-spinners";

export default function Preloader(){
    return(
        <div className="dark:bg-gray-950"><PulseLoader loading={true} color="pink"/></div>
        
    );
}