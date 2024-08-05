

// client messages send to us


import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,

  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  sendTime: {
    type: Date,
    default: Date.now()

  }
})


const clientMessageModel = mongoose.models.clientMessage || mongoose.model('clientMessage', messageSchema)
export default clientMessageModel