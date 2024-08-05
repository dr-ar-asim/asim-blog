'use client'

import axios from 'axios'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Message() {
  const [message, setmessage] = useState()
  const [loading, setLoading] = useState(false)

  const pathname = usePathname()
  const messageId = pathname.split('/')[3]



  useEffect(() => {

    const getSingleMessage = async () => {
      try {
        setLoading(true)
        const messageRes = await axios.get(`/api/contact/${messageId}`).then(res => res.data).catch(err => console.log(err))
        // console.log(messageRes)
        if (messageRes.success === true) {
          setmessage(messageRes.singlemessage)
        }
      } catch (error) {
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    getSingleMessage()
  }, [messageId])

  // console.log(message);
  return (
    <>

      {loading ? "Loading" : (
        <div className='flex flex-col gap-4'>
          <div>
            <p className='font-semibold tracking-widest'>Sender's Name :{message?.name}</p>
          </div>
          <hr />
          <div>
            <p><span className='font-semibold'>Sender's Email</span>: {message?.email}</p>
          </div>
          <hr />
          <div>
            <p className='text-sm'><span className='font-semibold'>Sent At</span> : <span>{message && new Date(message?.sendTime).toLocaleString()}</span></p>
          </div>
          <hr />
          <div className='pe-20 flex flex-col gap-2'>
            <span className='font-semibold'>Message</span>
            <hr />
            <p className='leading-8'>
              {message?.message}
            </p>
          </div>
        </div>

      )}


    </>
  )
}
