'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import AdminContext from '@/context/AdminContext';
import subAdminContext from '@/context/sub_admin/subAdminContext';

export default function Dashboard_sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const pathname = usePathname()

  const admin = useContext(AdminContext);
  const subAdmin = useContext(subAdminContext)


  const router = useRouter()


  return (
    <div>
      <header className="fixed top-12 z-50 w-auto h-auto rounded-full bg-custom-orange dark:bg-gray-800 md:hidden">
        <div className="flex items-center justify-between p-4">
          <button
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-controls="drawer-navigation"
            aria-expanded={isSidebarOpen}
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a1 1 0 011-1h14a1 1 0 010 2H3a1 1 0 01-1-1zM2 10a1 1 0 011-1h14a1 1 0 010 2H3a1 1 0 01-1-1zM2 15a1 1 0 011-1h14a1 1 0 010 2H3a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </header>

      <aside
        className={`fixed top-20 left-0 z-40 w-64 h-screen pt-2 transition-transform transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto flex flex-col justify-around  px-3 h-full bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            {admin.admin && (
              <>
                <li className={pathname === '/dashboard' ? 'bg-custom-orange text-white' : 'bg-white'}>
                  <Link href="/dashboard" className={`flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-hover-orange dark:hover:bg-gray-700 group`} onClick={toggleSidebar}>
                    <span className="ml-3">Overview</span>
                  </Link>
                </li>
                <li className={pathname === '/dashboard/all_posts' ? 'bg-custom-orange text-white' : 'bg-white'}>
                  <Link href="/dashboard/all_posts" className="flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-hover-orange dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
                    <span className="ml-3">All Posts</span>
                  </Link>
                </li>
                <li className={pathname === '/dashboard/create_post' ? 'bg-custom-orange text-white' : 'bg-white'}>
                  <Link href="/dashboard/create_post" className="flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-hover-orange dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
                    <span className="flex-1 ml-3 whitespace-nowrap">Create Posts</span>
                  </Link>
                </li>
                <li className={pathname === '/dashboard/testimonials' ? 'bg-custom-orange text-white' : 'bg-white'}>
                  <Link href="/dashboard/testimonials" className="flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-hover-orange dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
                    <span className="flex-1 ml-3 whitespace-nowrap">Testimonials</span>
                  </Link>
                </li>
                <li className={pathname === '/dashboard/sub_admins' ? 'bg-custom-orange text-white' : 'bg-white'}>
                  <Link href="/dashboard/sub_admins" className="flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-hover-orange dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
                    <span className="flex-1 ml-3 whitespace-nowrap">Sub Admins</span>
                  </Link>
                </li>
                <li className={pathname === '/dashboard/client_messages' ? 'bg-custom-orange text-white' : 'bg-white'}>
                  <Link href="/dashboard/client_messages" className="flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-hover-orange dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
                    <span className="flex-1 ml-3 whitespace-nowrap">Client Messages</span>
                  </Link>
                </li>

              </>
            )}
            {
              subAdmin.subAdmin && (
                <>
                  <li className={pathname === '/dashboard/all_posts' ? 'bg-custom-orange text-white' : 'bg-white'}>
                    <Link href="/dashboard/all_posts" className="flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-hover-orange dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
                      <span className="ml-3">All Posts</span>
                    </Link>
                  </li>
                  <li className={pathname === '/dashboard/create_post' ? 'bg-custom-orange text-white' : 'bg-white'}>
                    <Link href="/dashboard/create_post" className="flex items-center p-2 text-base font-medium rounded-lg dark:text-white hover:bg-hover-orange dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
                      <span className="flex-1 ml-3 whitespace-nowrap">Create Posts</span>
                    </Link>
                  </li>

                </>
              )
            }

          </ul>
          <div className=' pl-5 mb-10'>
            {
              admin.admin && (
                <div>
                  <button onClick={() => {
                    admin.adminLogout()
                    router.replace('/user/me/admin/login-admin')
                  }} className='text-custom-orange font-bold'>Logout Admin</button>
                </div>
              )
            }
            {
              subAdmin.subAdmin && (
                <div>
                  <button onClick={() => {
                    subAdmin.subAdminLogout()
                    router.replace('/user/sub_admin/login_sub_admin')
                  }} className='text-custom-orange font-bold'>Logout SubAdmin</button>
                </div>
              )
            }

          </div>
        </div>
      </aside>


    </div>
  )
}
