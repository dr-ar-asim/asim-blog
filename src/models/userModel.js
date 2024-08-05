import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({


  email: {
    type: String,
    required: true,
    default: "admin@gmail.com"
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const UserModel = mongoose.models.user || mongoose.model('user', userSchema)
export default UserModel