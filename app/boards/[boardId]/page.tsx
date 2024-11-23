" use client"

import React from 'react'
import { Canvas } from '../_component/Canvas'
import { Room } from '@/components/ui/room'

import LoadingSpinner from '@/components/LoadingSpinner'
import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'

interface CanvasProps{
  params : {
    boardId : Id<"Board">,
  }
}
function Page({params} : any){
   const {boardId} : any = React.use(params)
  return (
    
    <Room roomId={boardId} fallback={<LoadingSpinner/>}>
      <Canvas boardId={boardId}/>
    </Room>

  )
}

export default Page
