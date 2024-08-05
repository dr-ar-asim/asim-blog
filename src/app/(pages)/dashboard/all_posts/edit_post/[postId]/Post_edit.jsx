'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Post_edit = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const postId = pathname.split('/').pop();

  const router = useRouter()

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/posts/${postId}`);
        if (data.success) {
          setTitle(data.post.title);
          setContent(data.post.content);
          setThumbnail(data.post.thumbnail); // Assuming `thumbnail` is a URL or Base64 string
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getSinglePost();
  }, [postId]);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (thumbnail) {
        formData.append('thumbnail', thumbnail); // Note: this will be a Base64 string or a URL
      }

      const response = await axios.put(`/api/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success("Post updated successfully", {
          position: "top-center",
          autoClose: 3000
        });
        router.replace('/dashboard/all_posts')
      } else {
        toast.error("Failed to update post", {
          position: "top-center",
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update post", {
        position: "top-center",
        autoClose: 3000
      });
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto p-4 bg-gray-100 flex flex-col gap-6 border border-gray-300 rounded-lg shadow-lg'>
      {/* heading */}
      <div className='w-full text-center'>
        <h1 className='text-2xl font-bold'>Edit Post</h1>
      </div>

      {/* image / thumbnail */}
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-bold'>Thumbnail</h2>
        <div className='flex items-center gap-4'>
          <input
            type="file"
            accept="image/*"
            id='thumbnail_image_upload'
            className='hidden'
            onChange={handleImageChange}
          />
          <div className='relative w-32 h-32'>
            {thumbnail ? (
              <img src={thumbnail} alt='post-thumbnail-upload image' className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-500'>No Image</div>
            )}
          </div>
          <label htmlFor="thumbnail_image_upload" className='cursor-pointer bg-blue-500 text-white p-2 rounded-lg text-sm hover:bg-blue-600 transition-colors'>Upload</label>
        </div>
      </div>

      <hr />

      {/* title */}
      <div className='w-full flex flex-col gap-3'>
        <h2 className='text-xl font-bold'>Title</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md'
        />
      </div>

      <hr />

      {/* content */}
      <div className='flex flex-col gap-3'>
        <h2 className='text-xl font-bold'>Content</h2>
        <ReactQuill
          value={content}
          onChange={handleChange}
          theme="snow"
          className="mb-4 h-64"
          placeholder="Write your post here..."
        />
      </div>

      <hr />

      <div className='flex justify-end'>
        <button
          className="bg-blue-500 border border-transparent hover:border-blue-500 text-white hover:text-blue-500 hover:bg-transparent transition-all ease-in-out delay-150 py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Post_edit;
