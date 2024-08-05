import { NextResponse } from "next/server";
import dbConnect from '@/lib/db';
import bcryptjs from 'bcryptjs';
import UserModel from '@/models/userModel';

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Please fill all fields"
      }, {
        status: 400
      });
    }

    const existingAdmin = await UserModel.findOne({ email });

    if (existingAdmin && existingAdmin.isAdmin === true) {
      return NextResponse.json({
        success: false,
        message: "Admin already present, please login"
      }, {
        status: 400
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newAdmin = new UserModel({
      email,
      password: hashedPassword,
      isAdmin: true
    });

    await newAdmin.save();

    return NextResponse.json({
      success: true,
      message: "Admin Created",
      newAdmin
    }, {
      status: 200
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message
    }, {
      status: 500
    });
  }
}
