import { NextResponse } from "next/server";


export const POST = async (request) => {
  try {

    const adminCookies = await request.cookies.get('adminToken')?.value
    if (!adminCookies) {
      return NextResponse.json({
        success: false,
        message: "Admin cookies not found"
      }, {
        status: 404
      })
    }

    const myRes = NextResponse.json({
      success: true,
      message: 'Admin Logout successfully'
    }, {
      status: 200
    })
    myRes.cookies.set('adminToken', '', {
      expires: new Date(0),
      path: '/'
    })
    return myRes;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: 'failed to logout admin'
    }, {
      status: 500
    })
  }
}