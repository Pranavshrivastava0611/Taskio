"use client"

import React,{ReactNode} from "react"
// import { RoomProvider,ClientSideSuspense,LiveblocksProvider } from "@liveblocks/react/suspense"
import { RoomProvider } from "@/liveblocks.config"
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap,LiveList,LiveObject } from "@liveblocks/client"
import { Layer } from "@/types/canvas"


export const Room = ({children,roomId,fallback}: {
    children : React.ReactNode,
    roomId : string
    fallback : NonNullable<ReactNode> | null
})=>{
    const key : string = process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLISHABLE_KEY!;
    return (
        <RoomProvider id={roomId} initialPresence={{cursor : null , selection : [] , penColor : null , pencilDraft : null}} initialStorage={{
            layers : new LiveMap<string,LiveObject<Layer>>,
            layerIds : new LiveList(),
        }} >
            <ClientSideSuspense fallback={fallback}>
                {()=> children}
            </ClientSideSuspense>
        </RoomProvider>
    )
} 

