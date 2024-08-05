'use client'

import React, { useEffect, useState } from 'react'
import AdminContext from './AdminContext'
import axios from 'axios'


export default function AdminContextProvider({ children }) {

  const [admin, setAdmin] = useState([])


  useEffect(() => {
    async function handleCrrentAdminResponse() {
      const current_admin_res = await axios.get('/api/user/me/admin/current-admin').then(res => res.data).catch(error => console.log(error))
      // console.log(current_admin_res.admin);
      setAdmin(current_admin_res)
    }
    handleCrrentAdminResponse()
  }, [])



  const adminLogout = async () => {
    try {
      const res = await axios.post('/api/user/me/admin/logout_admin').then(res => res.data).catch(err => console.log(err))
      if (res?.success === true) {
        setAdmin(null)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <AdminContext.Provider value={{ admin, setAdmin, adminLogout }}>
        {children}
      </AdminContext.Provider>

    </div>
  )
}
