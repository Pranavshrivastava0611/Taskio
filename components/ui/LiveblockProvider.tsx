// "use client"

// import React from 'react'

// function LiveblockProvider({children} : {
//     children : React.ReactNode
// }) {
//     const key = process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLISHABLE_KEY!;
//     if(!key){
//         throw new Error("NEXT_PUBLIC_LIVEBLOCK_PUBLISHABLE_KEY does not exist ")
//     }
//   return (
//     <LiveblocksProvider authEndpoint={'/api/liveblocks-auth'} throttle={16}>
//         {children}
//     </LiveblocksProvider>
//   )
// }

// export default LiveblockProvider
