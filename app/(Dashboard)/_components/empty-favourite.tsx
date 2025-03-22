"use client"

import React from 'react'
import Image from 'next/image'


function Empty_F() {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
       <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/idea.png" alt="idea"/>
      <h2 className='text-2xl font-semibold mt-6'>
        No Favourites
      </h2>
      <p className='text-muted-foreground mt-2 text-sm'>
       Try searching for something else
      </p>
    </div>
  )
}

export default Empty_F
