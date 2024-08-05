

// update youtube link

import { NextResponse } from "next/server";
import dbConnect from '@/lib/db'
import WebOverViewModel from '@/models/web_overview'

export const PUT = async (request) => {
  try {

    // get data
    await dbConnect()

    const { instagram_link } = await request.json()

    // connect to database
    const overview_id = process.env.overview_id
    const updated_instagram_link = await WebOverViewModel.findByIdAndUpdate(overview_id, {
      instagram_link
    })

    if (!updated_instagram_link) {
      return NextResponse.json({
        success: false,
        message: 'overview not found'
      }, {
        status: 404
      })
    }
    return NextResponse.json({
      success: true,
      message: 'website name updated successfully',
      updated_instagram_link
    }, {
      status: 200
    })
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: 'failed to update website name'
    }, {
      status: 500
    })
  }
}