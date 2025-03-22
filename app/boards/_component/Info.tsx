"use client";

// import { Actions } from "@/components/ui/actions";
// import { Hints } from "@/components/ui/hint";
import Action from "@/components/ui/Action";
import Hints from "@/components/ui/Hints";
import { Button } from "@/components/ui/Button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/useRenameModal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {v} from "convex/values"
interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};
function toBoardId(id: string): Id<"Board"> {
    // Optionally add validation logic here if needed.
    return id as Id<"Board">;
  }
 const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: toBoardId(boardId),
  });
  


 
  
  if (!data) return <Info.Skeleton/>;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hints label="Go to boards" side="bottom" sideOffset={10} alignoffset={0}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="Board Logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hints>
      <TabSeparator />
      <Hints label="Edit title" side="bottom" sideOffset={10} alignoffset={0}>
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hints>
      <TabSeparator />
      <Action id={data._id} title={data.title} side="bottom" sideoffset={10}>
        <div>
          <Hints label="Main menu" side="bottom" sideOffset={10} alignoffset={0}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hints>
        </div>
      </Action>
    </div>
  );
};

Info.Skeleton =  function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
}

export default Info

