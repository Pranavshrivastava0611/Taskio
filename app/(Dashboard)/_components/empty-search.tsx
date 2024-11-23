"use client"
import React from 'react'
import Image from 'next/image'

function Empty_search() {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
        <img src="https://img.icons8.com/3d-fluency/94/search.png" alt="search" width={100} height={100}/>
      <h2 className='text-2xl font-semibold mt-6'>
        No Result
      </h2>
      <p className='text-muted-foreground mt-2 text-sm'>
       Try searching for something else
      </p>
    </div>
  )
}

export default Empty_search
