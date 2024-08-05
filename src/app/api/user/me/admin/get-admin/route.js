import dbConnect from '@/lib/db'
import UserModel from '@/models/userModel'
export async function GET(request) {
  try {
    await dbConnect()
    const admins = await UserModel.find()

    if (!admins) {
      return Response.json({
        success: false,
        message: 'No admins found'
      }, {
        status: 404
      })
    }

    return Response.json({
      success: true,
      message: 'Admins found successfully',
      admins
    }, {
      status: 200
    })


  } catch (error) {
    console.log(error.message);
    return Response.json({
      success: false,
      message: error.message
    }, {
      status: 500
    })
  }
}