
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { InviteMember } from "./Invitation";



const InviteButton = () => {
  return (
    
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">
        <Plus/>
        Invite Member
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription>
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2 max-w-[580px]">
        <InviteMember/>
      </div>
    </DialogContent>
  </Dialog>
//    
  );
};

export default InviteButton;
