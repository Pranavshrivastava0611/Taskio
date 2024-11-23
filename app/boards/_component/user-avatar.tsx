"use client"

import  Hints  from "@/components/ui/Hints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
    src?: string ;
    name?: string ;
    fallback?: string | null;
    borderColor?: string ;
}

export const UserAvatar = ({
    src,
    name,
    fallback,
    borderColor,
}: UserAvatarProps) => {
    return (
        <Hints label={name || "Anonymous"} side="bottom" sideOffset={18} alignoffset={0}>
            <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
                <AvatarImage src={src} alt={name} />
                <AvatarFallback className="text-xs font-semibold">
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Hints>
    );
};