import { NextResponse } from "next/server";

import dbConnect from '@/lib/db'
import WebOverViewModel from '@/models/web_overview'



export const GET = async (request) => {

  try {

    await dbConnect()


    const webOverview = await WebOverViewModel.find()

    // console.log(webOverview);
    return NextResponse.json({
      success: true,
      webOverview
    })

  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "failed to get owerview details"
    }, {
      status: 500,
    })
  }

}


// create web owerview

export async function POST(request) {
  try {


    // const website_name = "blog App"
    // const website_logo = ""
    // const heroSection_heading = 'unlock Your potential'
    // const heroSection_description = "Dive into Educational insights and Tips"
    // const heroSection_image = ''
    // const admin_email = "admin@email.com"
    // const admin_phone = '12345678'
    // const facebook_link = "https://www.facebook.com/blogapp"
    // const instagram_link = 'https://www.instagram.com/blogapp'
    // const tiktok_link = 'https://www.tiktok.com/@blogapp'
    // const youtube_link = 'https://www.youtube.com/blogapp'

    const { website_name,
      website_logo,
      heroSection_heading,
      heroSection_description,
      heroSection_image,
      admin_email,
      admin_phone,
      facebook_link,
      instagram_link,
      tiktok_link,
      youtube_link } = await request.json()

    const webOverview = new WebOverViewModel({

      website_name,
      website_logo,
      heroSection_heading,
      heroSection_description,
      heroSection_image,
      admin_email,
      admin_phone,
      facebook_link,
      instagram_link,
      tiktok_link,
      youtube_link
    })

    await webOverview.save()

    if (!webOverview) {
      return NextResponse.json({
        success: false,
        message: "failed to create owerview"
      })
    }

    return NextResponse.json({
      success: true,
      message: "overview created successfully",
      webOverview
    })
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "failed to create owerview"
    })
  }
}
