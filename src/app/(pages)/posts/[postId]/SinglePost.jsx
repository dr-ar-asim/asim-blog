'use client'
// SinglePostPage.jsx
import React, { useEffect, useState } from 'react';
import thumbnail from '../../../../../public/heroImage.jpg'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import axios from 'axios';



const SinglePostPage = () => {

  const [post, setPost] = useState({})

  const path = usePathname()
  const postId = path.split('/')[2]



  useEffect(() => {

    const getSinglePost = async () => {
      try {

        const singlePostRes = await axios.get(`/api/posts/${postId}`).then(res => res.data).catch(err => console.log(err))
        console.log(singlePostRes)

        if (singlePostRes.success === true) {
          setPost(singlePostRes.post)
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getSinglePost()

  }, [postId])


  const relatedPosts = [
    { title: 'Related Post 1', thumbnail: 'https://via.placeholder.com/150' },
    { title: 'Related Post 2', thumbnail: 'https://via.placeholder.com/150' },
    { title: 'Related Post 3', thumbnail: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="container mx-auto  my-20 w-10/12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4">
          <div className="mb-4">
            <Image
              src={post.thumbnail}
              width={520}
              height={300}
              alt="Post Thumbnail"
              className="rounded h-[300px]"
              style={{
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

          <div className="post-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
        <div className='bg-white p-4'>
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="space-y-4">
            {relatedPosts.map((relatedPost, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img src={relatedPost.thumbnail} alt="Related Post Thumbnail" className="w-16 h-16 rounded" />
                <span className="text-lg font-medium">{relatedPost.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
