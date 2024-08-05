// 'use client';

// import { useState } from 'react';
// import axios from 'axios';

// const UploadPage = () => {
//   const [image, setImage] = useState(null);
//   const [imageURL, setImageURL] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!image) {
//       alert('Please select an image to upload.');
//       return;
//     }

//     setLoading(true); // Set loading state to true

//     const formData = new FormData();
//     formData.append('file', image);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200 && response.data.url) {
//         setImageURL(response.data.url);
//         setError('');
//       } else {
//         setError(response.data.error || 'Upload failed');
//       }
//     } catch (err) {
//       setError('An error occurred while uploading the image.');
//       console.error('Upload error:', err);
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold mb-4">Upload an Image</h1>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         className="mb-4"
//       />
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         onClick={handleUpload}
//         disabled={loading} // Disable button while loading
//       >
//         {loading ? 'Uploading...' : 'Upload Image'}
//       </button>
//       {error && <p className="mt-4 text-red-500">{error}</p>}
//       {imageURL && (
//         <div className="mt-4">
//           <h2 className="text-lg font-semibold">Uploaded Image:</h2>
//           <img
//             src={imageURL}
//             alt="Uploaded"
//             className="mt-2 max-w-full h-auto"
//           />
//           <p className="mt-2 text-blue-600">{imageURL}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadPage;

'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function page() {
  const [image, setImage] = useState()
  const { register, handleSubmit } = useForm()


  const handleFileChange = () => {

  }
  const onSubmitForm = async (e, data) => {
    e.preventDefault()
    console.log(data.thumbnail_image[0]);

    try {

      const formData = new FormData()

      formData.append('file', image)

    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  }

  return (
    <div className='h-screen flex flex-col gap-6 items-center justify-center'>
      <div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <input
            {...register('thumbnail_image')}
            type="file"
            accept='image/*'
            onChange={handleImageChange}
          />
          <button type='submit' className='bg-blue-500 p-5'>Upload Image</button>
        </form>
      </div>
      <hr />
      <hr />
      <hr />
      <div className='flex flex-col gap-5 '>
        <h1>Uploaded Image</h1>
        <img src="" alt="uploaded Image" width={300} height={300} />
      </div>

    </div>
  )
}

