"use client"

import Index from "./_components/Sidebar";
import OrgSidebar from "./_components/OrgSidebar";
import Navbar from "./_components/Navbar";
import { LiveblocksProvider } from "@liveblocks/react";

interface layoutProps{
    children : React.ReactNode;
}


// we make index.tsx file baecaus the sidebar may contain the other component also

const Dashboard = ({children} : layoutProps)=>{
    return (
        <main className="h-full">
            <Index/>
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                <OrgSidebar/>
                <div className="flex-1 h-full">
                <Navbar/>
                {children}
                </div>
                </div>
            </div>
        </main>
      
    )
}


export default Dashboard