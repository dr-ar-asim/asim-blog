import Link from 'next/link'
import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div>



      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">

          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className='flex gap-4'>
              <Link href={''} className='text-gray-700 hover:underline'>Terms and Conditions</Link>
              <Link href={''} className='text-gray-700 hover:underline'>Privacy Policy</Link>
            </ul>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© copyrights 2024 <Link href="https://flowbite.com/" className="hover:underline">Flowbite™</Link>. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <FaFacebook />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <FaTiktok />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <FaInstagram />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
