import { NextResponse } from "next/server";
import subAdminModel from '@/models/sub_admins_model'


export const DELETE = async (request, { params }) => {
  try {

    const { sub_admin_id } = params
    if (!sub_admin_id) {
      return NextResponse.json({
        success: false,
        message: 'Invalid sub_admin_id'
      })
    }

    const delSubadmin = await subAdminModel.findByIdAndDelete(sub_admin_id)
    if (!delSubadmin) {
      return NextResponse.json({
        success: false,
        message: 'failed to delete'
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Sub admin deleted successfully'
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'failed to delete sub admin'
    })
  }
}



// update subadmin

export const PUT = async (request, { params }) => {
  try {

    const { sub_admin_id } = params
    if (!sub_admin_id) {
      return NextResponse.json({
        success: false,
        message: 'Invalid sub_admin_id'
      })
    }

    // new data



  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: 'failed to update sub_admin'
    })
  }
}