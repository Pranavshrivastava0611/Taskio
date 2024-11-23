
"use client "
import { useOrganization, UserButton } from '@clerk/nextjs'
import React from 'react'
import Searchinput from './serach_input'
import { OrganizationSwitcher } from '@clerk/nextjs'
import InviteButton from './invite-button'
import { OrganizationProfile } from '@clerk/nextjs'

function Navbar() {
  const organization = useOrganization();

  return (
    <div  className='  flex p-5 gap-x-3 items-center'>
        <div className='hidden lg:flex lg:flex-1 '>
        <Searchinput/>
        </div>
        <div className='flex-1 block lg:hidden'>
        <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth : "376px"
              
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
        {organization.organization &&
        <>
        <InviteButton/>
        </>
        

}
      <UserButton/>
    </div>
  )
}
export default Navbar
