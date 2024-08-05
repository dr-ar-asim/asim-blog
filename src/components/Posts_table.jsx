import Link from 'next/link'
import React from 'react'
import { MdDelete, MdEdit } from "react-icons/md"
import { FaEye } from "react-icons/fa";

const Posts_table = ({ posts, loading, onDelete, onEdit, deleting, error }) => {
  if (loading) return <div className="text-primary">Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
      <thead>
        <tr className="bg-primary text-white">
          <th style={{ width: '70%' }} className="p-2 border-b border-gray-300 text-custom-orange">Title</th>
          <th style={{ width: '30%' }} className="p-2 border-b border-gray-300 text-custom-orange">Actions</th>
        </tr>
      </thead>
      <tbody>

        {posts.length === 0 && (
          <>
            <tr>
              <td colSpan="2" className="text-center p-2">No posts found.</td>
            </tr>
          </>
        )}
        {posts.map(post => (
          <tr key={post._id}>
            <td style={{ width: '70%' }} className="p-2 border-b border-r border-gray-300">{post.title}</td>
            <td style={{ width: '30%' }} className="p-2 border-b border-gray-300">
              <button
                onClick={() => onEdit(post._id)}
                className="text-primary hover:text-orange-600"
              >
                <Link href={`/dashboard/all_posts/edit_post/${post._id}`}><MdEdit /></Link>
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className={`text-red-500 hover:text-red-600 ml-2 ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={deleting}
              >
                <MdDelete />
              </button>
              <button className='ml-2'>
                <Link href={`/posts/${post._id}`}><FaEye /></Link>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Posts_table
