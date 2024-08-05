import { NextResponse } from "next/server"
import dbConnect from '@/lib/db'
import clientMessageModel from '@/models/clientMessages'

export const GET = async (request, { params }) => {
  try {
    await dbConnect()
    const { messageId } = params

    if (!messageId) {
      return NextResponse.json({
        success: false,
        message: 'Missing message ID',
      }, {
        status: 400,
      })
    }

    const singlemessage = await clientMessageModel.findById(messageId)
    if (!singlemessage) {
      return NextResponse.json({
        success: false,
        message: 'Message not found',
      }, {
        status: 404,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Single message found successfully',
      singlemessage,
    }, {
      status: 200,
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'failed to get single message'
    }, {
      status: 500,
    })
  }
}



export const DELETE = async (request, { params }) => {
  try {
    await dbConnect()

    const { messageId } = params

    if (!messageId) {
      return NextResponse.json({
        success: false,
        message: 'Missing message ID',
      }, {
        status: 400,
      })
    }

    const messageToDelete = await clientMessageModel.findByIdAndDelete(messageId)
    if (!messageToDelete) {
      return NextResponse.json({
        success: false,
        message: 'failed'
      })
    }
    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    }, {
      status: 200,
    })


  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'failed to delete message'
    }, {
      status: 500,
    })
  }
}