'use client'

import Image from 'next/image'
import React from 'react'

export default function Overview() {
  return (
    <div classNameName='flex flex-col gap-5'>

      <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">73M+</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">developers</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">1B+</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">contributors</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">organizations</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
      <hr />
      {/* some website details */}
      <div className='bg-black'>
        {/*
        Todo

        websitename
        website logo
        herosection heading
        herosection description
        herosection image
        contact details
        socials
        
        */}

        


      </div>

    </div>
  )
}
