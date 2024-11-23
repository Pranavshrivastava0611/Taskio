"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSidebar = () => {
    const params = useSearchParams();
    console.log(params);
    const favourites = params.get("favourites");
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 h-screen ">
      <Link href={"/"}>
        <div className="flex gap-x-3 items-center">
          <Image src={"/logo.svg"} alt="logo" height={60} width={60} />
          <span className={cn("font-bold text-2xl text-black", font.className)}>
            FocusHub
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button asChild className="font-normal justify-start px-2 w-full" size={'lg'} variant={favourites ? "ghost" : "secondary"} >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />Team Boards
          </Link>
        </Button>
        <Button asChild className="font-normal justify-start px-2 w-full" size={'lg'} variant={favourites ? "secondary" : "ghost"} >
          <Link href={{
            pathname : "/",
            query : {
                favourites : true,
            }
          }}>
            <Star className="h-4 w-4 mr-2" />Fav Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default OrgSidebar;
