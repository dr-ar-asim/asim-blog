

import dbConnect from '@/lib/db'
import PostModel from '@/models/PostModel.js'
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary'
import mongoose from 'mongoose';
const { Types } = mongoose;

export const DELETE = async (request, { params }) => {
  try {
    await dbConnect();

    const { postId } = params;
    if (!postId || !Types.ObjectId.isValid(postId)) {
      return NextResponse.json({
        message: "Invalid postId",
        success: false
      }, {
        status: 400
      });
    }
    const objectId = new Types.ObjectId(postId);

    const delpost = await PostModel.findByIdAndDelete(objectId);
    if (!delpost) {
      return NextResponse.json({
        message: "Post not deleted",
        success: false
      }, {
        status: 404
      });
    }

    return NextResponse.json({
      message: "Post deleted successfully",
      success: true
    }, {
      status: 200
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      message: "Failed to delete post",
      success: false
    }, {
      status: 500
    });
  }
};




// Configure Cloudinary (use your own credentials here)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// update post
export const PUT = async (request, { params }) => {
  try {
    await dbConnect();

    const { postId } = params;
    if (!postId || !Types.ObjectId.isValid(postId)) {
      return NextResponse.json({
        message: "Invalid postId",
        success: false
      }, {
        status: 400
      });
    }
    const objectId = new Types.ObjectId(postId);

    const formData = await request.formData();
    const newtitle = formData.get('title');
    const newcontent = formData.get('content');
    const newthumbnail_base64 = formData.get('thumbnail');

    const existingPost = await PostModel.findById(objectId);
    if (!existingPost) {
      return NextResponse.json({
        message: "Post not found",
        success: false
      }, {
        status: 404
      });
    }

    let newThumbnailUrl = existingPost.thumbnail;

    if (newthumbnail_base64) {
      if (existingPost.thumbnail) {
        const publicId = existingPost.thumbnail.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadResponse = await cloudinary.uploader.upload(newthumbnail_base64, { folder: 'posts' });
      newThumbnailUrl = uploadResponse.secure_url;
    }

    const updatedPost = await PostModel.findByIdAndUpdate(objectId, {
      title: newtitle,
      content: newcontent,
      thumbnail: newThumbnailUrl
    });

    if (!updatedPost) {
      return NextResponse.json({
        message: "Failed to update post",
        success: false
      }, { status: 400 });
    }

    return NextResponse.json({
      message: "Post updated successfully",
      success: true
    }, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      message: "Failed to update post",
      success: false
    }, { status: 500 });
  }
};



// get post
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { postId } = params;
    if (!postId || !Types.ObjectId.isValid(postId)) {
      return NextResponse.json({
        message: "Invalid postId",
        success: false
      }, {
        status: 400
      });
    }
    const objectId = new Types.ObjectId(postId);

    const post = await PostModel.findById(objectId);
    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        success: false
      }, {
        status: 404
      });
    }

    return NextResponse.json({
      message: "Post fetched successfully",
      success: true,
      post
    }, {
      status: 200
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      message: "Failed to fetch post",
      success: false
    }, {
      status: 500
    });
  }
}
