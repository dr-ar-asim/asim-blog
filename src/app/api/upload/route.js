// import { NextResponse } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';
// import { Readable } from 'stream';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file');

//     if (!file || typeof file !== 'object') {
//       return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const stream = Readable.from(buffer);

//     const uploadResponse = await new Promise((resolve, reject) => {
//       const cloudinaryStream = cloudinary.uploader.upload_stream(
//         {
//           folder: 'asim_uploads', // Optional: specify folder
//           use_filename: true,
//           unique_filename: false,
//           resource_type: 'image',
//         },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );

//       stream.pipe(cloudinaryStream);
//     });

//     return NextResponse.json({ url: uploadResponse.secure_url });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
//   }
// }




import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'
import { resolve } from 'path'
import { Readable } from 'stream'


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})



export const POST = async (request) => {
  try {

    const formData = await request.formData();
    const ImageFile = formData.get('file')

    // check type of imagefile or check that image extracted from formdata
    if (!ImageFile || typeof ImageFile !== 'object') {
      return NextResponse.json({
        success: false,
        message: "Invalid file type"
      })
    }

    // here we have proper imagefile

    const buffer = Buffer.from(await ImageFile.arrayBuffer())
    const stream = Readable.from(buffer)

    const uploadResponse = new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          folder: 'asim_uploads',
          use_filename: true,
          unique_filename: false,
          resource_type: 'image'
        }
        , (resolve, reject) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      )
      stream.pipe(cloudinaryStream)
    })
    console.log(uploadResponse);

    return NextResponse.json({
      success: true,
      message: "Image Uploaded",
      uploadResponse
    }, {
      status: 200
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "failed to upload image in cloudinary"
    }, {
      status: 500
    })
  }
}