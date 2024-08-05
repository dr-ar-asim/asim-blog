
'use client'
import React, { useContext, useEffect, useState } from 'react'
import Post from '@/components/Post'
import PostContext from '@/context/postContext/postContext'



export default function LatestPosts() {

  const [latestPosts, setLatestPosts] = useState([])
  const { posts } = useContext(PostContext)

  // console.log(posts);
  useEffect(() => {

    const showLatestPosts = () => {
      if (posts.length > 0) {
        const sortedPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt)
        setLatestPosts(sortedPosts.slice(0, 3))
      }
    }
    showLatestPosts()

  }, [posts])

  return (
    <div>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 tracking-widest text-4xl  font-extrabold text-gray-900 dark:text-white">Latest <span className='text-custom-orange'>Posts</span></h2>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3 px-10">
            {
              latestPosts && latestPosts.map(post => (
                <Post key={post._id} post={post} />
              ))
            }
          </div>
        </div>
      </section>

    </div>
  )
}
