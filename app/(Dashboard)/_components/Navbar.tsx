"use client";

import { useOrganization, UserButton } from "@clerk/nextjs";
import React from "react";
import Searchinput from "./serach_input";
import { OrganizationSwitcher } from "@clerk/nextjs";
import InviteButton from "./invite-button";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";



function Navbar() {
  const organization = useOrganization();
  const { signOut } = useClerk();
  const router = useRouter();



  const handleSignOut = async () => {
    await signOut(); // Sign out the user
    router.push("/auth"); // Redirect to the auth page
  };

  return (
    <div className="flex p-5 gap-x-3 items-center">
      {/* Search Input for Large Screens */}
      <div className="hidden lg:flex lg:flex-1">
        <Searchinput />
      </div>

      {/* Organization Switcher for Small Screens */}
      <div className="flex-1 block lg:hidden">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
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
      </div>

      {/* Invite Button */}
      {organization.organization && (
        <>
          <InviteButton />
        </>
      )}

      {/* Custom SignOut Button */}
      <div>
        <UserButton appearance={{ elements: { userButtonPopover: { width: "300px" } } }} afterSwitchSessionUrl="/auth"/>
      </div>
    </div>
  );
}

export default Navbar;
