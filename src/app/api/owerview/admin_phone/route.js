





// update youtube link

import { NextResponse } from "next/server";
import dbConnect from '@/lib/db'
import WebOverViewModel from '@/models/web_overview'

export const PUT = async (request) => {
  try {

    // get data

    const { admin_phone } = await request.json()

    // connect to database
    await dbConnect()
    const overview_id = process.env.overview_id
    const updated_admin_phone = await WebOverViewModel.findByIdAndUpdate(overview_id, {
      admin_phone
    })

    if (!updated_admin_phone) {
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
      updated_admin_phone
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