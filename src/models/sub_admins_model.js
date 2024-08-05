import mongoose from 'mongoose';

const subAdminSchema = new mongoose.Schema({
  sub_admin_email: {
    type: String,
    required: true,
    unique: true,
  },
  sub_admin_password: {
    type: String,
    required: true,
  },
  sub_admin_pass_expiry: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
  },
  // Other fields...
});

const subAdminModel =mongoose.models.SubAdmin|| mongoose.model('SubAdmin', subAdminSchema);

export default subAdminModel;
