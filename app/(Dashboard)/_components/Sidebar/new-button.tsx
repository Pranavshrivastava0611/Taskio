"use client"

import { PlaySquare, Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import Hints from "@/components/ui/Hints"



const NewButton = ()=>{
    return (
        <Dialog>
            <DialogTitle> </DialogTitle>
            <DialogTrigger asChild>
                    <div className="aspect-square">
                        <Hints label="Create Organization" sideOffset={18} side="right" align="start" alignoffset={0}>
                        <button className="h-full w-full flex justify-center items-center bg-white/25 rounded-md opacity-55 hover:opacity-100 transition">
                        <Plus className="text-white "/>
                        </button>
                        </Hints>
                    </div>
            </DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent max-w-[480px] flex justify-center items-center h-screen w-screen">
                <CreateOrganization/>
            </DialogContent>
        </Dialog>


    )
}


export default NewButton