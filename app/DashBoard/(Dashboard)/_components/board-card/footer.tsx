"use client"

import { cn } from "@/lib/utils"
import { Star } from "lucide-react"


interface FooterProps{
  
    authorLabel  : string,
    createdAtlabel : string,
    title : string,
    isFavourite : boolean ,
    disabled : boolean,
    onclick : ()=>void,
}



export const Footer = ({
    authorLabel,createdAtlabel,title,isFavourite,disabled,onclick
} : FooterProps)=>{
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onclick();
      };
    return (
        <div className="relative bg-white p-3 ">
            <p className="text-[3xl] truncate max-w-[calc(100%-20px)]">{title}</p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">{authorLabel},{createdAtlabel}</p>
            <button className={cn("opacity-0 group-hover:opacity-100 transiton absolute top-3 right-3 text-muted-foreground hover:text-blue-600 ",
                disabled && "cursor-not-allowed opacity-75"
            )} onClick={handleClick}>
                <Star className={cn(
                    "h-4 w-4 ",
                    isFavourite && "fill-blue-600 text-blue-600"
                )}/>
            </button>
        </div>
    )
}