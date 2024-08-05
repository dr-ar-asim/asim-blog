



// update youtube link

import { NextResponse } from "next/server";
import dbConnect from '@/lib/db'
import WebOverViewModel from '@/models/web_overview'

export const PUT = async (request) => {
  try {

    // get data
    await dbConnect()
    const { heroSection_description } = await request.json()

    // connect to database
    await dbConnect()
    const overview_id = process.env.overview_id
    const updated_heroSection_description = await WebOverViewModel.findByIdAndUpdate(overview_id, {
      heroSection_description,
    })

    if (!updated_heroSection_description) {
      return NextResponse.json({
        success: false,
        message: 'overview not found'
      }, {
        status: 404
      })
    }
    return NextResponse.json({
      success: true,
      message: 'website hero section description updated successfully',
      updated_heroSection_description
    }, {
      status: 200
    })
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: 'failed to update hero section description'
    }, {
      status: 500
    })
  }
}