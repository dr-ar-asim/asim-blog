'use client'

import React, { useContext, useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Overview_context from '@/context/overview/overviewContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import PostContext from '@/context/postContext/postContext'
import SocialOptions from '@/components/Social_options'

export default function Dashboard() {

  const [web_overview, setWeb_Overview] = useState()
  const [website_name, setWebsite_name] = useState('')
  const [admin_email, setAdmin_email] = useState('')
  const [admin_phone, setAdmin_phone] = useState('')
  const [fb_link, setFb_link] = useState('')
  const [insta_link, setInsta_link] = useState('')
  const [tiktok_link, setTiktok_link] = useState('')
  const [yt_link, setyt_link] = useState('')
  const [total_posts, setTotal_posts] = useState()
  const [selectedValues, setSelectedValues] = useState([]);

  const { posts } = useContext(PostContext)
  useEffect(() => {
    setTotal_posts(posts.length)
  }, [posts])

  const { overview } = useContext(Overview_context)
  useEffect(() => {
    if (overview && overview.length > 0) {
      setWeb_Overview(overview[0]);
      setFb_link(overview[0].facebook_link);
      setInsta_link(overview[0].instagram_link);
      setTiktok_link(overview[0].tiktok_link);
      setyt_link(overview[0].youtube_link);
    }
  }, [overview]);

  const handleUpdate = async (url, data, setter, key) => {
    try {
      const response = await axios.put(url, data).then(res => res.data).catch(err => console.log(err));
      if (response.success === true) {
        setter('');
        setWeb_Overview(prev => ({ ...prev, [key]: data[key] }));
        toast.success("Updated", { position: 'top-center', autoClose: 3000 });
      } else {
        toast.error("Failed", { position: 'top-center', autoClose: 3000 });
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Failed', { position: 'top-center', autoClose: 3000 });
    }
  }

  const socialLinks = {
    facebook: {
      icon: <FaFacebook className='h-20 w-14 text-blue-600' />,
      currentLink: fb_link,
      value: fb_link,
      setValue: setFb_link,
      handleUpdate: (e) => handleUpdate('/api/owerview/fb_link', { facebook_link: fb_link }, setFb_link, 'facebook_link'),
    },
    instagram: {
      icon: <FaInstagram className='h-20 w-14 text-rose-600' />,
      currentLink: insta_link,
      value: insta_link,
      setValue: setInsta_link,
      handleUpdate: (e) => handleUpdate('/api/owerview/insta_link', { instagram_link: insta_link }, setInsta_link, 'instagram_link'),
    },
    tiktok: {
      icon: <FaTiktok className='h-20 w-14 text-teal-500' />,
      currentLink: tiktok_link,
      value: tiktok_link,
      setValue: setTiktok_link,
      handleUpdate: (e) => handleUpdate('/api/owerview/tiktok_link', { tiktok_link }, setTiktok_link, 'tiktok_link'),
    },
    youtube: {
      icon: <FaYoutube className='h-20 w-14 text-red-600' />,
      currentLink: yt_link,
      value: yt_link,
      setValue: setyt_link,
      handleUpdate: (e) => handleUpdate('/api/owerview/yt_link', { youtube_link: yt_link }, setyt_link, 'youtube_link'),
    },
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <section className="bg-white dark:bg-gray-900">
        <div className="flex flex-col lg:flex-row gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-custom-orange dark:text-custom-orange">Welcome Admin!</h2>
            <p className="mb-4">You can manage your website content and settings from here.</p>
          </div>
        </div>
        <div className="px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">{web_overview ? web_overview.website_name : 'Loading...'}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">Website Name</dd>
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">{total_posts}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">Total Posts</dd>
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">{web_overview ? web_overview.admin_email : 'Loading...'}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">Admin Email</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className='grid grid-cols-1 gap-10 sm:grid-cols-2 pb-5'>
        <div >
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate('/api/owerview/web_name', { website_name }, setWebsite_name, 'website_name'); }} className='flex flex-col gap-2'>
            <input type='text' value={website_name} onChange={(e) => setWebsite_name(e.target.value)} placeholder='Update Website Name' className='border p-2 rounded' />
            <button type='submit' className='p-2 bg-custom-orange text-white rounded'>Update</button>
          </form>
        </div>

        <div>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate('/api/owerview/admin_email', { admin_email }, setAdmin_email, 'admin_email'); }} className='flex flex-col gap-2'>
            <input type='email' value={admin_email} onChange={(e) => setAdmin_email(e.target.value)} placeholder='Update Admin Email' className='border p-2 rounded' />
            <button type='submit' className='p-2 bg-custom-orange text-white rounded'>Update</button>
          </form>
        </div>

        <div>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate('/api/owerview/admin_phone', { admin_phone }, setAdmin_phone, 'admin_phone'); }} className='flex flex-col gap-2'>
            <input type='text' value={admin_phone} onChange={(e) => setAdmin_phone(e.target.value)} placeholder='Update Admin Phone' className='border p-2 rounded' />
            <button type='submit' className='p-2 bg-custom-orange text-white rounded'>Update</button>
          </form>
        </div>
      </section>
      <div>
        <SocialOptions selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
      </div>
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10'>
        {selectedValues.map((option) => (
          <div key={option}  >
            <div className="flex gap-5 flex-col  justify-center items-center shadow-xl p-5 rounded-2xl h-72 bg-orange-50">
              <div> {socialLinks[option].icon}</div>
              <div className='flex flex-col gap-1 w-full overflow-hidden'>
                <p className='flex'>Current: {socialLinks[option].currentLink} </p>
                <form onSubmit={socialLinks[option].handleUpdate} className='flex flex-col gap-5 w-full'>
                  <input
                    type='text'
                    value={socialLinks[option].value}
                    onChange={(e) => socialLinks[option].setValue(e.target.value)}
                    placeholder={`Update ${option.charAt(0).toUpperCase() + option.slice(1)} Link`}
                    className='border p-2 rounded'
                  />
                  <button type='submit' className='p-2 bg-custom-orange text-white rounded'>Update</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
