import { NextRequest, NextResponse } from "next/server";
import clientMessageModel from '@/models/clientMessages'
import dbConnect from '@/lib/db'
import WebOverViewModel from '@/models/web_overview'
import nodemailer from 'nodemailer'


export const POST = async (request) => {
  try {
    await dbConnect()
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "All fields are required."
      }, {
        status: 400,
      })
    }

    const newMessage = new clientMessageModel({
      name, email, message
    })
    await newMessage.save()

   

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      newMessage
    }, {
      status: 200
    })
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing your request."
    }, {
      status: 500,
    })
  }
}



export const GET = async (request) => {
  try {

    const messages = await clientMessageModel.find()
    if (!messages) {
      return NextResponse.json({
        success: false,
        message: "No messages found."
      }, {
        status: 404,
      })
    }
    return NextResponse.json({
      success: true,
      message: "messages get successfully",
      messages,
    })
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "messages get failed"
    }, {
      status: 500
    })
  }
}