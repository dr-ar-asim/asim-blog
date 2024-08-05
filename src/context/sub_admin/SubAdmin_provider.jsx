'use client'

import React, { useEffect, useState } from 'react'
import subAdminContext from './subAdminContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function SubAdmin_provider({ children }) {

  const [subAdmin, setSubAdmin] = useState()

  useEffect(() => {
    const getCurrentSubAdmin = async () => {
      const subAdminRes = await axios.get('/api/user/sub_admin/current_sub_admin').then(res => res.data).catch(err => console.log(err))
      // console.log(subAdminRes);
      if (subAdminRes?.success === true) {
        setSubAdmin(subAdminRes.subAdmin)
      }
    }
    getCurrentSubAdmin()
  }, [])


  const subAdminLogout = async () => {
    try {
      const res = await axios.post('/api/user/sub_admin/logout_subadmin').then(res => res.data).catch(err => console.log(err))
      if (res?.success === true) {
        setSubAdmin(null)
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div>
      <subAdminContext.Provider value={{ subAdmin, setSubAdmin, subAdminLogout }}>
        {children}
      </subAdminContext.Provider>
    </div>
  )
}
