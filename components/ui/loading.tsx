import React from 'react'

function Loading() {
  return (
   <div className='h-screen width-screen flex justify-center items-center flex-col'>
   <img src='/logo.svg' height={120} width={120} className='animate-pulse duration-500 '>
   </img>
   </div>
  
  )
}
export default Loading 
