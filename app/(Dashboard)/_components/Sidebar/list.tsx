"use client"


import { useOrganizationList } from "@clerk/nextjs"
import { Key } from "lucide-react"
import { Items } from "./items"
import { Organization } from "@clerk/nextjs/server"
import Hints from "@/components/ui/Hints"


export const List = ()=>{
    const {userMemberships} = useOrganizationList({
        userMemberships : {
            infinite : true,
        }
    })

    if(userMemberships.data?.length === 0) return null
    return (
        <ul className="space-y-4">
            {userMemberships.data?.map((mem)=>(
                <>
               <Items key={mem.organization.id} id={mem.organization.id} name={mem.organization.name} ImageUrl={mem.organization.imageUrl}/>
               </>
               
            ))}
        </ul>
    )
}