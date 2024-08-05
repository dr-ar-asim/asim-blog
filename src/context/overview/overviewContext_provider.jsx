'use client'

import React, { useEffect, useState } from 'react'
import Overview_context from '@/context/overview/overviewContext'
import axios from 'axios'
export default function OverviewContext_provider({ children }) {

  const [overview, setOverview] = useState([])

  useEffect(() => {
    const getWebOverviewDetails = async () => {
      const overviewRes = await axios.get('/api/owerview').then(res => res.data).catch(err => console.log(err))

      if (overviewRes?.success === true) {
        setOverview(overviewRes.webOverview)
      }
    }
    getWebOverviewDetails()
  }, [])

  return (
    <div>
      <Overview_context.Provider value={{ overview, setOverview }}>
        {children}
      </Overview_context.Provider>

    </div>
  )
}
