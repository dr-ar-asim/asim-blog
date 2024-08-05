
'use client'
import Image from 'next/image'
import React from 'react'
import thumbnail from '../../public/heroImage.jpg'
import Link from 'next/link'
export default function Post({ post }) {
  return (
    <Link href={`/posts/${post._id}`} legacyBehavior>
      <a className="">
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-full" src={post.thumbnail} alt={post.title} />
          <div className="px-6 py-4">

            <div className="font-bold text-xl mb-2 capitalize line-clamp-2 hover:text-custom-orange transition-all ease-in-out delay-75">{post.title}</div>
            <div className="text-gray-700 text-base">
              <p dangerouslySetInnerHTML={{ __html: post.content }} className='line-clamp-2'></p>
            </div>
          </div>
          <div className="px-6 py-4 flex items-center">
            <span className="text-gray-600 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </a>
    </Link >
  )
}
