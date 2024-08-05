
'use client'
import React, { useState } from 'react'
import Social_options from '@/components/Social_options'
export default function Socials() {

  const [selectedValues, setSelectedValues] = useState([]);
  return (
    <div>


      <div className='flex flex-col gap-4 items-center h-10'>
        <h1 className='text-2xl font-semibold'>Socials</h1>
      </div>
      <hr />
      <div className='p-5 flex flex-col gap-2'>
        <h3 className='font-semibold'>Select Links You want to Add</h3>
        <div>
          <Social_options selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
        </div>
      </div>



    </div>
  )
}
