import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import subAdminModel from '@/models/sub_admins_model'



export const GET = async (request) => {
  try {

    const subAdminToken = await request.cookies.get('subAdminToken')?.value || ''
    if (!subAdminToken) {
      return NextResponse.json({
        success: false,
        message: "sub admin cookies not found"
      })
    }
    const subAdmin_id = await jwt.verify(subAdminToken, process.env.JWT_TOKEN_KEY)
    console.log(subAdmin_id);
    if (!subAdmin_id) {
      return NextResponse.json({
        success: false,
        message: 'sub admin id not found from token/cookies'
      })
    }

    const subAdmin = await subAdminModel.findById(subAdmin_id.id)
    if (!subAdmin) {
      return NextResponse.json({
        success: false,
        message: 'failed to find sub admin'
      }, {
        status: 404
      })
    }

    return NextResponse.json({
      success: true,
      message: 'success',
      subAdmin
    }, {
      status: 200
    });
  } catch (error) {
    console.error('Error fetching subAdminToken:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to get current sub_admin',
    }, {
      status: 500
    });
  }
};
