"use client";

import React, { use } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';




interface InfoProps {
    boardId: Id<"Board"> ,
    
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

function Info({ boardId}: InfoProps) {
    const pathname = usePathname()
    const component = pathname.split("/")
    const hello  = component[2];
    console.log(component);
   // Adjusted type assertion

    // const data = useQuery(api.board.get, { id: hello });

    // if(!data){
    //     return <Info.Skeleton/>
    // }

    // const {_id , title} = data;

    // if(!_id || !title) {
    //     return <Info.Skeleton/>
    // }

    const data = useQuery(api.boards.getBoard,{
        id : hello as Id<"Board">
    })
    if(!data){
        return <Info.Skeleton/>
    }
   
    return (
        <div className='absolute top-2 left-2 rounded-md px-1.5 h-12 flex items-center shadow-md'>
            <Button>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
            </Button>
            hello
        </div>
    );
}

// Define a skeleton loader component
Info.Skeleton = function InfoSkeleton() {
    return (
        <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]'>
            <Skeleton />
        </div>
    );
};

export default Info;
