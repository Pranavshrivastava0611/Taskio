"use client"

import { LucideIcon } from "lucide-react"
import Hints from "@/components/ui/Hints"
import { Button } from "@/components/ui/Button"

interface ToolbuttonProps {
    label : string ,
    icon : LucideIcon,
    isdisabled? : boolean,
    isActive? : boolean,
    onclick : ()=>void
}

export const ToolButton = ({label,icon : Icon , isActive,isdisabled,onclick} : ToolbuttonProps)=>{
    return (
   <Hints label={label} sideOffset={14} side="right" alignoffset={0}>
     <Button disabled={isdisabled} onClick={onclick} size={"icon"} variant={isActive ? "boardActive" : "board"}>
        <Icon/>
    </Button>
   </Hints>
    )
  
}