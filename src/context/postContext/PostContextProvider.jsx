
'use client'
import React, { useEffect, useState } from 'react'
import PostContext from './postContext'
import axios from 'axios';


export default function PostContextProvider({ children }) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    const getPostsFromDb = async () => {
      try {
        setLoading(true)
        const getPosts = await axios.get('/api/posts/get-posts').then(res => res.data).catch(err => console.log(err))
        // console.log(getPosts.posts)
        if (getPosts.success !== true) {
          console.log('failled to get posts');
        }
        setPosts(getPosts.posts);
        setLoading(false)
      } catch (error) {
        console.log('failed to get posts');
      } finally {
        setLoading(false)
      }
    }

    getPostsFromDb();

  }, [])
  return (
    <div>
      <PostContext.Provider value={{ posts, setPosts, loading, setLoading }}>
        {children}
      </PostContext.Provider>
    </div>
  )
}
