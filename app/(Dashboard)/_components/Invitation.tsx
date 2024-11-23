'use client'

import { useOrganization } from '@clerk/nextjs'
import { OrganizationCustomRoleKey } from '@clerk/types'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'

export const OrgMembersParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true,
  },
}

export const OrgInvitationsParams = {
  invitations: {
    pageSize: 5,
    keepPreviousData: true,
  },
}

// Form to invite a new member to the organization.
export const InviteMember = () => {
  const { isLoaded, organization, invitations } = useOrganization(OrgInvitationsParams)
  const [emailAddress, setEmailAddress] = useState('')
  const [disabled, setDisabled] = useState(false)

  if (!isLoaded || !organization) {
    return <>Loading...</>
  }

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const submittedData = Object.fromEntries(new FormData(e.currentTarget).entries()) as {
      email: string | undefined
      role: OrganizationCustomRoleKey | undefined
    }

    if (!submittedData.email || !submittedData.role) {
      return
    }

    setDisabled(true)
    await organization.inviteMember({
      emailAddress: submittedData.email,
      role: submittedData.role,
    })
    await invitations?.revalidate?.()
    setEmailAddress('')
    setDisabled(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 p-8 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-white">Invite a New Member</h2>
      <p className="text-lg text-white mb-6">Send an invitation to join your organization by entering their email address below.</p>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="example@domain.com"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          className="mt-2 w-full px-4 py-3 border-2 border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-white">Role</label>
        <SelectRole fieldName={'role'} />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 w-full py-3 bg-purple-700 text-white rounded-lg shadow-lg hover:bg-purple-800 transition duration-300 ease-in-out disabled:bg-gray-400"
      >
        {disabled ? 'Inviting...' : 'Send Invite'}
      </button>
    </form>
  )
}

type SelectRoleProps = {
  fieldName?: string
  isDisabled?: boolean
  onChange?: ChangeEventHandler<HTMLSelectElement>
  defaultRole?: string
}

const SelectRole = (props: SelectRoleProps) => {
  const { fieldName, isDisabled = false, onChange, defaultRole } = props
  const { organization } = useOrganization()
  const [fetchedRoles, setRoles] = useState<OrganizationCustomRoleKey[]>([])
  const isPopulated = useRef(false)

  useEffect(() => {
    if (isPopulated.current) return
    organization
      ?.getRoles({
        pageSize: 20,
        initialPage: 1,
      })
      .then((res) => {
        isPopulated.current = true
        setRoles(res.data.map((roles) => roles.key as OrganizationCustomRoleKey))
      })
  }, [organization?.id])

  if (fetchedRoles.length === 0) return null

  return (
    <select
      name={fieldName}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onChange={onChange}
      defaultValue={defaultRole}
      className="mt-2 w-full px-4 py-3 border-2 border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {fetchedRoles?.map((roleKey) => (
        <option key={roleKey} value={roleKey}>
          {roleKey}
        </option>
      ))}
    </select>
  )
}

// List of pending invitations to an organization.
export const InvitationList = () => {
  const { isLoaded, invitations, memberships } = useOrganization({
    ...OrgInvitationsParams,
    ...OrgMembersParams,
  })

  if (!isLoaded) {
    return <>Loading...</>
  }

  return (
    <div className="p-8 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-white mb-6">Pending Invitations</h2>
      <table className="min-w-full table-auto text-white">
        <thead>
          <tr className="bg-purple-700">
            <th className="px-6 py-4 text-left text-sm font-medium">User</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Invited On</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Role</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations?.data?.map((inv) => (
            <tr key={inv.id} className="border-t border-purple-300 hover:bg-purple-50">
              <td className="px-6 py-4 text-sm text-gray-100">{inv.emailAddress}</td>
              <td className="px-6 py-4 text-sm text-gray-200">{inv.createdAt.toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-gray-200">{inv.role}</td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={async () => {
                    await inv.revoke()
                    await Promise.all([memberships?.revalidate, invitations?.revalidate])
                  }}
                  className="text-red-500 hover:text-red-600 transition duration-200 ease-in-out"
                >
                  Revoke
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between">
        <button
          disabled={!invitations?.hasPreviousPage || invitations?.isFetching}
          onClick={() => invitations?.fetchPrevious?.()}
          className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition duration-200"
        >
          Previous
        </button>

        <button
          disabled={!invitations?.hasNextPage || invitations?.isFetching}
          onClick={() => invitations?.fetchNext?.()}
          className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  )
}

// Invite Button that triggers the modal
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export const InviteButtonWithModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="py-3 px-6 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-200">
          Invite Member
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg sm:w-full bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-purple-800">Invite a New Member</DialogTitle>
          <p className="text-sm text-gray-600">Enter the email and role for the new member.</p>
        </DialogHeader>

        <InviteMember />

        <DialogFooter>
          <DialogClose>
            <button className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
