'use client'

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Overview_context from '@/context/overview/overviewContext'
import { toast } from 'react-toastify';
import axios from 'axios';



const Contact = () => {

  const [web_overview, setWeb_Overview] = useState()
  const [contactData, setContact_Data] = useState({
    name: '',
    email: '',
    message: '',
  })

  const { overview } = useContext(Overview_context)
  useEffect(() => {
    if (overview && overview.length > 0) {
      setWeb_Overview(overview[0]);
      // console.log('Web Overview:', overview[0]); // Log the data for debugging
    }
  }, [overview]);


  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // console.log(contactData)
    try {
      const response = await axios.post('/api/contact', contactData).then(res => res.data).catch(err => console.log(err))
      console.log(response);
      if (response?.success === true) {
        toast.success("Send", {
          position: 'top-center',
          autoClose: 3000
        })
        setContact_Data({
          name: '',
          email: '',
          message: '',
        })
      }
    } catch (error) {
      console.log(error.message);
      toast.error("failed to send message", {
        position: 'top-center',
        autoClose: 3000
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <p className="mb-4">
            <strong>Email:</strong> {web_overview ? web_overview.admin_email : "Loading"}
          </p>
          <p className="mb-4">
            <strong>Phone:</strong> {web_overview ? web_overview.admin_phone : 'Loading'}
          </p>
          <ul>
            <li>
              <a href={web_overview?.facebook_link?.startsWith('http') ? web_overview.facebook_link : `https://${web_overview?.facebook_link}`} target="_blank" rel="noopener noreferrer" className='flex gap-2 hover:text-blue-600 h-10 items-center w-40'>
                <FaFacebook /> Facebook
              </a>
            </li>
            <li>
              <a href={web_overview?.instagram_link?.startsWith('http') ? web_overview.instagram_link : `https://${web_overview?.instagram_link}`} target="_blank" rel="noopener noreferrer" className='flex gap-2 hover:text-red-600 h-10 items-center w-40'>
                <FaInstagram /> Instagram
              </a>
            </li>
            <li>
              <a href={web_overview?.tiktok_link?.startsWith('http') ? web_overview.tiktok_link : `https://${web_overview?.tiktok_link}`} target="_blank" rel="noopener noreferrer" className='flex gap-2 hover:text-purple-900 h-10 items-center w-40'>
                <FaTiktok /> Tiktok
              </a>
            </li>
            <li>
              <a href={web_overview?.youtube_link?.startsWith('http') ? web_overview.youtube_link : `https://${web_overview?.youtube_link}`} target="_blank" rel="noopener noreferrer" className='flex gap-2 hover:text-red-600 h-10 items-center w-40'>
                <FaYoutube /> Youtube
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  placeholder='Your Name'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => {
                    setContact_Data({ ...contactData, name: e.target.value })
                  }}
                  value={contactData.name}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  placeholder='Your Email'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => {
                    setContact_Data({ ...contactData, email: e.target.value })
                  }}
                  value={contactData.email}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  name="message"
                  rows="4"
                  placeholder='What you want to Say...'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => {
                    setContact_Data({ ...contactData, message: e.target.value })
                  }}
                  value={contactData.message}
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-orange hover:bg-transparent hover:text-custom-orange hover:border-custom-orange transition-all ease-out delay-75"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Contact;
