'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdClose } from "react-icons/md";
import { toast } from 'react-toastify';

export default function SubAdmin() {
  const [subAdmin_data, setSubAdmin_data] = useState({
    subadmin_email: '',
    subadmin_email_text: ''
  });
  const [sub_admins, setSub_admins] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const res = await axios.post('/api/user/sub_admin', subAdmin_data).then(res => res.data).catch(err => console.log(err))
      // console.log(res)
      if (res?.success === true) {
        setLoading(false)
        setSubAdmin_data({ subadmin_email: '', subadmin_email_text: '' })
        toast.success('Subadmin invited successfully.', {
          position: "top-center",
          autoClose: 3000
        });
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message);
      setError(error?.response?.data?.message)
      toast.error('Failed to invite subadmin. Please try again.', {
        position: "top-center",
        autoClose: 3000
      });
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    const getSub_admins = async () => {
      try {
        const res = await axios.get('/api/user/sub_admin').then(res => res.data).catch(err => console.log(err))
        if (res?.success === true) {
          setSub_admins(res?.sub_admins)
        }
      } catch (error) {
        setError(error?.response?.data?.message)
      }
    }
    getSub_admins()
  }, [])



  const onDelete = async (sub_admin_id) => {
    try {

    } catch (error) {
      setError(error?.response?.data?.message || 'failed to delete subadmin')
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col'>

        {/* Modal toggle */}
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="block text-white bg-custom-orange hover:bg-transparent border border-transparent hover:border-custom-orange hover:text-custom-orange tracking-widest font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-custom-orange dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button">
          Invite SubAdmin
        </button>

        {/* Main modal */}
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <div className='flex flex-col gap-2 text-sm'>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Send Invite To SubAdmin
                  </h3>
                  <p>Please Enter Email of person you want to invite</p>
                </div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal">
                  <MdClose className='text-lg font-bold' />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub Admin Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@gmail.com"
                      onChange={(e) => {
                        setSubAdmin_data({ ...subAdmin_data, subadmin_email: e.target.value })
                      }}
                      value={subAdmin_data.subadmin_email}
                      required />
                  </div>
                  <div>
                    <label htmlFor="email_text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Text</label>
                    <textarea
                      rows="4"
                      cols="30"
                      placeholder="Enter Your Invitation Email text"
                      name="email_text"
                      id="email_text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => {
                        setSubAdmin_data({ ...subAdmin_data, subadmin_email_text: e.target.value })
                      }}
                      value={subAdmin_data.subadmin_email_text}
                      required ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-custom-orange hover:bg-transparent hover:text-custom-orange border border-transparent hover:border-custom-orange font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {loading ? 'Sending...' : 'Send Invite'}
                  </button>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold'>Total SubAdmins {`(${sub_admins.length})`}</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-2 px-4 border-r border-gray-300 w-2/5">Status</th>
                <th className="py-2 px-4 border-r border-gray-300 w-2/5">Email</th>
                <th className="py-2 px-4 w-1/5">Button</th>
              </tr>
            </thead>
            <tbody>
              {sub_admins?.map((row) => (
                <tr key={row._id} className="border-b border-gray-300">
                  <td className="py-2 px-4 border-r border-gray-300">{row.sub_admin_name || ''}</td>
                  <td className="py-2 px-4 border-r border-gray-300">{row?.sub_admin_email}</td>
                  <td className="py-2 px-4"><MdDelete className='text-red-500 cursor-pointer' /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{error && error}</p>
        </div>
      </div>
    </div>
  );
}
