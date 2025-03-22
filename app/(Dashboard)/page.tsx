"use client"

import { useOrganization } from "@clerk/clerk-react";
import { BoardList } from "./_components/BoardList";
import EmptyOrg from "./_components/EmptyOrg";
import { useState } from "react";
import { useRouter } from "next/navigation";



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
 const [checkRedirect,setRedirect]= useState<boolean>(false);
 const router = useRouter();


 if(!checkRedirect){
  setRedirect(true);
  router.push("/auth");
 }

 
 
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
