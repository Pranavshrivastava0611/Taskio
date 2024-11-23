"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,DropdownMenuSeparator} from '@radix-ui/react-dropdown-menu'
import { Link2, Pencil, Trash, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
  import { Button } from './Button';
  import { MoreHorizontal } from 'lucide-react';
  import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { ConfirmModal } from './confirm-modal'
import { useRenameModal } from '@/store/useRenameModal'

interface ActioProps {
    children: React.ReactNode,
    side?: 'top' | 'right' | 'bottom' | 'left', // assuming this is a valid type for side
    sideoffset?: number,
    id: string,
    title: string,
}

function Action({ children, side, sideoffset, id, title }: ActioProps) {

    // Define the oncopy function inside the component to have access to `id`
    const onCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast("Link copied"))
            .catch(() => toast("Failed to copy Link"));
    };

    const {mutate,pending} = useApiMutation(api.board.remove);

    const onDelete = ()=>{
        mutate({
            id
        }).then(()=> toast("Successfully deleted")).catch((error)=>toast("Failed to delete "))
    }
    
    const { onOpen } = useRenameModal();



    return (
        <DropdownMenu>
  <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
  <DropdownMenuContent className='w-60 bg-black rounded-md text-white' side={side} sideOffset={sideoffset} onClick={(e)=>{
    e.stopPropagation() ;
    e.preventDefault();
  }}>
    <DropdownMenuSeparator />
    <DropdownMenuItem className=" group p-3 cursor-pointer flex items-center space-x-2 rounded-md focus:outline-none focus:ring-2  " onClick={onCopy}>
    <Link2 className="h-5 w-5 text-gray-600" />
    <span className="text-sm text-white font-medium ">Copy board link</span>
</DropdownMenuItem>
<ConfirmModal header='Delete board ?' description='This will delete the board and all of its content' onConfirm={onDelete} disabled={pending}>
    <Button className=" group p-3 cursor-pointer w-full justify-start font-normal   ">
    <Trash2 className="h-5 w-5 text-gray-600" />
    <span className="text-sm text-white font-medium ">Delete Board</span>
</Button>
</ConfirmModal>
<DropdownMenuItem className=" group p-3 cursor-pointer flex items-center space-x-2 rounded-md focus:outline-none focus:ring-2  " onClick={()=>onOpen(id,title)}>
    <Pencil className="h-5 w-5 text-gray-600" />
    <span className="text-sm text-white font-medium ">Rename</span>
</DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
    );
}

export default Action;
