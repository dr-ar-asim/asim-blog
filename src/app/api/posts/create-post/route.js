import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'
import dbConnect from "@/lib/db";
import { resolve } from "path";
import PostModel from "@/models/PostModel";



export const POST = async (request) => {
  try {
    await dbConnect()


    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })


    const formData = await request.formData()
    // console.log(formData)
    const title = formData.get('title')
    const content = formData.get('content')
    const thumbnail_base64 = formData.get('thumbnail')

    // console.log(content)



    //  first of all convert base64 to stream / buffers to upload on cloudinary
    if (!thumbnail_base64) {
      return NextResponse.json({
        success: false,
        message: "thumbnail is required"
      })
    }

    const base64Data = thumbnail_base64.replace(/^data:image\/png;base64,/, "");
    // it convert it into bytes
    const buffer = Buffer.from(base64Data, 'base64');

    console.log(buffer);

    // upload to cloudinary

    async function uploadImageToCloudinary(buffer) {
      try {
        // Create a promise for the Cloudinary upload
        const secureUrl = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({
            folder: 'posts',
            resource_type: 'auto',
            quality: 'auto'
          }, (error, result) => {
            if (error) {
              reject(error.message);
            } else {
              resolve(result.secure_url);
            }
          }).end(buffer);
        });

        console.log('Secure URL:', secureUrl);
        return secureUrl;
      } catch (error) {
        console.error('Upload error:', error.message);
        return NextResponse.json({
          success: false,
          message: 'failed to upload image on cloudinary'
        })
      }
    }

    // Usage example

    const secureUrl = await uploadImageToCloudinary(buffer);

    console.log('Stored URL:', secureUrl);

    // create post

    if (!title || !content) {
      return NextResponse.json({
        success: false,
        message: "title and content are required"
      })
    }

    const newPost = new PostModel({
      title,
      content,
      thumbnail: secureUrl
    })


    if (!newPost) {
      return NextResponse.json({
        success: false,
        message: "failed to create new post"
      })
    }
    await newPost.save()

    return NextResponse.json({
      success: true,
      message: "Post created successfully"
    })

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "failed yo creeate Post"
    }, {
      status: 500
    })
  }
}