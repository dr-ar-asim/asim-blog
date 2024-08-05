import { NextResponse } from "next/server"

export const POST = async (request) => {
  try {

    const subAdminCookies = await request.cookies.get('subAdminToken')?.value
    if (!subAdminCookies) {
      return NextResponse.json({
        success: false,
        message: 'sub admin cookies not found'
      }, {
        status: 404
      })
    }
    const response = NextResponse.json({
      success: true,
      message: 'Successfully logged out'
    }, {
      status: 200
    });

    response.cookies.set('subAdminToken', '', {
      expires: new Date(0), // Set the expiry date to the past
      path: '/' // Ensure it applies to the whole site
    });

    return response;

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'failed to logout subadmin'
    }, {
      status: 500,
    })
  }
}