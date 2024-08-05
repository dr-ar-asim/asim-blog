

// api for subadmin

import { NextResponse } from "next/server"
import subAdminModel from '@/models/sub_admins_model'
import nodemaailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const POST = async (request) => {
  try {

    // get invitaion data
    const { subadmin_email, subadmin_email_text } = await request.json()


    // validate data
    if (!subadmin_email || !subadmin_email_text) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      })
    }


    // check existing subadmin by email

    const existing_sub_admin = await subAdminModel.findOne({ subadmin_email })
    if (existing_sub_admin) {
      return NextResponse.json({
        success: false,
        message: "sub admin of this email already exists"
      }, {
        status: 400
      })
    }

    const Password = 'A6D8K4B9'

    // email send to sub_admin
    const transporter = nodemaailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.admin_email,
        pass: process.env.admin_email_pass
      }
    })
    const emailsend = await transporter.sendMail({
      from: process.env.admin_email,
      to: subadmin_email,
      subject: 'Invitation from admin of Blog App',
      html: `<p>${subadmin_email_text}</p>
      <br/>
      <p>Click the below button to accept the invitation:</p>
      <button className='p-5 bg-custom-orange text-white'>
      <a href="${process.env.domain_name}/user/login_subAdmin">Accept Invitation</a>
      </button>
      <br/>
      <p>Your Pass is ${Password}</p>
      <br/>
      <br/>
      <br/>
      <br/>
      <p>This is an automatically generated email. Please do not reply to it.</p>
      `
    })

    if (!emailsend) {
      return NextResponse.json({
        success: false,
        message: 'Failed to send email'
      })
    }

    const hashedPassword = await bcryptjs.hash(Password, 10)

    const subAdmin = new subAdminModel({
      sub_admin_email: subadmin_email,
      sub_admin_password: hashedPassword
    })
    if (!subAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Failed to create subadmin'
      })
    }
    await subAdmin.save()

    return NextResponse.json({
      success: true,
      message: 'Invitaion Send Successfully'
    }, {
      status: 200
    })
  } catch (error) {
    console.log(error.message);

    return NextResponse.json({
      success: false,
      message: 'failed to create subadmin'
    }, {
      status: 500
    })
  }
}




// get sub admins

export const GET = async () => {
  try {

    const sub_admins = await subAdminModel.find()
    if (!sub_admins) {
      return NextResponse.json({
        success: false,
        message: 'No subadmins found'
      })
    }
    return NextResponse.json({
      success: true,
      message: 'sub admins foun successfully',
      sub_admins
    }, {
      status: 200
    })
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: 'failed to get subadmins'
    })
  }
}