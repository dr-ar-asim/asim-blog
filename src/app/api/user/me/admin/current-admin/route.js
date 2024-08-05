
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';
import UserModel from '@/models/userModel'
import dbConnect from '@/lib/db'
export async function GET(request) {

  try {

    await dbConnect()

    const adminToken = await request.cookies.get('adminToken')?.value || ''
    // console.log(adminToken);

    if (!adminToken) {
      return NextResponse.json({
        success: false,
        message: "adminToken cookies not found"
      }, {
        status: 500
      })
    }
    const admin_id = jwt.verify(adminToken, process.env.JWT_TOKEN_KEY)
    // console.log(admin_id);

    if (!admin_id) {
      return NextResponse.json({
        success: false,
        message: "admin id not found"
      }, {
        status: 500
      })
    }

    const admin = await UserModel.findById(admin_id.id)

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "admin not found"
      }, {
        status: 500
      })
    }

    return NextResponse.json({
      success: true,
      message: "current admin found",
      admin
    }, {
      status: 200
    })

  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "failed to get current admin details"
    })
  }

}