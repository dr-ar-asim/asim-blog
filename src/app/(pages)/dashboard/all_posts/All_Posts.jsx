'use client'

import React, { useEffect, useState } from 'react'
import Posts_table from '@/components/Posts_table'

import { toast } from 'react-toastify'
import axios from 'axios'

export default function All_Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async (postId) => {
    setDeleting(true)
    setError(null)
    try {
      const res = await axios.delete(`/api/posts/${postId}`).then(res => res.data).catch(err => console.log(err.message))
      console.log(res);
      if (res.success === true) {
        toast.success("Deleted", {
          position: 'top-center',
          autoClose: 3000
        })
      }
      // onDelete(postId)
    } catch (err) {
      setError('Failed to delete post')
    } finally {
      setDeleting(false)
    }
  }

  const handleEdit = (postId) => {
    // Logic to edit post in the database
    console.log('Editing post:', postId)
  }

  const getAllPostsFrom_db = async () => {
    setLoading(true)
    try {
      const postsResponse = await axios.get('/api/posts/get-posts').then(res => res.data).catch(err => console.log(err))
      setPosts(postsResponse.posts)
      setLoading(false)
    } catch (error) {
      console.log("failed to get posts ", error.message)
      toast.error("Failed to get Posts", {
        position: "top-center",
        autoClose: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllPostsFrom_db()
  }, [])

  return (
    <div className="p-4 bg-gray-100">
      <Posts_table
        posts={posts}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        deleting={deleting}
        error={error}
        className="bg-white shadow-md rounded-lg"
      />

    </div>
  )
}
