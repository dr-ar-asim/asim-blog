
import React from 'react'
import Dashboard_sidebar from '@/components/Dashboard_sidebar'
export default function layout({ children }) {
  return (
    <div>


      <div className="antialiased bg-gray-50 dark:bg-gray-900">


        {/* <!-- Sidebar --> */}

        <Dashboard_sidebar />


        {/* main components */}
        <main className="p-4 md:ml-64 h-auto bg-white pt-20">
          {children}
        </main>
      </div>





    </div>
  )
}
