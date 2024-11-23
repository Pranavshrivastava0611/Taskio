"use client"

import { useOrganization,useOrganizationList } from "@clerk/nextjs"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Hints from "@/components/ui/Hints"

interface itemsProps{
    id : string,
    name : string,
    ImageUrl : string
}

export const Items=({
    id,name,ImageUrl
} : itemsProps)=>{
    const {organization} = useOrganization(); // this will give the current organization and help us to take the information
    const {setActive} = useOrganizationList();
    const isActive = (organization?.id === id) ;
const onclick = ()=>{
    if(!setActive) return;
    setActive({organization : id});
}
    
    return (
        <div className="aspect-square relative">
            <Hints label={name} sideOffset={18} side="right" alignoffset={0}>
            <Image src={ImageUrl} alt={name} className={cn("rounded-md opacity-50 cursor-pointer hover:opacity-100 transition",isActive && "opacity-400")} onClick={onclick} fill/>
            </Hints>
        </div>
    )
}