'use client'

import { useEffect, useState, useContext } from 'react';
import PostCard from '@/components/PostCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostContext from '@/context/postContext/postContext'
import LoadingSpinner from '@/components/LoadingSpinner'
const Posts = () => {




  // here we have posts and setPosts that why i destructure it
  const { posts, loading } = useContext(PostContext)

  console.log(posts);



  return (
    <div className="container mx-auto px-10 my-20">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        {
          loading ? <div className=''>
            <LoadingSpinner />
          </div> :
            posts ? posts.map((post, index) => (
              <PostCard
                key={index}
                post={post}
              />
            )) : '<h1>No Posts to Show</h1>'
        }
      </div>
    </div>
  );
};

export default Posts;
