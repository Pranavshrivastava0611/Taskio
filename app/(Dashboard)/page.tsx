"use client"

import { useOrganization } from "@clerk/clerk-react";
import { BoardList } from "./_components/BoardList";
import EmptyOrg from "./_components/EmptyOrg";


interface DashboardProps {
  searchParams : {
    search : string,
    favourites : string,
  }
}
export default function Home({
  searchParams
} : DashboardProps) {
 const {organization} = useOrganization();
 
  return (
    <>
   <div className="h-[calc(100%-80px)] flex-1 p-6"> 
    {!organization ?  <EmptyOrg/> : (
      <BoardList searchParams={searchParams}/>
    )}
   </div>
    </>
  );
}
