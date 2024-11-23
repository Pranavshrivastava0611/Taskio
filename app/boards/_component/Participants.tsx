" use client"

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from './user-avatar'
import { useOthers,useSelf } from '@/liveblocks.config'
import { connectionIdToColor } from '@/lib/utils'

function Participants() {
  const MAX_SHOWN_USERS = 2;
  const users = useOthers() ;
  
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div className='top-2 right-2 rounded-md shadow-md bg-white absolute h-12 p-3 flex items-center '>
     <div className='flex gap-x-2'>
      {users.slice(0,MAX_SHOWN_USERS).map((user)=>{
        return (
          <UserAvatar
          key={user.connectionId} 
          src={user.info?.picture}
          name={user.info?.name}
          fallback={user.info?.name?.[0] || "T"}
          borderColor={connectionIdToColor(user.connectionId)}/>
        )
      })} 

      {currentUser && (
        <UserAvatar src={currentUser.info?.picture} name={`${currentUser.info?.name} (You)`} fallback={currentUser.info?.name?.[0]}/>
      )}

      {hasMoreUsers && (
        <UserAvatar name={`${users.length - MAX_SHOWN_USERS} more`} fallback={`+${users.length - MAX_SHOWN_USERS}`} borderColor={connectionIdToColor(currentUser.connectionId)}/> 
      )}
     </div>
    </div>
  )
}

Participants.Skeleton = function ParticipantSkeleton(){
    return (
        <div className='top-2 right-2 rounded-md shadow-md bg-white absolute h-12 p-3 flex items-center '/>
            
      
    )
}

export default Participants
