
'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md"
import { FaEye } from "react-icons/fa";
import { toast } from 'react-toastify'
export default function Client_Messages() {


  const [messages, setMessages] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    // Fetch messages from server

    const getMessages = async () => {
      try {
        setLoading(true)
        const messageRes = await axios.get('/api/contact').then(res => res.data).catch(err => console.log(err))
        if (messageRes.success === true) {
          messageRes?.messages.reverse()
          setMessages(messageRes.messages)
          // console.log(messageRes.messages)
          setLoading(false)
        }
      } catch (error) {
        setError('Failed to get messages')
      } finally {
        setLoading(false)
        setError('')
      }
    }
    getMessages()

  }, [])


  const onMessageDel = async (messageId) => {

    try {

      const deleteRes = await axios.delete(`/api/contact/${messageId}`).then(res => res.data).catch(err => console.log(err))
      if (deleteRes?.success === true) {
        toast.success("Message deleted successfully", {
          position: 'top-center',
          autoClose: 3000
        })
        setMessages(messages.filter(msg => msg._id !== messageId))
      }
    } catch (error) {
      toast.error("Failed", {
        position: 'top-center',
        autoClose: 3000
      })
    }

  }



  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='h-16 flex flex-col items-center justify-center'>
          <h1 className='tracking-widest text-2xl font-sans font-semibold'>Messages {`(${messages ? messages.length : '0'})`}</h1>
        </div>
        <hr />

        {loading ? (<>
          <div>Loading</div>
        </>
        ) : (
          <>
            <div className='flex flex-col gap-3'>
              {/* single message */}


              {messages?.map(message => (
                <div key={message._id} message={message}>
                  <div className='flex flex-col gap-1 w-7/12 bg-blue-300 p-5  rounded-xl'>
                    <div className='flex items-center justify-between'>
                      <p className='text-xl font-semibold'>{message.name}</p>
                      <p className='text-sm'>{new Date(message.sendTime).toLocaleString()}</p>
                    </div>
                    <div className='flex justify-between' >
                      <p className='tracking-wider'>{message.email}</p>
                      <div className='flex gap-2'>
                        <button><Link href={`/dashboard/client_messages/${message._id}`}><FaEye /></Link></button>
                        <button><MdDelete onClick={() => onMessageDel(message._id)} className='text-red-500' /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {error && <div>{error}</div>}


            </div>

          </>
        )}





      </div>
    </>



  )
}
