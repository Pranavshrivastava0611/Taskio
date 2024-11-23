

import React from 'react'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
interface BPorps{
    orgId : string,
    disabled : boolean
}

function NewBoardButton({
    orgId,disabled
} : BPorps) {
    const {mutate,pending} = useApiMutation(api.board.create);
    const Router = useRouter()
    const onclick = ()=>{
        mutate({
            orgId,
            title : "Untitled"
        }).then((id)=>{
            console.log("id after creation ",id)
            toast("Board Created")
            // Router.push(`/board/${id}`);
        }).catch((error)=>{
            toast("Failed to Create the Board")
        })
    }
  return (
    <>
    <button disabled={disabled || pending} 
    onClick={onclick}
    className={cn("col-span-1 aspcet-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",(disabled || pending) && "opacity-75 hover:bg-blue-600 ")} >
    <div/>
    <Plus className='h-12 w-12 text-white stroke-1'/>
    <p className='text-sm text-white font-light'>New Board</p>
    </button>
    </>

    
  )
}

export default NewBoardButton
