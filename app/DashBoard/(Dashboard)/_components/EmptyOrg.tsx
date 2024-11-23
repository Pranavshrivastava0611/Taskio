import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
function EmptyOrg() {
  return (
    <div className='flex justify-center items-center flex-col h-full '>
     {/* <Image src="" alt='Empty' height={200} width={200}/> */}
        <h2 className='text-2xl font-semibold mt-6'>
            Welcome to FocusHub
        </h2>
        <p className='text-muted-foreground text-sm mt-2'>
            Create an organization to get started
        </p>
        <div className='mt-6'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={'lg'}>
                        Create an organization
                    </Button>
                </DialogTrigger>
                <DialogContent className='p-0 bg-transparent border-none m-w-[480px]'>
                    <CreateOrganization/>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default EmptyOrg
