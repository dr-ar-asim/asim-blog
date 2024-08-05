'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

// Spinner Component
const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    setLoading(true); // Set loading state to true

    try {
      if (!email || !password) {
        setLoading(false); // Reset loading state
        toast.warning("Please fill all the fields", {
          position: 'top-center',
          autoClose: 3000
        });
        return;
      }

      // Check if the provided email is found in db and isadmin === true
      const isAdminExist = await axios.get('/api/user/me/admin/get-admin', { params: { email } })
        .then(res => res.data)
        .catch(error => {
          throw new Error('Error checking admin existence');
        });

      if (!isAdminExist) {
        setLoading(false); // Reset loading state
        toast.error("Admin not found with this email", {
          position: 'top-center',
          autoClose: 3000
        });
        return;
      }

      // Admin is present
      const adminLoginRes = await axios.post('/api/user/me/admin/login-admin', { email, password })
        .then(res => res.data)
        .catch(error => {
          throw new Error('Error during admin login');
        });

      if (adminLoginRes.success === true) {
        toast.success(adminLoginRes.message, {
          position: 'top-center',
          autoClose: 3000
        });
        router.replace('/'); // Redirect to home page or any other page
      } else {
        throw new Error(adminLoginRes.message || 'Login failed');
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data.message || 'An error occurred');
        } else if (err.request) {
          setError('No response received from the server');
        } else {
          setError(err.message);
        }
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
      toast.error(error, {
        position: 'top-center',
        autoClose: 3000
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login as Admin</h2>
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
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
