
'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    try {
      const getAdminsRes = await axios.get('/api/user/me/admin/get-admin').then(res => res.data).catch(error => console.log(error))

      if (getAdminsRes.admins.length < 1) {
        console.log("admins array length is less than 1");
        if (!email || !password) {
          toast.warning("Please fill all fields", {
            position: "top-center",
            autoClose: 5000,
          })
        }
        const newAdminRes = await axios.post('/api/user/me/admin/create-admin', { email, password }).then(res => res.data).catch(error => console.log(error))

        console.log(newAdminRes);
        toast.success(newAdminRes.message, {
          position: "top-center",
          autoClose: 3000
        })
        if (newAdminRes.success === true) {
          router.replace('/')
        }

      } else {
        console.log('not less than 1');
        toast.error("Admin is Already Created Please Login ", {
          position: "top-center",
          autoClose: 5000,
        })
        return
      }
    } catch (error) {
      console.log("error in getting admin data", error.message);
    }



  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Admin</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Admin
          </button>
        </form>
        <div className='h-20 flex flex-col gap-4 items-center justify-center'>
          <p className='text-center'>OR</p>
          <Link href={'/user/me/admin/login-admin '} className='text-blue-500' >Login as Admin</Link>
        </div>
      </div>
    </div>
  );
}
