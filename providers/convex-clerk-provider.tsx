"use client"

import { ClerkProvider ,useAuth} from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { AuthLoading,ConvexReactClient,Authenticated } from "convex/react"
import { Children, use } from "react";
import Loading from "@/components/ui/loading";


const convexURL =process.env.NEXT_PUBLIC_CONVEX_URL!;  // applying a ! will not make it undefined so we can make pass the convexurl to the instace 
const convex = new ConvexReactClient(convexURL)

 const  ConvexclerKProvider = ({children} : {
    children : React.ReactNode
 })=>{
    return (
    <ClerkProvider dynamic>
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <Authenticated>
            {children}
            </Authenticated>
            <AuthLoading>
                <Loading/>
            </AuthLoading>
        
        </ConvexProviderWithClerk>
    </ClerkProvider>
    )
}

export default ConvexclerKProvider


