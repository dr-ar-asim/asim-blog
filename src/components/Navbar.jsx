'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import AdminContext from '@/context/AdminContext';
import { usePathname } from 'next/navigation';
import subAdminContext from '@/context/sub_admin/subAdminContext'
export default function Navbar() {
  // const pathname = usePathname()
  // console.log(pathname);

  const admin = useContext(AdminContext);
  const subAdmin = useContext(subAdminContext)
  // console.log(subAdmin);

  // console.log(admin);
  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse text-custom-orange font-extrabold">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlogApp</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* {admin.admin && (
              <Link href={'/dashboard'} className="text-white bg-custom-orange hover:bg-transparent border border-transparent  hover:text-custom-orange hover:border-custom-orange font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Dashboard
              </Link>
            )} */}

            {admin?.admin || subAdmin?.subAdmin ? (<>
              <Link href={'/dashboard'} className="text-white bg-custom-orange hover:bg-transparent border border-transparent  hover:text-custom-orange hover:border-custom-orange font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Dashboard
              </Link>
            </>) : (<></>)}
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-custom-orange md:p-0 md:dark:hover:text-custom-orange dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-custom-orange md:p-0 md:dark:hover:text-custom-orange dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Posts
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-custom-orange md:p-0 md:dark:hover:text-custom-orange dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
