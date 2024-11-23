"use client"

import { Button } from '@/components/ui/Button'
import { api } from '@/convex/_generated/api'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { useOrganization } from '@clerk/nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'



function Empty_all() {
  const {mutate,pending} = useApiMutation(api.board.create);
  const {organization } = useOrganization();
  const router = useRouter();
  const onclick=()=>{
    mutate({
      orgId : organization?.id!,
      title : "Untitled",
    }).then((id)=>{
      toast.success("Board created")
      // router.push(`/board/${id}`)

    }).catch((error)=> toast.error("Failed to create board"))
  }

  return (
    <div className='flex flex-col justify-center items-center h-full'>
    <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/home.png" alt="home"/>
  <h2 className='text-2xl font-semibold mt-6'>
    No board found
  </h2>
  <p className='text-muted-foreground mt-2 text-sm'>
   Try Creating some for your organization
  </p>
  <Button className='mt-3 w-[100px]' onClick={onclick} disabled={pending}>Create</Button>
</div>
  )
}

export default Empty_all
