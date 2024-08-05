'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Login_sub_admin() {
  const [sub_admin_email, setEmail] = useState('')
  const [sub_admin_password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const router = useRouter()
  const onSubmitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const suAdminRes = await axios.post('/api/user/sub_admin/login_sub_admin', { sub_admin_email, sub_admin_password }).then(res => res.data).catch(err => console.log(err))
      if (suAdminRes.success === true) {
        toast.success("Success", {
          position: 'top-center',
          autoClose: 3000
        })
        router.replace('/')
      }
    } catch (err) {
      console.log(err.message);
      setError('Login failed. Please check your credentials and try again.' || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center px-4'>
      <form
        onSubmit={onSubmitForm}
        className='flex flex-col shadow-2xl bg-slate-50 rounded-xl shadow-custom-orange gap-4 border w-full max-w-md mx-auto items-center justify-center p-5'
      >
        <div>
          <h1 className='text-2xl font-bold'>Login Sub Admin</h1>
        </div>
        <div className='w-full flex flex-col gap-1'>
          <label htmlFor="email" className='font-bold'>Email</label>
          <input
            type="email"
            placeholder='Email'
            className='w-full p-2 border rounded-lg'
            name='email'
            id='email'
            value={sub_admin_email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='w-full flex flex-col gap-1'>
          <label htmlFor="password" className='font-bold capitalize'>Password</label>
          <input
            type="password"
            placeholder='Password'
            className='w-full p-2 border rounded-lg'
            name='password'
            id='password'
            value={sub_admin_password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className='text-red-500'>{error}</div>}
        <div className='w-full'>
          <button type='submit' className='bg-custom-orange text-white w-full p-2 rounded-lg border border-transparent hover:bg-transparent hover:text-custom-orange hover:border-custom-orange transition-all ease-out delay-75' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}
