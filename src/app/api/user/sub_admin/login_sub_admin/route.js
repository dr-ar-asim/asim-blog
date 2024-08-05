import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import subAdminModel from '@/models/sub_admins_model';

export const POST = async (request) => {
  try {
    const { sub_admin_email, sub_admin_password } = await request.json();

    if (!sub_admin_email || !sub_admin_password) {
      return NextResponse.json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Get sub-admin by email
    const existingSubAdmin = await subAdminModel.findOne({ sub_admin_email });

    if (!existingSubAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Sub-admin not found',
      });
    }

    // Check password
    const passMatched = await bcryptjs.compare(sub_admin_password, existingSubAdmin.sub_admin_password);
    if (!passMatched) {
      return NextResponse.json({
        success: false,
        message: 'Password not matched',
      });
    }

    // Check expiry of password
    const currentDate = new Date();
    if (existingSubAdmin.sub_admin_pass_expiry < currentDate) {
      return NextResponse.json({
        success: false,
        message: 'Password has expired',
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: existingSubAdmin._id }, process.env.JWT_TOKEN_KEY);
    console.log('subadmin-token', token);

    // Correctly initialize and use 'res'
    const myRes = NextResponse.json({
      success: true,
      message: 'Login Successfully',
    }, {
      status: 200
    });
    myRes.cookies.set('subAdminToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return myRes;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: 'Failed to login',
    }, {
      status: 500
    });
  }
};
