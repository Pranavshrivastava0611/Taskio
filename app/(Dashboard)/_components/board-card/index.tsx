"use client";


import Link from "next/link";
import Image from "next/image";
import Overlay from "./Overlay";
import { useAuth } from "@clerk/nextjs";
import {formatDistanceToNow} from "date-fns"
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import Action from "@/components/ui/Action"
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


interface boardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavourite: boolean;
}

export  const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavourite,
}: boardCardProps) => {

  const {userId} = useAuth();
  console.log("user : ",userId)
  const authorLabel = userId===authorId ? "You" : authorName
  const createdAtlabel = formatDistanceToNow(createdAt,{
    addSuffix : true,
  })

  const {mutate : onFavourite , pending : onFavouritePeding} = useApiMutation(api.board.favourite)
  const {mutate : onUnFavourite , pending : onUnFavouritePeding} = useApiMutation(api.board.unfavourite)

  const toggle = ()=>{
    if(isFavourite){
      onUnFavourite({id}).then(()=>{
        toast("Board removed from Favourite")
      }).catch((Error)=> toast("Failed to remove from favourite"))
    }else{
      onFavourite({id,orgId}).then(()=> toast("Board added to favourite")).catch(()=>toast("Failed to add on favourite"))
    }
  }

  return (
    <Link href={`boards/${orgId}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden ">
        <div className="relative flex-1 bg-amber-50">
                 <Image src={imageUrl} alt={title} fill  className="object-fit" />
                 <Overlay/>
                 <Action id={id} title={title} side="top" >
                  <button className=" absolute right-1 top-1 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                    <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" /></button>
                 </Action>
        </div>
        <Footer isFavourite={isFavourite} title={title} authorLabel={authorLabel} createdAtlabel={createdAtlabel} onclick={toggle} disabled={false}/>
        </div>
    </Link>
  )
};


BoardCard.Skeleton = function BoardCardSkeleto(){
  return (
    <div className="rounded-lg aspect-[100/127] overflow-hidden">
      <Skeleton className="h-full w-full"/>
    </div>
  )
}
