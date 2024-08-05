// get posts from db

import PostModel from '@/models/PostModel'
import dbConnect from '@/lib/db'
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect()

    const posts = await PostModel.find()
    if (!posts) {
      return NextResponse.json({
        success: false,
        message: "No posts found"
      })
    }

    return NextResponse.json({
      success: true,
      posts
    }, {
      status: 200
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "failed to create post"
    }, {
      status: 500
    })
  }
}