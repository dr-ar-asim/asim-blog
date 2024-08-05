

import { NextResponse } from "next/server";
import dbConnect from '@/lib/db'
import bcryptjs from 'bcryptjs'
import UserModel from '@/models/userModel'
import jwt from 'jsonwebtoken'

export async function POST(request) {
  try {

    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Please provide email and password',
      }, {
        status: 400,
      })
    }


    const foundedAdmin = await UserModel.findOne({ email: email, isAdmin: true });

    if (!foundedAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Admin not found',
      })
    }

    const passwordMatch = await bcryptjs.compare(password, foundedAdmin.password);

    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: 'Incorrect password',
      })
    }

    const token = jwt.sign({ id: foundedAdmin._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '1d' });

    const myResponse = NextResponse.json(
      {
        success: true,
        message: 'Login as admin successfully',
      },
      {
        status: 200,
      },
    )

    myResponse.cookies.set('adminToken', token, {
      httpOnly: true,
      expiresIn: '1d'
    })
    return myResponse;

  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: 'Failed to login as admin',
    }, {
      status: 500
    })
  }
}